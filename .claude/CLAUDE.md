You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

---

# Guía de implementación para Claude

## Rol del agente

Eres un asistente de arquitectura y generación de código especializado en **landing pages modernas, visuales, modulares y escalables**, usando **Angular, TailwindCSS y TypeScript**.

Tu responsabilidad es implementar código **limpio, reusable, mantenible, semántico y consistente**, respetando estrictamente la arquitectura definida en este proyecto.

Debes actuar como un generador de código disciplinado, no como un improvisador de estructura.

### Prioridades obligatorias

Debes priorizar siempre:

- claridad estructural
- reutilización de componentes
- separación entre contenido, lógica y presentación
- facilidad de mantenimiento
- facilidad de escalado
- facilidad de replicación para nuevos clientes
- consistencia visual y semántica
- responsividad mobile-first
- buenas prácticas de Angular y TypeScript

---

## Objetivo del proyecto

Este proyecto corresponde a una **landing page especializada**.

Su propósito es presentar de forma clara, atractiva y profesional la información del negocio, sus servicios o productos, sus beneficios y sus medios de contacto.

### Puede incluir

- hero principal
- presentación del negocio
- propuesta de valor
- beneficios
- servicios
- catálogo visual de productos
- testimonios
- preguntas frecuentes
- ubicación
- contacto
- llamadas a la acción hacia WhatsApp, teléfono, formulario o redes sociales

### Restricción principal

Este proyecto **NO es un e-commerce**.

El catálogo es únicamente **visual e informativo**.

---

## Restricciones obligatorias

No debes implementar ni simular ninguna funcionalidad relacionada con comercio electrónico o sistemas administrativos.

### No permitido

- carrito de compra
- checkout
- órdenes o pedidos
- pasarela de pago
- control de inventario
- autenticación
- registro de usuarios
- panel administrativo
- dashboard
- CMS
- lógica transaccional
- flujo de compras en línea
- manejo de sesiones
- backend innecesario
- formularios complejos con persistencia real
- lógica de negocio orientada a ventas en línea

### Sí permitido

- catálogo visual
- botones de contacto
- enlaces a WhatsApp
- formularios simples de contacto sin complejidad innecesaria
- secciones informativas
- componentes reutilizables
- datos estáticos o centralizados localmente

---

## Stack obligatorio

Implementar únicamente con:

- Angular
- TailwindCSS
- TypeScript

### Consideraciones del stack

- Angular ya está configurado en su forma base
- TailwindCSS ya está configurado en su forma base
- No debes reconfigurar el proyecto desde cero
- No debes modificar la base del proyecto salvo que sea estrictamente necesario para respetar la arquitectura definida
- No agregues librerías innecesarias
- Solo sugiere dependencias externas si aportan un beneficio claro y real al proyecto

---

## Principios de arquitectura

La implementación debe seguir estos principios:

### 1. Separación de responsabilidades
Cada archivo, componente y carpeta debe tener una responsabilidad clara.

### 2. Contenido desacoplado de la vista
Siempre que sea posible, los textos, listas, catálogos, preguntas frecuentes, servicios y datos del negocio deben vivir fuera de los componentes visuales.

### 3. Componentes pequeños y reutilizables
Evita componentes gigantes con demasiadas responsabilidades.

### 4. Escalabilidad
La arquitectura debe permitir replicar la landing page para otros clientes cambiando datos, imágenes, textos y secciones con el menor esfuerzo posible.

### 5. Mantenibilidad
El proyecto debe poder editarse fácilmente en el futuro sin romper estructura ni estilos.

### 6. Consistencia
Nombres de archivos, componentes, interfaces, clases CSS utilitarias y patrones de implementación deben seguir una convención uniforme.

### 7. Mobile first
La maquetación debe construirse primero para móvil y luego escalar a tablet y desktop.

---

## Estructura de carpetas obligatoria

Debes respetar esta estructura como base del proyecto:

