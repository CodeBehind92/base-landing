/**
 * THEME CONFIGURATION
 * ===================
 * Cambia `ACTIVE_THEME` para aplicar un tema diferente al landing.
 * Todos los temas mantienen el core dark (zinc-950) y solo cambia el color de acento.
 *
 * Temas disponibles:
 *  'amber'   → Dorado cálido (default)
 *  'red'     → Rojo intenso
 *  'blue'    → Azul profundo
 *  'green'   → Verde esmeralda
 *  'violet'  → Violeta eléctrico
 *  'fuchsia' → Fucsia vibrante
 *  'rose'    → Rosa elegante
 *  'cyan'    → Cian frío
 *  'orange'  → Naranja fuego
 *  'emerald' → Verde jade
 */
export const ACTIVE_THEME = 'amber' as const;

// ─────────────────────────────────────────────────────────────────────────────

export type ThemeName =
  | 'amber'
  | 'red'
  | 'blue'
  | 'green'
  | 'violet'
  | 'fuchsia'
  | 'rose'
  | 'cyan'
  | 'orange'
  | 'emerald';

export interface LandingTheme {
  name: ThemeName;
  label: string;

  // ── Botón CTA primario ──────────────────────────────────────────────────────
  ctaBg: string;              // bg del botón
  ctaBgHover: string;         // bg en hover
  ctaText: string;            // color del texto del botón
  ctaShadow: string;          // sombra glow en hover
  ctaRing: string;            // focus ring

  // ── Textos de acento ────────────────────────────────────────────────────────
  accentText: string;         // eyebrow, labels, valores destacados
  accentTextMuted: string;    // eyebrow con opacidad (ej. text-amber-400/75)

  // ── Bordes y líneas de acento ───────────────────────────────────────────────
  accentBorderLine: string;   // líneas decorativas del eyebrow (bg-amber-400/35)
  accentLine: string;         // accent line hover en cards (via-amber-400/40)

  // ── Glow blobs ambientales ──────────────────────────────────────────────────
  glowPrimary: string;        // blob principal (bg-amber-500/8)
  glowSecondary: string;      // blob secundario (bg-teal-500/6 — puede variar)
  glowTertiary: string;       // blob terciario (bg-orange-400/5)

  // ── Cards y badges ──────────────────────────────────────────────────────────
  badgeBg: string;            // fondo del badge/tag (bg-amber-400/10)
  badgeBorder: string;        // borde del badge (border-amber-400/20)
  badgeText: string;          // texto del badge (text-amber-400)

  // ── Stats y valores numéricos ───────────────────────────────────────────────
  statHover: string;          // color del valor en hover (group-hover:text-amber-400)

  // ── Separador decorativo ─────────────────────────────────────────────────────
  dividerGradient: string;    // gradiente del separador (from-amber-400/30)

  // ── Hover de cards ───────────────────────────────────────────────────────────
  cardBorderHoverAccent: string; // hover:border-amber-400/20
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFINICIÓN DE LOS 10 TEMAS
// ─────────────────────────────────────────────────────────────────────────────

const THEMES: Record<ThemeName, LandingTheme> = {

  // ── 1. AMBER (default) ──────────────────────────────────────────────────────
  amber: {
    name: 'amber',
    label: 'Dorado cálido',
    ctaBg: 'bg-amber-500',
    ctaBgHover: 'hover:bg-amber-400',
    ctaText: 'text-zinc-950',
    ctaShadow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]',
    ctaRing: 'focus-visible:ring-amber-400',
    accentText: 'text-amber-400',
    accentTextMuted: 'text-amber-400/75',
    accentBorderLine: 'bg-amber-400/35',
    accentLine: 'via-amber-400/40',
    glowPrimary: 'bg-amber-500/8',
    glowSecondary: 'bg-teal-500/6',
    glowTertiary: 'bg-orange-400/5',
    badgeBg: 'bg-amber-400/10',
    badgeBorder: 'border-amber-400/20',
    badgeText: 'text-amber-400',
    statHover: 'group-hover:text-amber-400',
    dividerGradient: 'from-amber-400/30',
    cardBorderHoverAccent: 'hover:border-amber-400/20',
  },

  // ── 2. RED ──────────────────────────────────────────────────────────────────
  red: {
    name: 'red',
    label: 'Rojo intenso',
    ctaBg: 'bg-red-600',
    ctaBgHover: 'hover:bg-red-500',
    ctaText: 'text-white',
    ctaShadow: 'hover:shadow-[0_0_40px_rgba(220,38,38,0.45)]',
    ctaRing: 'focus-visible:ring-red-500',
    accentText: 'text-red-400',
    accentTextMuted: 'text-red-400/75',
    accentBorderLine: 'bg-red-400/35',
    accentLine: 'via-red-500/40',
    glowPrimary: 'bg-red-600/8',
    glowSecondary: 'bg-orange-500/5',
    glowTertiary: 'bg-rose-400/4',
    badgeBg: 'bg-red-400/10',
    badgeBorder: 'border-red-400/20',
    badgeText: 'text-red-400',
    statHover: 'group-hover:text-red-400',
    dividerGradient: 'from-red-400/30',
    cardBorderHoverAccent: 'hover:border-red-500/20',
  },

