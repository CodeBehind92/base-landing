---
name: hero
description: Crea el hero principal de un landing page Angular + TailwindCSS. Úsalo siempre que se solicite construir o regenerar la sección hero, portada, primera sección, o cuando el usuario diga "crea el hero para [cliente]". Esta sección es la de mayor identidad visual del proyecto — nunca uses plantillas genéricas, cada hero debe ser único.
---

# Skill: Hero principal

## Antes de escribir una sola línea de código

1. Identifica el concepto narrativo del cliente (¿qué historia cuenta?)
2. Decide el elemento SVG que representa al negocio (olas, montañas, llamas, hojas, trazos, etc.)
3. Define los colores de los glow blobs según la emoción del negocio
4. Elige el tono del H1 (¿nombre? ¿promesa? ¿eslogan?)
5. Luego implementa

## El hero es una escena, no una sección

Ocupa mínimo `min-h-screen`, idealmente `lg:min-h-[120vh]`. Se construye en **5 capas independientes** con parallax a velocidades distintas.

## Arquitectura de capas (obligatoria)

| Capa | z-index | Contenido | Parallax |
|------|---------|-----------|---------|
| 1 | z-0 | Foto de fondo + overlays de oscurecimiento + grain texture | 0.12x |
| 2 | z-0 | 3 glow blobs ambientales con `animate-glow-pulse` | 0.12x (junto con capa 1) |
| 3 | z-10 | SVG narrativo animado (representa al cliente) | -0.06x inverso |
| 4 | z-20 | Contenido principal: eyebrow → H1 → subheadline → CTAs → stats | 0.22x |
| 5 | z-30 | Fade inferior `h-48` hacia `zinc-950` (puente visual) | sin parallax |

## Overlays de la foto de fondo

```html
<div class="absolute inset-0 bg-zinc-950/65"></div>
<div class="absolute inset-0 bg-linear-to-b from-zinc-950/70 via-transparent to-zinc-950"></div>
<!-- Grain texture sutil -->
<div class="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none"></div>
```

Ajusta la opacidad base según la foto: más oscura si la foto es clara, más tenue si ya es oscura.

## SVG narrativo (capa 3)

No es decoración genérica. Representa algo del cliente:
- Río / agua → paths ondulados con stroke teal/ámbar
- Montañas → paths angulares con stroke claro
- Fuego / parrilla → paths irregulares cálidos
- Naturaleza → curvas orgánicas verdes

Técnica de animación: `stroke-dasharray` + `stroke-dashoffset` para efecto de dibujo progresivo. Múltiples paths con opacidades y velocidades distintas para profundidad.

```html
<path
  class="river-path"
  stroke="rgba(20,184,166,0.38)"
  stroke-width="2.5"
  stroke-linecap="round"
/>
```

En `styles.css`:
```css
.river-path {
  stroke-dasharray: 1500;
  stroke-dashoffset: 1500;
  animation: drawPath 3s ease forwards;
}
@keyframes drawPath {
  to { stroke-dashoffset: 0; }
}
```

## Glow blobs (capa 2)

Siempre 3, en posiciones distintas, colores según la emoción del negocio:

```html
<!-- Blob primario (el más grande, esquina superior) -->
<div class="absolute -top-32 -left-40 w-162.5 h-162.5 bg-[color-primario]/8 rounded-lg blur-3xl animate-glow-pulse"></div>
<!-- Blob secundario (lateral derecho) -->
<div class="absolute top-1/4 -right-24 w-112.5 h-112.5 bg-[color-secundario]/6 rounded-lg blur-3xl animate-glow-pulse" style="animation-delay: 1.5s;"></div>
<!-- Blob terciario (centro inferior) -->
<div class="absolute bottom-1/3 left-1/3 w-72 h-72 bg-[color-calido]/5 rounded-lg blur-3xl animate-glow-pulse" style="animation-delay: 3s;"></div>
```

Los colores no son siempre ámbar/teal. Deben pertenecer emocionalmente al cliente.

## Jerarquía tipográfica del contenido (capa 4)

```html
<!-- Eyebrow con líneas decorativas flanqueando -->
<div class="flex items-center gap-3 mb-8">
  <span class="w-8 h-px bg-amber-400/35"></span>
  <span class="text-xs uppercase tracking-[0.28em] font-semibold text-amber-400/75">{{ eyebrow }}</span>
  <span class="w-8 h-px bg-amber-400/35"></span>
</div>

<!-- H1: escala máxima del proyecto -->
<h1 class="font-heading font-black text-white leading-none tracking-tight text-6xl md:text-7xl lg:text-8xl max-w-4xl">
  {{ headline }}
</h1>

<!-- Subheadline: apoyo emocional -->
<p class="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-12">
  {{ subheadline }}
</p>
```

