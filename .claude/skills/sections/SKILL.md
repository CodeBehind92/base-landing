---
name: sections
description: Crea secciones estándar de landing pages Angular + TailwindCSS: about, servicios, características, beneficios, cultura, gastronomía, eventos, testimonios, FAQ, contacto, o cualquier sección que no sea hero ni galería. Úsalo siempre que se pida construir una sección nueva. Cada sección debe sentirse diferente a las demás aunque compartan el mismo sistema visual — nunca repitas el mismo layout o glow.
---

# Skill: Secciones estándar de landing page

## Reglas críticas (no negociables)

- SIEMPRE usar THEME (prohibido hardcodear colores como amber, teal, etc)
- SIEMPRE respetar que cada sección se sienta diferente (layout, glow, alineación)
- SI la sección usa imágenes → SIEMPRE deben renderizarse con <img> (no conceptual)
- SI no hay imágenes del cliente → usar placeholder (Unsplash/Pexels)
- NUNCA dejar cards visuales sin imagen si el tipo lo requiere
- NUNCA usar iconos como reemplazo de imágenes en cards visuales

## Implementación obligatoria (evitar ambigüedad)

- Las imágenes SIEMPRE deben usar:
  <img [ngSrc]="..." fill class="object-cover" />

- Las cards SIEMPRE deben tener altura mínima (min-h-*)
- El layout SIEMPRE debe definirse explícitamente (grid-cols-*, no implícito)

## Regla de decisión automática (para evitar dudas del modelo)

- Si items.length <= 3 → usar layout asimétrico
- Si items.length >= 4 → usar grid uniforme
- Si hay imagen principal → usar layout 2 columnas
- Si es contenido narrativo → usar stack vertical

Claude debe elegir automáticamente sin pedir confirmación

## Error prohibido

Cards sin altura definida  
Secciones sin glow  
Repetir layout de otra sección  
Usar colores hardcodeados  
Cards visuales sin imagen  

## Principio fundamental

Aunque todas las secciones comparten el mismo sistema visual, cada una debe **sentirse diferente**. Lo que varía libremente: posición del glow, layout del grid, alineación del header, tint de color en cards. Lo que nunca varía: paleta, espaciado, `rounded-lg`, micro-patrones.

## El layout lo dicta el contenido

No hay un grid predeterminado. Elige según la naturaleza del contenido:

| Tipo de contenido | Layout |
|---|---|
| 2–3 elementos de alto valor | Grid asimétrico con featured item |
| 4–6 items equivalentes | Grid uniforme 2 o 3 columnas |
| Item principal + lista | 2 columnas: imagen grande + contenido |
| Lista narrativa | Stack vertical con reveal escalonado |
| Features con iconos de apoyo | Grid con icono pequeño + texto |
| Testimonios | Cards con cita, nombre y avatar |

## Sistema de temas

Siempre importa y usa `THEME` desde `theme.config.ts`. Nunca hardcodees colores de acento:

```typescript
import { THEME } from '@core/config/theme.config';

// En el componente:
protected readonly theme = THEME;
```

```html
<!-- Correcto -->
<span [class]="theme.accentText">{{ eyebrow }}</span>
<div [class]="'absolute bottom-0 ... ' + theme.accentLine + ' ...'"></div>

<!-- Nunca -->
<span class="text-amber-400">{{ eyebrow }}</span>
```

## Imágenes: siempre fotografía real, nunca iconos como elemento visual principal

Las cards con contenido visual **siempre usan fotografía real** como fondo. Los iconos quedan reservados para elementos de apoyo dentro de contenido textual (stats, features simples). Nunca uses iconos como reemplazo de imágenes en cards visuales.

## Anatomía de una sección

```html
<section id="[id]" aria-labelledby="[heading-id]" class="relative py-24 lg:py-32 overflow-hidden">

  <!-- Separador superior (siempre) -->
  <div class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" aria-hidden="true"></div>

  <!-- Ambient glow (posición y color únicos por sección) -->
  <div class="absolute [posición] w-96 h-96 bg-[color]/5 rounded-lg blur-3xl pointer-events-none animate-glow-pulse" aria-hidden="true"></div>

  <div class="container mx-auto px-4 md:px-6 lg:px-8 relative">

    <!-- Header -->
    <div appReveal class="mb-16">
      <app-section-header headingId="[heading-id]" [eyebrow]="eyebrow" [title]="title" [subtitle]="subtitle" align="center" />
    </div>

    <!-- Grid según Principio de layout -->
    <div class="grid grid-cols-1 [cols] gap-[n]" role="list" aria-label="[descripción]">
      @for (item of items; track item.id; let i = $index) {
        <article role="listitem" appReveal [delay]="i * 100 + 'ms'"
          class="group relative overflow-hidden rounded-lg border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] cursor-default min-h-64 flex flex-col">
          <!--
            min-h-64 garantiza altura mínima: la card NUNCA depende del texto para llenarse.
            flex flex-col permite que el cuerpo use flex-1 para ocupar el espacio restante.
            Ajusta min-h según densidad visual: min-h-48 compacta, min-h-64 estándar, min-h-80 destacada.
          -->

          <!-- contenido de la card — el elemento de cuerpo principal debe usar flex-1 -->

          <!-- Accent line hover (siempre al final) -->
          <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
        </article>
      }
    </div>

  </div>
</section>
```