  // ── 3. BLUE ─────────────────────────────────────────────────────────────────
  blue: {
    name: 'blue',
    label: 'Azul profundo',
    ctaBg: 'bg-blue-600',
    ctaBgHover: 'hover:bg-blue-500',
    ctaText: 'text-white',
    ctaShadow: 'hover:shadow-[0_0_40px_rgba(37,99,235,0.45)]',
    ctaRing: 'focus-visible:ring-blue-400',
    accentText: 'text-blue-400',
    accentTextMuted: 'text-blue-400/75',
    accentBorderLine: 'bg-blue-400/35',
    accentLine: 'via-blue-400/40',
    glowPrimary: 'bg-blue-600/8',
    glowSecondary: 'bg-indigo-500/6',
    glowTertiary: 'bg-cyan-400/4',
    badgeBg: 'bg-blue-400/10',
    badgeBorder: 'border-blue-400/20',
    badgeText: 'text-blue-400',
    statHover: 'group-hover:text-blue-400',
    dividerGradient: 'from-blue-400/30',
    cardBorderHoverAccent: 'hover:border-blue-400/20',
  },

  // ── 4. GREEN ─────────────────────────────────────────────────────────────────
  green: {
    name: 'green',
    label: 'Verde naturaleza',
    ctaBg: 'bg-green-600',
    ctaBgHover: 'hover:bg-green-500',
    ctaText: 'text-white',
    ctaShadow: 'hover:shadow-[0_0_40px_rgba(22,163,74,0.45)]',
    ctaRing: 'focus-visible:ring-green-400',
    accentText: 'text-green-400',
    accentTextMuted: 'text-green-400/75',
    accentBorderLine: 'bg-green-400/35',
    accentLine: 'via-green-400/40',
    glowPrimary: 'bg-green-600/8',
    glowSecondary: 'bg-teal-500/6',
    glowTertiary: 'bg-emerald-400/4',
    badgeBg: 'bg-green-400/10',
    badgeBorder: 'border-green-400/20',
    badgeText: 'text-green-400',
    statHover: 'group-hover:text-green-400',
    dividerGradient: 'from-green-400/30',
    cardBorderHoverAccent: 'hover:border-green-400/20',
  },

  // ── 5. VIOLET ────────────────────────────────────────────────────────────────
  violet: {
    name: 'violet',
    label: 'Violeta eléctrico',
    ctaBg: 'bg-violet-600',
    ctaBgHover: 'hover:bg-violet-500',
    ctaText: 'text-white',
    ctaShadow: 'hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]',
    ctaRing: 'focus-visible:ring-violet-400',
    accentText: 'text-violet-400',
    accentTextMuted: 'text-violet-400/75',
    accentBorderLine: 'bg-violet-400/35',
    accentLine: 'via-violet-400/40',
    glowPrimary: 'bg-violet-600/8',
    glowSecondary: 'bg-purple-500/6',
    glowTertiary: 'bg-indigo-400/4',
    badgeBg: 'bg-violet-400/10',
    badgeBorder: 'border-violet-400/20',
    badgeText: 'text-violet-400',
    statHover: 'group-hover:text-violet-400',
    dividerGradient: 'from-violet-400/30',
    cardBorderHoverAccent: 'hover:border-violet-400/20',
  },

  // ── 6. FUCHSIA ───────────────────────────────────────────────────────────────
  fuchsia: {
    name: 'fuchsia',
    label: 'Fucsia vibrante',
    ctaBg: 'bg-fuchsia-600',
    ctaBgHover: 'hover:bg-fuchsia-500',
    ctaText: 'text-white',
    ctaShadow: 'hover:shadow-[0_0_40px_rgba(192,38,211,0.5)]',
    ctaRing: 'focus-visible:ring-fuchsia-400',
    accentText: 'text-fuchsia-400',
    accentTextMuted: 'text-fuchsia-400/75',
    accentBorderLine: 'bg-fuchsia-400/35',
    accentLine: 'via-fuchsia-400/40',
    glowPrimary: 'bg-fuchsia-600/8',
    glowSecondary: 'bg-pink-500/5',
    glowTertiary: 'bg-purple-400/4',
    badgeBg: 'bg-fuchsia-400/10',
    badgeBorder: 'border-fuchsia-400/20',
    badgeText: 'text-fuchsia-400',
    statHover: 'group-hover:text-fuchsia-400',
    dividerGradient: 'from-fuchsia-400/30',
    cardBorderHoverAccent: 'hover:border-fuchsia-400/20',
  },