## CTA dual (obligatorio, nunca uno solo, nunca tres)

```html
<!-- Primario: color de marca del cliente -->
<a class="inline-flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950">
  {{ ctaPrimary.label }}
  <!-- ícono flecha → siempre presente -->
</a>

<!-- Secundario: glass/ghost -->
<a class="inline-flex items-center gap-2.5 text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/25 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950">
  {{ ctaSecondary.label }}
</a>
```

## Stats row (solo si el cliente tiene datos reales)

```html
<div class="flex items-center gap-6 md:gap-10 mt-16 pt-8 border-t border-white/5">
  @for (stat of stats; track stat.label) {
    <div class="flex flex-col items-center gap-1">
      <strong class="text-white font-heading font-bold text-2xl md:text-3xl leading-none">{{ stat.value }}</strong>
      <span class="text-zinc-500 text-[10px] md:text-xs uppercase tracking-widest">{{ stat.label }}</span>
    </div>
    @if (!$last) {
      <div class="w-px h-8 bg-white/10 shrink-0" aria-hidden="true"></div>
    }
  }
</div>
```

No inventar datos. Si el cliente no tiene métricas relevantes, omitir esta fila.

## Scroll indicator

```html
<div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2" aria-hidden="true">
  <span class="text-zinc-600 text-[9px] uppercase tracking-[0.22em]">Explorar</span>
  <svg class="w-5 h-5 text-zinc-500 animate-bounce"><!-- chevron down --></svg>
</div>
```

El label ("Explorar", "Descubrir", "Conocernos") se adapta al tono del cliente.

## Parallax con signals (Angular)

```typescript
private readonly scrollY = signal(0);
protected readonly bgParallax = computed(() => `translateY(${this.scrollY() * 0.12}px)`);
protected readonly contentParallax = computed(() => `translateY(${this.scrollY() * 0.22}px)`);
protected readonly svgParallax = computed(
  () => `translateY(${this.scrollY() * -0.06}px) translateX(${this.scrollY() * -0.02}px)`
);

constructor() {
  afterNextRender(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      this.scrollListener = () => this.scrollY.set(window.scrollY);
      window.addEventListener('scroll', this.scrollListener, { passive: true });
    }
  });
}
```

## Animación de entrada (styles.css)

```css
.hero-animate {
  opacity: 0;
  transform: translateY(20px);
  animation: heroFadeUp 0.7s ease forwards;
}
.hero-animate-delay-1 { animation-delay: 0.1s; }
.hero-animate-delay-2 { animation-delay: 0.25s; }
.hero-animate-delay-3 { animation-delay: 0.4s; }
.hero-animate-delay-4 { animation-delay: 0.55s; }
.hero-animate-delay-5 { animation-delay: 0.7s; }

@keyframes heroFadeUp {
  to { opacity: 1; transform: translateY(0); }
}
```

Orden de entrada: eyebrow (1) → H1 (2) → subheadline (3) → CTAs (4) → stats + scroll indicator (5).

## Sistema de temas

Siempre importa `THEME` desde `theme.config.ts`. Nunca hardcodees colores de acento:

```typescript
import { THEME } from '@core/config/theme.config';
protected readonly theme = THEME;
```

```html
<!-- Eyebrow con tema -->
<span [class]="theme.accentTextMuted">{{ eyebrow }}</span>
<span [class]="'w-8 h-px ' + theme.accentBorderLine"></span>

<!-- CTA primario con tema -->
<a [class]="'inline-flex ... ' + theme.ctaBg + ' ' + theme.ctaBgHover + ' ' + theme.ctaText + ' ' + theme.ctaShadow + ' ' + theme.ctaRing">
  {{ ctaPrimary.label }}
</a>

<!-- Glow blobs con tema -->
<div [class]="'absolute -top-32 -left-40 w-162.5 h-162.5 rounded-lg blur-3xl animate-glow-pulse ' + theme.glowPrimary"></div>
```

## Variantes del delineador inferior (SVG narrativo — capa 3)

Elige una variante por proyecto. **Nunca uses la misma en dos landings distintos.**

