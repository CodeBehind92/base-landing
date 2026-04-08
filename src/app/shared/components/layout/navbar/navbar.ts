import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollService } from '../../../../core/services/scroll.service';

// ---------------------------------------------------------------------------
// Nav item types — explicit discriminated union, no href="#" hacks
// ---------------------------------------------------------------------------

interface NavSectionItem {
  /** Scrolls to a section on the home page by element ID. */
  readonly label: string;
  readonly sectionId: string;
  readonly children?: undefined;
}

interface NavDropdownItem {
  /** Renders a dropdown menu with router links to sub-landings. */
  readonly label: string;
  readonly sectionId?: undefined;
  readonly children: readonly {
    readonly label: string;
    readonly link: string;
    readonly description: string;
  }[];
}

type NavItem = NavSectionItem | NavDropdownItem;

// ---------------------------------------------------------------------------
// Navigation data
// ---------------------------------------------------------------------------

const NAV_ITEMS: NavItem[] = [
  { label: 'Identidad', sectionId: 'identidad' },
  { label: 'Cultura', sectionId: 'cultura' },
  { label: 'Gastronomía', sectionId: 'gastronomia' },
  { label: 'Turismo', sectionId: 'turismo' },
  { label: 'Eventos', sectionId: 'eventos' },
  { label: 'Galería', sectionId: 'galeria' },
  {
    label: 'Cultura Viva',
    children: [
      {
        label: 'Carnaval de Atlapexco',
        link: '/cultura/carnaval-atlapexco/2026',
        description: 'Los Mecos, el Zacahuil y la fiesta sagrada',
      },
      {
        label: 'Fiesta Patronal de San José',
        link: '/cultura/feria-san-jose/2026',
        description: 'Huapango, jaripeo y el castillo pirotécnico',
      },
      {
        label: 'Semana Santa',
        link: '/cultura/semana-santa/2026',
        description: 'Silencio, palmas y fe en el corazón Huasteco',
      },
    ],
  },
  { label: 'Contacto', sectionId: 'contacto' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <header [class]="headerClass()" role="banner">
      <nav
        class="container mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        <!-- Brand -->
        <a
          href="/"
          class="flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
          aria-label="Atlapexco – inicio"
        >
          <span class="text-white font-heading font-bold text-lg tracking-tight">
            {{ municipalityName }}
          </span>
          <span class="text-amber-400/70 text-xs tracking-widest uppercase">
            {{ state }}, México
          </span>
        </a>

        <!-- Desktop links -->
        <ul class="hidden md:flex items-center gap-1" role="list">
          @for (item of navItems; track item.label) {
            <li [class]="item.children ? 'relative group/dropdown' : ''">
              @if (item.children) {
                <!-- Dropdown trigger -->
                <button
                  type="button"
                  class="flex items-center gap-1 text-zinc-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {{ item.label }}
                  <svg
                    class="w-3 h-3 transition-transform duration-200 group-hover/dropdown:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- Dropdown panel – CSS group-hover + focus-within for a11y -->
                <div
                  class="absolute top-full right-0 pt-2 hidden group-hover/dropdown:block group-focus-within/dropdown:block z-50"
                  role="menu"
                >
                  <div class="bg-zinc-900/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl shadow-black/40 py-2 min-w-56">
                    @for (child of item.children; track child.link) {
                      <a
                        [routerLink]="child.link"
                        class="flex flex-col px-4 py-3 hover:bg-white/5 transition-colors duration-150 focus-visible:outline-none focus-visible:bg-white/5 group/child"
                        role="menuitem"
                      >
                        <span class="text-sm font-medium text-white group-hover/child:text-[#FF5722] transition-colors">
                          {{ child.label }}
                        </span>
                        <span class="text-xs text-zinc-500 mt-0.5">
                          {{ child.description }}
                        </span>
                      </a>
                    }
                  </div>
                </div>
              } @else {
                <!-- Section scroll button — no hash in URL, no router navigation -->
                <button
                  type="button"
                  class="text-zinc-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  (click)="onSectionClick($any(item).sectionId)"
                >
                  {{ item.label }}
                </button>
              }
            </li>
          }
        </ul>

        <!-- Mobile menu button -->
        <button
          type="button"
          class="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          [attr.aria-expanded]="mobileOpen()"
          aria-controls="mobile-menu"
          aria-label="Abrir menú de navegación"
          (click)="toggleMobile()"
        >
          <span
            [class]="'block w-5 h-0.5 bg-white transition-all duration-300 ' + (mobileOpen() ? 'rotate-45 translate-y-2' : '')"
          ></span>
          <span
            [class]="'block w-5 h-0.5 bg-white transition-all duration-300 ' + (mobileOpen() ? 'opacity-0' : '')"
          ></span>
          <span
            [class]="'block w-5 h-0.5 bg-white transition-all duration-300 ' + (mobileOpen() ? '-rotate-45 -translate-y-2' : '')"
          ></span>
        </button>
      </nav>

      <!-- Mobile menu -->
      @if (mobileOpen()) {
        <div
          id="mobile-menu"
          class="md:hidden border-t border-white/5 bg-zinc-950/98 backdrop-blur-md"
          role="navigation"
          aria-label="Menú móvil"
        >
          <ul class="container mx-auto px-4 py-4 flex flex-col gap-1" role="list">
            @for (item of navItems; track item.label) {
              <li>
                @if (item.children) {
                  <!-- Mobile expandable dropdown -->
                  <button
                    type="button"
                    class="w-full flex items-center justify-between text-zinc-300 hover:text-white text-base px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                    (click)="toggleMobileDropdown(item.label)"
                    [attr.aria-expanded]="openMobileDropdown() === item.label"
                  >
                    <span>{{ item.label }}</span>
                    <svg
                      [class]="'w-4 h-4 transition-transform duration-200 ' + (openMobileDropdown() === item.label ? 'rotate-180' : '')"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2.5"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  @if (openMobileDropdown() === item.label) {
                    <ul class="mt-1 ml-4 flex flex-col gap-1 border-l border-white/10 pl-4">
                      @for (child of item.children; track child.link) {
                        <li>
                          <a
                            [routerLink]="child.link"
                            class="flex flex-col py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                            (click)="closeMobile()"
                          >
                            <span class="text-sm font-medium text-white">{{ child.label }}</span>
                            <span class="text-xs text-zinc-500 mt-0.5">{{ child.description }}</span>
                          </a>
                        </li>
                      }
                    </ul>
                  }
                } @else {
                  <!-- Mobile section scroll button -->
                  <button
                    type="button"
                    class="w-full text-left text-zinc-300 hover:text-white text-base px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                    (click)="onSectionClick($any(item).sectionId)"
                  >
                    {{ item.label }}
                  </button>
                }
              </li>
            }
          </ul>
        </div>
      }
    </header>
  `,
})
export class Navbar {
  private readonly scroll = inject(ScrollService);

  protected readonly municipalityName = 'Atlapexco'; // MUNICIPALITY_DATA.info.name;
  protected readonly state = 'HIDALGO'; // MUNICIPALITY_DATA.info.state;
  protected readonly navItems: NavItem[] = NAV_ITEMS;

  protected readonly isScrolled = signal(false);
  protected readonly mobileOpen = signal(false);
  protected readonly openMobileDropdown = signal<string | null>(null);

  protected readonly headerClass = computed(
    () =>
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' +
      (this.isScrolled()
        ? 'bg-zinc-950/95 backdrop-blur-md border-b border-white/5 shadow-2xl'
        : 'bg-transparent')
  );

  constructor() {
    afterNextRender(() => {
      window.addEventListener(
        'scroll',
        () => this.isScrolled.set(window.scrollY > 60),
        { passive: true }
      );
    });
  }

  protected onSectionClick(sectionId: string): void {
    this.closeMobile();
    this.scroll.scrollToSection(sectionId);
  }

  protected toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
    if (!this.mobileOpen()) {
      this.openMobileDropdown.set(null);
    }
  }

  protected toggleMobileDropdown(label: string): void {
    this.openMobileDropdown.update((v) => (v === label ? null : label));
  }

  protected closeMobile(): void {
    this.mobileOpen.set(false);
    this.openMobileDropdown.set(null);
  }
}