  // ── 7. ROSE ───────────────────────────────────────────────────────────────────
  rose: {
    name: 'rose',
    label: 'Rosa elegante',
    ctaBg: 'bg-rose-500',
    ctaBgHover: 'hover:bg-rose-400',
    ctaText: 'text-white',
    ctaShadow: 'hover:shadow-[0_0_40px_rgba(244,63,94,0.45)]',
    ctaRing: 'focus-visible:ring-rose-400',
    accentText: 'text-rose-400',
    accentTextMuted: 'text-rose-400/75',
    accentBorderLine: 'bg-rose-400/35',
    accentLine: 'via-rose-400/40',
    glowPrimary: 'bg-rose-500/8',
    glowSecondary: 'bg-pink-400/5',
    glowTertiary: 'bg-fuchsia-400/4',
    badgeBg: 'bg-rose-400/10',
    badgeBorder: 'border-rose-400/20',
    badgeText: 'text-rose-400',
    statHover: 'group-hover:text-rose-400',
    dividerGradient: 'from-rose-400/30',
    cardBorderHoverAccent: 'hover:border-rose-400/20',
  },

  // ── 8. CYAN ───────────────────────────────────────────────────────────────────
  cyan: {
    name: 'cyan',
    label: 'Cian tecnológico',
    ctaBg: 'bg-cyan-500',
    ctaBgHover: 'hover:bg-cyan-400',
    ctaText: 'text-zinc-950',
    ctaShadow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.45)]',
    ctaRing: 'focus-visible:ring-cyan-400',
    accentText: 'text-cyan-400',
    accentTextMuted: 'text-cyan-400/75',
    accentBorderLine: 'bg-cyan-400/35',
    accentLine: 'via-cyan-400/40',
    glowPrimary: 'bg-cyan-500/8',
    glowSecondary: 'bg-teal-500/5',
    glowTertiary: 'bg-blue-400/4',
    badgeBg: 'bg-cyan-400/10',
    badgeBorder: 'border-cyan-400/20',
    badgeText: 'text-cyan-400',
    statHover: 'group-hover:text-cyan-400',
    dividerGradient: 'from-cyan-400/30',
    cardBorderHoverAccent: 'hover:border-cyan-400/20',
  },

  // ── 9. ORANGE ─────────────────────────────────────────────────────────────────
  orange: {
    name: 'orange',
    label: 'Naranja fuego',
    ctaBg: 'bg-orange-500',
    ctaBgHover: 'hover:bg-orange-400',
    ctaText: 'text-zinc-950',
    ctaShadow: 'hover:shadow-[0_0_40px_rgba(249,115,22,0.45)]',
    ctaRing: 'focus-visible:ring-orange-400',
    accentText: 'text-orange-400',
    accentTextMuted: 'text-orange-400/75',
    accentBorderLine: 'bg-orange-400/35',
    accentLine: 'via-orange-400/40',
    glowPrimary: 'bg-orange-500/8',
    glowSecondary: 'bg-red-400/5',
    glowTertiary: 'bg-amber-400/4',
    badgeBg: 'bg-orange-400/10',
    badgeBorder: 'border-orange-400/20',
    badgeText: 'text-orange-400',
    statHover: 'group-hover:text-orange-400',
    dividerGradient: 'from-orange-400/30',
    cardBorderHoverAccent: 'hover:border-orange-400/20',
  },

  // ── 10. EMERALD ───────────────────────────────────────────────────────────────
  emerald: {
    name: 'emerald',
    label: 'Verde jade',
    ctaBg: 'bg-emerald-500',
    ctaBgHover: 'hover:bg-emerald-400',
    ctaText: 'text-zinc-950',
    ctaShadow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.45)]',
    ctaRing: 'focus-visible:ring-emerald-400',
    accentText: 'text-emerald-400',
    accentTextMuted: 'text-emerald-400/75',
    accentBorderLine: 'bg-emerald-400/35',
    accentLine: 'via-emerald-400/40',
    glowPrimary: 'bg-emerald-500/8',
    glowSecondary: 'bg-teal-500/5',
    glowTertiary: 'bg-green-400/4',
    badgeBg: 'bg-emerald-400/10',
    badgeBorder: 'border-emerald-400/20',
    badgeText: 'text-emerald-400',
    statHover: 'group-hover:text-emerald-400',
    dividerGradient: 'from-emerald-400/30',
    cardBorderHoverAccent: 'hover:border-emerald-400/20',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTACIÓN DEL TEMA ACTIVO
// ─────────────────────────────────────────────────────────────────────────────

export const THEME: LandingTheme = THEMES[ACTIVE_THEME];