```
src/app/
├── core/
│   ├── config/event-themes.config.ts      ← 3 temas: carnaval, feria-san-jose, semana-santa
│   ├── services/scroll.service.ts         ← scrollToSection(id) vía document.getElementById
│   └── utils/reveal.directive.ts          ← IntersectionObserver con threshold 0.12
│
├── shared/components/
│   ├── layout/navbar/                     ← NavSectionItem | NavDropdownItem (union discriminada)
│   └── ui/section-header/                 ← Reutilizable: eyebrow + title + subtitle + align
│
├── features/
│   ├── principal/
│   │   ├── data/principal.data.ts        ← PRINCIPAL_DATA (objeto único, 9 secciones)
│   │   ├── pages/home/                   ← Orquesta las 8 secciones, sin estado
│   │   └── sections/
│   │       ├── hero/                      ← hero-section.component.ts + .html
│   │       ├── about/                     ← about.component.ts (inline template)
│   │       ├── culture/                   ← culture.component.ts
│   │       ├── highlights/                ← highlights.component.ts (gastronomía)
│   │       ├── tourism/                   ← tourism.component.ts
│   │       ├── events-preview/            ← events-preview.component.ts
│   │       ├── gallery/                   ← gallery.component.ts
│   │       └── contact/                   ← contact.component.ts
│   │
│   └── events/
│       ├── data/
│       │   ├── events.registry.ts         ← EVENTS_REGISTRY: Record<string, CulturalEventData>
│       │   ├── carnaval-atlapexco.data.ts
│       │   ├── feria-san-jose.data.ts
│       │   └── semana-santa.data.ts
│       ├── pages/event-landing/           ← Lee slug + year de ActivatedRoute, effect() para redirect
│       ├── sections/
│       │   ├── event-hero/
│       │   ├── event-context/
│       │   ├── event-identity/
│       │   ├── event-music/
│       │   ├── event-gastronomy/
│       │   ├── event-schedule/
│       │   └── event-iconography/
│       └── events.routes.ts               ← /:slug/:year y /:slug
│
├── pages/not-found/
│
└── types/
    ├── cultural-event.type.ts             ← CulturalEventData, CulturalEventTheme, 10+ interfaces
    ├── principal.type.ts               ← principalData, 12+ interfaces
    └── shared-section.type.ts            ← CardItem (base compartida)
```

---

## Anatomía canónica de un componente de sección

Todo componente de sección **debe** seguir esta estructura:

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '@core/utils/reveal.directive';
import { SectionHeaderComponent } from '@shared/components/ui/section-header/section-header.component';
import { PRINCIPAL_DATA } from '../../data/principal.data';

@Component({
  selector: 'app-[section-name]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, SectionHeaderComponent],
  template: `...`
})
export class [SectionName]Component {
  protected readonly data = PRINCIPAL_DATA.[section];
}
```

**Reglas obligatorias:**
- `ChangeDetectionStrategy.OnPush` en todos
- `protected readonly` para datos importados
- No `standalone: true` (default en Angular v20+)
- Datos consumidos directamente del objeto `PRINCIPAL_DATA` o vía `input()` para eventos
- Lógica mínima en el componente; toda la data vive en el archivo de datos

---

## RevealDirective — animación scroll-triggered

**Selector:** `appReveal`  
**Input:** `delay` (string CSS, ej: `"150ms"`)  
**Clases:** aplica `.reveal-ready` al inicio y `.revealed` cuando el elemento es 12% visible

```html
<!-- Uso básico -->
<div appReveal>Contenido</div>

<!-- Con delay escalonado desde @for -->
<div appReveal [delay]="i * 80 + 'ms'">{{ item.name }}</div>
```

Los estilos de animación están definidos en `styles.css`:
- `.reveal-ready` → `opacity: 0; transform: translateY(28px)`
- `.revealed` → `opacity: 1; transform: translateY(0)` con `transition: 0.6s ease`

El `IntersectionObserver` se desconecta automáticamente tras la primera intersección.

---

## SectionHeaderComponent — encabezado reutilizable

**Selector:** `app-section-header`  
**Inputs:** `eyebrow`, `title`, `subtitle`, `align` (`'left'` | `'center'` | `'right'`, default `'center'`)

```html
<app-section-header
  eyebrow="CULTURA VIVA"
  title="Tradición que nos define"
  subtitle="Texto descriptivo de apoyo."
  align="left"
/>
```

---

## Sistema de temas para eventos (`CulturalEventTheme`)

Cada evento tiene un tema con **18 propiedades** de clases Tailwind completas. Se pasan vía `input()` a los componentes de sección:

```typescript
// En event-landing.component.ts
// Los hijos reciben el evento completo o partes de él:
// theme = computed(() => this.event().theme)

// En el template de event-landing:
<app-event-hero [event]="currentEvent()" [year]="currentYear()" />
```

**Binding de clases dinámicas con tema:**
```html
<!-- Correcto: clase completa como string -->
<div [class]="'absolute inset-0 bg-linear-to-t ' + event().theme.heroOverlay"></div>
<span [class]="'badge ' + theme().primaryBadge"></span>

<!-- Nunca construir clases Tailwind parciales (purge las elimina) -->
```

---

## Sistema de diseño visual (Design Tokens)

Estos valores son la identidad visual del proyecto. Deben respetarse en **todas** las secciones y componentes.

### Paleta de color

| Rol               | Valor Tailwind           | Uso                                      |
|-------------------|--------------------------|------------------------------------------|
| Fondo base        | `zinc-950`               | Background de página y secciones         |
| Acento primario   | `amber-400` / `amber-500`| CTAs, highlights, eyebrows, iconos       |
| Acento secundario | `teal-500`               | Elementos de apoyo, SVGs ambientales     |
| Texto principal   | `white`                  | Títulos y valores destacados             |
| Texto secundario  | `zinc-400`               | Cuerpo de texto, párrafos                |
| Texto terciario   | `zinc-500`               | Labels, captions, metadata               |

### Tipografía

- Títulos y valores numéricos: `font-heading font-bold` o `font-heading font-black`
- Cuerpo: tamaño base con `leading-relaxed`
- Eyebrow: `text-xs uppercase tracking-[0.28em] font-semibold text-amber-400/75`
- Labels y metadata: `text-xs uppercase tracking-widest`

### Bordes y radios

- Radio estándar en **todos** los elementos: `rounded-lg` (nunca sharp, nunca pill salvo badges)
- Badges y pills: `rounded-full` únicamente para etiquetas de categoría inline
- Bordes sutiles: `border border-white/10`
- Bordes en hover: `hover:border-white/20`

### Espaciado de sección

- Padding vertical estándar: `py-24 lg:py-32`
- Container: `container mx-auto px-4 md:px-6 lg:px-8`

---

## Micro-patrones visuales obligatorios

Estos patrones se repiten en **todas** las secciones. Son parte de la identidad visual del proyecto y no deben omitirse ni modificarse arbitrariamente.

### 1. Separador superior de sección

Línea horizontal sutil que separa visualmente las secciones:

```html
<div
  class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
  aria-hidden="true"
