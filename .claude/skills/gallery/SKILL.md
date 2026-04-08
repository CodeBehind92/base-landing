---
name: gallery
description: Crea secciones de galería fotográfica en formato bento grid para landing pages Angular + TailwindCSS. Úsalo cuando se solicite una galería, portafolio visual, álbum de fotos, o sección de imágenes. La galería no es una cuadrícula genérica — es una composición editorial con jerarquía visual y punto focal dominante.
---

# Skill: Galería fotográfica (Bento Grid)

## Principio central

La galería debe tener exactamente **un punto focal dominante** que rompa la uniformidad. Sin él, se convierte en un mosaico genérico.

- El primer elemento (`index === 0`, `featured: true`) siempre ocupa más espacio
- Debe ser la foto más representativa o impactante del cliente
- El tamaño comunica jerarquía: *esta es la imagen que define al negocio*

## Grid con `grid-auto-rows`

Nunca alturas fijas en elementos individuales. La consistencia viene del padre:

```html
<div
  class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
  style="grid-auto-rows: 220px;"
  role="list"
>
```

Ajustar `grid-auto-rows` según las fotos:
- Paisajes horizontales: `180px–220px`
- Retratos o productos verticales: `240px–280px`
- Mixto: `220px` como valor equilibrado

## Semántica obligatoria

```html
<figure role="listitem">        <!-- figure, no article ni div -->
  <img [ngSrc]="..." fill [alt]="item.alt" />
  <figcaption>...</figcaption>  <!-- figcaption, no div -->
</figure>
```

Nunca `alt=""` en imágenes de galería. Todas tienen valor informativo.

## Interacción hover

```html
<figure [class]="figureClass(item, i)">
  <img class="object-cover group-hover:scale-105 transition-transform duration-700" />

  <!-- Caption emergente en hover -->
  <figcaption class="absolute inset-0 bg-zinc-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
    <p class="text-white text-sm font-medium leading-snug line-clamp-2 drop-shadow">{{ item.alt }}</p>
  </figcaption>

  <!-- Accent line ámbar (micro-patrón del sistema) -->
  <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
</figure>
```

`scale-105` en la imagen — más sutil que en cards de contenido. Caption en parte inferior, nunca centrado.

## Clase dinámica del elemento (TypeScript)

```typescript
protected figureClass(item: GalleryItem, index: number): string {
  const base = 'group relative overflow-hidden rounded-lg cursor-default border border-white/10 hover:border-white/20 transition-all duration-500 ';
  const span = item.featured && index === 0 ? 'col-span-2 row-span-2 ' : '';
  return base + span;
}
```

## Reveal escalonado rápido

```html
<figure appReveal [delay]="i * 70 + 'ms'">
```

`70ms` máximo entre elementos. Reducir a `50ms` en galerías densas.

## Estructura de la sección

```html
<section id="galeria" aria-labelledby="gallery-heading" class="relative py-24 lg:py-32 overflow-hidden">
  <!-- Separador superior -->
  <div class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" aria-hidden="true"></div>
  <!-- Ambient glow -->
  <div class="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/4 rounded-full blur-3xl pointer-events-none animate-glow-pulse" aria-hidden="true"></div>

  <div class="container mx-auto px-4 md:px-6 lg:px-8 relative">
    <div appReveal class="mb-16">
      <app-section-header headingId="gallery-heading" [eyebrow]="eyebrow" [title]="title" [subtitle]="subtitle" align="center" />
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" style="grid-auto-rows: 220px;" role="list" aria-label="[descripción]">
      @for (item of items; track item.id; let i = $index) {
        <figure role="listitem" appReveal [delay]="i * 70 + 'ms'" [class]="figureClass(item, i)">
          <!-- imagen + caption + accent line -->
        </figure>
      }
    </div>
  </div>
</section>
```

## Imágenes: siempre fotografía real, nunca iconos ni ilustraciones

## Decisiones creativas por proyecto

1. **¿Cuál es la foto focal?** La más representativa va en `index 0` con `featured: true`
2. **`grid-auto-rows`**: según orientación predominante de las fotos
3. **Columnas en mobile**: `grid-cols-2` general, `grid-cols-1` si fotos muy verticales
4. **Color del glow**: ámbar para negocios cálidos, teal para naturaleza, neutro para producto
5. **Gap**: `gap-3` para composición densa, `gap-6` para más aire