### Variante A — Río / agua (flujo ondulado)
```html
<svg viewBox="0 0 1440 180" fill="none" class="w-full" preserveAspectRatio="none">
  <path d="M0,120 C200,88 380,150 580,120 S880,88 1080,120 S1280,150 1440,115"
    stroke="rgba(20,184,166,0.07)" stroke-width="1" class="river-path river-path--tertiary"/>
  <path d="M0,70 C180,42 360,98 560,70 S830,42 1020,70 S1200,98 1380,70 L1440,68"
    stroke="rgba(245,158,11,0.16)" stroke-width="1.5" class="river-path river-path--secondary"/>
  <path d="M0,90 C130,58 280,122 460,90 S700,58 880,90 S1060,122 1240,90 S1390,58 1440,86"
    stroke="rgba(20,184,166,0.38)" stroke-width="2.5" stroke-linecap="round" class="river-path river-path--main"/>
</svg>
```

### Variante B — Montaña / horizonte (silueta angular)
```html
<svg viewBox="0 0 1440 160" fill="none" class="w-full" preserveAspectRatio="none">
  <path d="M0,160 L200,80 L380,120 L560,40 L740,100 L920,30 L1100,90 L1280,50 L1440,80 L1440,160 Z"
    fill="rgba(255,255,255,0.02)"/>
  <path d="M0,160 L200,80 L380,120 L560,40 L740,100 L920,30 L1100,90 L1280,50 L1440,80"
    stroke="rgba(255,255,255,0.08)" stroke-width="1" class="river-path"/>
  <path d="M0,160 L280,100 L520,130 L760,60 L1000,110 L1240,70 L1440,95"
    stroke="rgba(245,158,11,0.20)" stroke-width="1.5" stroke-linecap="round" class="river-path river-path--secondary"/>
</svg>
```

### Variante C — Pulso / señal (línea técnica)
```html
<svg viewBox="0 0 1440 120" fill="none" class="w-full" preserveAspectRatio="none">
  <path d="M0,60 L120,60 L160,20 L200,100 L240,20 L280,100 L320,60 L560,60 L600,30 L640,90 L680,30 L720,60 L1440,60"
    stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <path d="M0,60 L200,60 L240,15 L280,105 L320,15 L360,60 L700,60 L740,35 L780,85 L820,35 L860,60 L1440,60"
    stroke="rgba(245,158,11,0.22)" stroke-width="1.5" stroke-linecap="round" class="river-path"/>
</svg>
```

### Variante D — Orgánico / botánico (curvas naturales)
```html
<svg viewBox="0 0 1440 200" fill="none" class="w-full" preserveAspectRatio="none">
  <path d="M0,100 C100,60 200,140 400,80 C600,20 700,160 900,90 C1100,20 1300,130 1440,70"
    stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  <path d="M0,130 C150,80 300,170 500,100 C700,30 850,150 1050,80 C1250,10 1380,120 1440,90"
    stroke="rgba(16,185,129,0.18)" stroke-width="2" stroke-linecap="round" class="river-path river-path--secondary"/>
  <path d="M0,80 C120,40 280,120 480,60 C680,0 820,130 1020,70 C1220,10 1360,100 1440,50"
    stroke="rgba(245,158,11,0.14)" stroke-width="1.5" class="river-path"/>
</svg>
```

### Variante E — Diagonal / corte moderno (líneas rectas en ángulo)
```html
<svg viewBox="0 0 1440 140" fill="none" class="w-full" preserveAspectRatio="none">
  <path d="M0,140 L400,40 L800,100 L1440,20" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  <path d="M0,120 L350,30 L750,90 L1440,10" stroke="rgba(245,158,11,0.18)" stroke-width="1.5" stroke-linecap="round" class="river-path"/>
  <path d="M0,100 L500,60 L900,80 L1440,30" stroke="rgba(255,255,255,0.04)" stroke-width="1" class="river-path river-path--secondary"/>
</svg>
```

Adapta los colores de stroke según el tema activo del proyecto.

## Imágenes: siempre fotografía real, nunca iconos

El fondo del hero siempre es una fotografía real del cliente o del contexto. Nunca un gradiente puro, nunca iconos como elemento visual principal.

## Nivel de calidad esperado

El resultado debe sentirse: **premium / storytelling visual / turismo de alto nivel**.
NO debe sentirse: landing genérica / header simple / banner estático.