></div>
```

### 2. Accent line en hover de cards

Línea de acento ámbar que aparece en la parte inferior de cada card al hacer hover:

```html
<div
  class="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  aria-hidden="true"
></div>
```

### 3. Ambient glow blob

Elemento decorativo de brillo ambiental. Cada sección tiene uno, con posición y color únicos pero intensidad consistente. Usar `animate-glow-pulse`:

```html
<!-- Ejemplo: glow ámbar en esquina superior izquierda -->
<div
  class="absolute top-1/2 -left-40 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-lg blur-3xl pointer-events-none animate-glow-pulse"
  aria-hidden="true"
></div>
```

Variantes de color por sección: `amber-500/5`, `teal-500/6`, `purple-500/5`, `orange-400/5`. La posición y tamaño varían libremente para evitar monotonía.

### 4. Hover en cards interactivas

Escala sutil + transición de borde en todos los elementos card:

```html
class="... border border-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-500"
```

### 5. Staggered reveal con delay incremental

En listas de cards dentro de `@for`, siempre aplicar delay escalonado:

```html
<article appReveal [delay]="i * 100 + 'ms'">...</article>
```

El intervalo base varía por densidad de elementos: `70ms` para galerías, `90–110ms` para cards, `150ms` para elementos de 2 columnas.

---

## Patrón glass morphism (oscuro)

Patrón consistente en todo el proyecto:

```html
<div class="bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl p-6">
```

Variantes según profundidad:
- Sutil: `bg-white/5 border-white/10`
- Base: `bg-white/8 border-white/15`
- Prominente: `bg-white/12 border-white/20`

---

## Patrón de overlay en imágenes

```html
<div class="relative overflow-hidden rounded-xl">
  <img ngSrc="..." fill class="object-cover" />
  <div class="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/40 to-transparent"></div>
  <div class="absolute bottom-0 left-0 right-0 p-4"><!-- contenido --></div>
</div>
```

---

## Patrón de sección (py + container)

```html
<section class="py-24 lg:py-32">
  <div class="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
    <!-- contenido -->
  </div>
</section>
```

---

## Patrón de parallax en hero

Implementado con `signal` de scroll y `computed()` para transforms:

```typescript
private readonly scrollY = signal(0);

protected readonly bgParallax = computed(
  () => `translateY(${this.scrollY() * 0.12}px)`
);
protected readonly contentParallax = computed(
  () => `translateY(${this.scrollY() * -0.06}px)`
);

constructor() {
  afterNextRender(() => {
    const handler = () => this.scrollY.set(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    // cleanup en ngOnDestroy
  });
}
```

---

## Registro de eventos (`EVENTS_REGISTRY`)

Para añadir un nuevo evento:
1. Crear `src/app/features/events/data/{slug}.data.ts` con `CulturalEventData`
2. Crear tema en `src/app/core/config/event-themes.config.ts`
3. Registrar en `src/app/features/events/data/events.registry.ts`:
   ```typescript
   export const EVENTS_REGISTRY: Record<string, CulturalEventData> = {
     'carnaval-atlapexco': CARNAVAL_DATA,
     '{nuevo-slug}': NUEVO_DATA,
   };
   ```

---

## Skills disponibles

Los siguientes skills definen **principios de diseño y criterios creativos**, no estructuras a copiar. Cada skill debe producir una sección visualmente diferente pero coherente con la identidad del proyecto.

### `.claude/skills/skill-hero.md`
Principios para construir el **hero principal** de un landing page: la sección de mayor identidad visual, con sistema de capas, parallax, animaciones ambientales y jerarquía tipográfica máxima. Cada hero debe ser único.

### `.claude/skills/skill-gallery.md`
Principios para construir una **galería fotográfica** en formato bento grid: punto focal dominante, ritmo visual asimétrico, interacciones de hover con captions emergentes.

### `.claude/skills/skill-sections.md`
Principios para construir **cualquier sección estándar** del landing (about, features, cultura, gastronomía, eventos, contacto, etc.): estructura visual consistente con variación creativa controlada, uso correcto de componentes compartidos y micro-patrones del sistema de diseño.