## Cards con foto de fondo

```html
<article class="group relative h-96 rounded-lg overflow-hidden ...">
  <img [ngSrc]="item.image" fill [alt]="item.imageAlt"
    class="object-cover group-hover:scale-105 transition-transform duration-700" />
  <div class="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/30 to-zinc-950/10" aria-hidden="true"></div>
  <div class="absolute inset-0 p-7 flex flex-col justify-end z-10">
    <h3 class="text-2xl font-heading font-bold text-white mb-2">{{ item.name }}</h3>
    <p class="text-zinc-300 text-sm leading-relaxed mb-3">{{ item.description }}</p>
    <span class="text-xs text-amber-400/80 uppercase tracking-widest font-medium">{{ item.label }}</span>
  </div>
  <!-- Accent line hover -->
</article>
```

## Cards con foto como tint (cultura, eventos)

```html
<article class="group relative overflow-hidden rounded-lg border border-white/10 p-8 min-h-56 ...">
  <div class="absolute inset-0" aria-hidden="true">
    <img [ngSrc]="item.image" fill [alt]="item.imageAlt"
      class="object-cover opacity-35 group-hover:opacity-50 transition-opacity duration-500" />
    <div [class]="'absolute inset-0 bg-linear-to-br ' + item.gradient + ' opacity-80'"></div>
  </div>
  <div class="relative z-10 h-full flex flex-col">
    <h3 class="text-xl font-heading font-bold text-white mb-3">{{ item.title }}</h3>
    <p class="text-zinc-300 text-sm leading-relaxed flex-1">{{ item.description }}</p>
    <!-- tags opcionales -->
  </div>
  <!-- Accent line hover -->
</article>
```

## Jerarquía tipográfica dentro de cards

```
Título          → font-heading font-bold text-xl md:text-2xl text-white
Subtítulo       → text-xs uppercase tracking-widest text-amber-400/80
Cuerpo          → text-sm leading-relaxed text-zinc-300
Metadata        → text-xs text-zinc-500
Tags / badges   → text-xs px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20
```

## Glass morphism para elementos de énfasis

Usar `bg-white/8 backdrop-blur-sm border border-white/15` para badges flotantes sobre imágenes, stats destacadas o fechas prominentes. No usarlo en cards normales del grid.

## Reveal escalonado

- Header siempre primero con `appReveal` sin delay
- Cards: `i * 100 + 'ms'` estándar
- Galerías densas: `i * 70 + 'ms'`
- Elementos de 2 columnas: `i * 150 + 'ms'`

## Sección de 2 columnas (imagen + contenido)

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
  <!-- Imagen con badge glass -->
  <div appReveal class="relative h-80 md:h-125 rounded-lg overflow-hidden">
    <img [ngSrc]="image" fill [alt]="imageAlt" class="object-cover object-center" />
    <div class="absolute inset-0 bg-linear-to-t from-zinc-950/50 via-transparent to-transparent"></div>
    <div class="absolute bottom-5 left-5 right-5 bg-white/8 backdrop-blur-md border border-white/15 rounded-lg px-5 py-4">
      <!-- badge de identidad del cliente -->
    </div>
  </div>
  <!-- Contenido -->
  <div appReveal delay="150ms" class="flex flex-col gap-8">
    <app-section-header ... align="left" />
    <!-- párrafos, stats, CTAs -->
  </div>
</div>
```

## Decisiones creativas por sección

1. **Color del glow**: ámbar, teal, púrpura, naranja — según la emoción del contenido. Nunca igual que la sección anterior
2. **Posición del glow**: esquina superior, lateral, centro — varía en cada sección
3. **Alineación del header**: `center` para catálogos, `left` para narrativas
4. **Tint en cards con foto**: cada sección puede tener su gradiente propio
5. **Densidad visual**: alto impacto → cards grandes con foto completa; informativas → cards compactas