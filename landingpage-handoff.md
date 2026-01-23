# Landing Page Product Specification & Engineering Handoff

> **File Location:** `src/pages/LandingPage.tsx`  
> **Framework:** React + TypeScript + Tailwind CSS + Framer Motion  
> **Last Updated:** January 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Layout & Spacing](#layout--spacing)
6. [Component Breakdown](#component-breakdown)
7. [Animations](#animations)
8. [Responsive Behavior](#responsive-behavior)
9. [Assets & External Resources](#assets--external-resources)
10. [Code Reference Map](#code-reference-map)

---

## Overview

A modern, Apple/Airbnb-inspired marketing landing page for the "Sisterhood" mobile app. The design emphasizes elegance, whitespace, and subtle motion. The page is structured as a single-page scrolling experience with anchor navigation.

### Page Sections
| Section | ID | Purpose |
|---------|-----|---------|
| Navigation | - | Fixed header with logo and nav links |
| Hero | `#home` | App introduction + iPhone mockup + download CTAs |
| Features Strip | - | 4-column feature highlights |
| About | `#about` | Brand story + 3 value proposition cards |
| Contact | `#contact` | Contact info + social links |
| Download CTA | `#download` | Final conversion section |
| Footer | - | Logo + copyright + legal links |

---

## Technology Stack

| Technology | Version | Purpose | File Reference |
|------------|---------|---------|----------------|
| React | ^18.3.1 | UI Framework | `src/pages/LandingPage.tsx` |
| TypeScript | - | Type safety | `src/pages/LandingPage.tsx` |
| Tailwind CSS | - | Styling | `tailwind.config.ts`, `src/index.css` |
| Framer Motion | ^11.18.2 | Animations | `src/pages/LandingPage.tsx` |
| Lucide React | ^0.462.0 | Icons | `src/pages/LandingPage.tsx` |

---

## Color System

### CSS Custom Properties

**File:** `src/index.css` (lines 8-78)

#### Core Semantic Colors

| Token | HSL Value | Hex Equivalent | Usage |
|-------|-----------|----------------|-------|
| `--background` | `80 30% 96%` | `#F9F7F4` | Page background |
| `--foreground` | `90 15% 25%` | `#3D4336` | Primary text |
| `--card` | `80 25% 98%` | `#FBFBF9` | Card backgrounds |
| `--card-foreground` | `90 15% 25%` | `#3D4336` | Card text |
| `--muted` | `80 20% 92%` | `#EAE8E3` | Muted backgrounds |
| `--muted-foreground` | `90 10% 45%` | `#757569` | Secondary text |
| `--border` | `80 20% 88%` | `#E0DDD6` | Borders |
| `--accent` | `350 35% 93%` | `#F6E5E7` | Light pink accent |

#### Brand Colors

| Token | HSL Value | Hex Equivalent | Usage |
|-------|-----------|----------------|-------|
| `--primary` | `78 18% 60%` | `#A0AB89` | Sage green (primary CTA) |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | Text on primary |
| `--secondary` | `5 55% 84%` | `#EFC0BC` | Soft blush pink |
| `--secondary-foreground` | `5 30% 35%` | `#6E4A45` | Text on secondary |

#### Extended Palette

| Token | HSL Value | Hex Equivalent | Usage |
|-------|-----------|----------------|-------|
| `--blush` | `5 55% 84%` | `#EFC0BC` | Blush pink |
| `--blush-light` | `350 35% 93%` | `#F6E5E7` | Light blush |
| `--coral` | `8 52% 75%` | `#E8998D` | Coral accent |
| `--lavender` | `280 25% 90%` | `#E8E0F0` | Lavender tint |
| `--lavender-dark` | `280 20% 72%` | `#B8A3C7` | Dark lavender |
| `--sage` | `78 18% 60%` | `#A0AB89` | Sage green |
| `--sage-light` | `78 25% 80%` | `#C8D1B8` | Light sage |
| `--sage-dark` | `78 20% 45%` | `#7A8A65` | Dark sage |
| `--cream` | `45 35% 96%` | `#FBF9F4` | Cream background |

#### Gradients

| Token | Value | Usage |
|-------|-------|-------|
| `--gradient-primary` | `linear-gradient(135deg, hsl(78 25% 80%), hsl(78 18% 60%))` | Primary gradient |
| `--gradient-blush` | `linear-gradient(135deg, hsl(350 35% 93%), hsl(5 55% 84%))` | Blush gradient |

### Tailwind Config

**File:** `tailwind.config.ts` (lines 20-82)

All colors mapped to semantic tokens:
```ts
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
  secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
  muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
  accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
  card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
  blush: { DEFAULT: "hsl(var(--blush))", light: "hsl(var(--blush-light))" },
  coral: "hsl(var(--coral))",
  lavender: { DEFAULT: "hsl(var(--lavender))", dark: "hsl(var(--lavender-dark))" },
  sage: { DEFAULT: "hsl(var(--sage))", light: "hsl(var(--sage-light))", dark: "hsl(var(--sage-dark))" },
  cream: "hsl(var(--cream))",
}
```

---

## Typography

### Font Families

**Import Location:** `src/pages/LandingPage.tsx` (lines 31-35)

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap');
```

| Font | CSS Class | Usage | Weight |
|------|-----------|-------|--------|
| DM Serif Display | `.font-display` | Headings, titles | 400 (Regular) |
| Inter | `.font-body` | Body text, labels, buttons | 400, 500, 600 |

### Type Scale

| Element | Font | Size (Mobile) | Size (Desktop) | Weight | Line Height |
|---------|------|---------------|----------------|--------|-------------|
| Hero H1 | DM Serif Display | `text-5xl` (48px) | `text-7xl` (72px) | Normal | `leading-tight` |
| Section H2 | DM Serif Display | `text-4xl` (36px) | `text-5xl` (48px) | Normal | Default |
| Download H2 | DM Serif Display | `text-5xl` (48px) | `text-6xl` (60px) | Normal | Default |
| Feature Title | DM Serif Display | `text-lg` (18px) | - | Normal | Default |
| Card Title | DM Serif Display | `text-xl` (20px) | - | Normal | Default |
| Body Large | Inter | `text-lg` (18px) | - | 400 | `leading-relaxed` |
| Body Medium | Inter | `text-base` (16px) | - | 400 | Default |
| Body Small | Inter | `text-sm` (14px) | - | 400-600 | Default |
| Label | Inter | `text-sm` (14px) | - | 500-600 | Default |
| Caption | Inter | `text-xs` (12px) | - | 400 | Default |
| Nav Link | Inter | `text-sm` (14px) | - | 500 | Default |

---

## Layout & Spacing

### Container

```css
max-width: 1152px (max-w-6xl)
padding-x: 24px (px-6)
margin: 0 auto (mx-auto)
```

### Section Spacing

| Section | Padding Y | Additional |
|---------|-----------|------------|
| Hero | `py-20` + `pt-20` (nav offset) | `min-h-screen` |
| Features Strip | `py-16` | `border-y border-border/50` |
| About | `py-24` | - |
| Contact | `py-24` | `bg-muted/30`, `border-y border-border/50` |
| Download CTA | `py-32` | Gradient overlay |
| Footer | `py-12` | `border-t border-border/50` |

### Grid Systems

| Section | Grid | Gap |
|---------|------|-----|
| Hero | `grid lg:grid-cols-2` | `gap-12` |
| Features Strip | `grid grid-cols-2 md:grid-cols-4` | `gap-8` |
| About Cards | `grid md:grid-cols-3` | `gap-8` |

### Border Radius

| Usage | Value |
|-------|-------|
| Buttons | `rounded-full` |
| Cards | `rounded-3xl` (2rem) |
| iPhone Frame | `rounded-[3rem]` outer, `rounded-[2.5rem]` inner |
| Logo Container | `rounded-2xl` |
| Feature Icons | `rounded-2xl` |

---

## Component Breakdown

### 1. Navigation (Lines 38-117)

**Behavior:**
- Fixed position (`fixed top-0 left-0 right-0 z-50`)
- Transparent initially, gains blur background on scroll (`bg-background/80 backdrop-blur-xl`)
- Smooth scroll to sections via `scrollToSection()` function

**Desktop Layout (md+):**
```
[Logo + Brand] ─────────────────── [Home] [About] [Contact Us] [Download Button]
```

**Mobile Layout:**
- Hamburger menu toggle (Menu/X icons from Lucide)
- Full-width dropdown with AnimatePresence animation

**Key Classes:**
- Nav wrapper: `transition-all duration-500`
- Scrolled state: `bg-background/80 backdrop-blur-xl border-b border-border/50`
- Active nav link: `text-primary`
- Inactive nav link: `text-muted-foreground hover:text-foreground`
- Download button: `rounded-full px-6 bg-primary hover:bg-sage-dark text-primary-foreground`

### 2. Hero Section (Lines 119-335)

**Structure:**
```
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────┐  ┌─────────────────────────────┐   │
│ │ [Availability Badge]    │  │                             │   │
│ │                         │  │      iPhone Mockup          │   │
│ │ Your sisters            │  │      (HomeScreen)           │   │
│ │ are here                │  │                             │   │
│ │                         │  │  ┌─────────────────────┐    │   │
│ │ Description text...     │  │  │ 9:41    [notch]     │    │   │
│ │                         │  │  │ Header              │    │   │
│ │ [App Store] [Play Store]│  │  │ Tabs                │    │   │
│ └─────────────────────────┘  │  │ Mood Card           │    │   │
│                               │  │ Feed Card           │    │   │
│    [Floating Heart Icon]      │  │ Bottom Nav          │    │   │
│    [Floating Gift Icon]       │  └─────────────────────┘    │   │
│                               └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

Background: Gradient orbs (blurred circles)
- Top-right: `bg-sage-light/30 w-96 h-96 blur-3xl`
- Bottom-left: `bg-blush-light/40 w-80 h-80 blur-3xl`
```

**Availability Badge:**
```tsx
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-border">
  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
  <span>Now available on iOS & Android</span>
</div>
```

**iPhone Mockup (Lines 178-332):**
- Outer frame: `w-[320px] lg:w-[360px] rounded-[3rem] bg-foreground/10 p-3 shadow-2xl border border-foreground/5`
- Inner screen: `rounded-[2.5rem] overflow-hidden bg-background border border-border/30`
- Status bar with time, notch, battery
- Matches actual `HomeScreen` content including:
  - User greeting header
  - Sisterhood tabs
  - 8 mood buttons (4x2 grid)
  - Sister update card
  - Bottom navigation

**Floating Elements:**
- Heart icon: `-top-4 -right-4 w-16 h-16 rounded-2xl bg-blush`
- Gift icon: `-bottom-2 -left-6 w-14 h-14 rounded-2xl bg-sage-light`
- Both have floating animation (`y: [0, -10, 0]` / `y: [0, 10, 0]`)

### 3. Features Strip (Lines 337-362)

**Layout:** 4-column grid, 2 columns on mobile

**Feature Items:**
| Icon | Label | Description |
|------|-------|-------------|
| 🌸 | Cycle Tracking | Know your rhythm |
| 💝 | Send Gifts | Recognise your sisters with small gestures |
| 👯‍♀️ | Sister Circles | Your sisterhood |
| ✨ | Mood Updates | Get support and affirmations from your sisters |

**Card Structure:**
```tsx
<div className="text-center">
  <div className="text-4xl mb-3">{emoji}</div>
  <h3 className="font-display text-lg text-foreground mb-1">{label}</h3>
  <p className="font-body text-sm text-muted-foreground">{desc}</p>
</div>
```

### 4. About Section (Lines 364-421)

**Structure:**
```
[Decorative lavender blur orb on left]

          About Sisterhood (label)
       Built by women, for women (title)
       Description paragraph...

┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 🔒           │ │ 💌           │ │ 🤝           │
│ Private &    │ │ Thoughtful   │ │ Real         │
│ Safe         │ │ Care         │ │ Connection   │
└──────────────┘ └──────────────┘ └──────────────┘
```

**Card Styling:**
```css
p-8 rounded-3xl bg-card border border-border/50 hover:shadow-lg transition-shadow
```

### 5. Contact Section (Lines 423-461)

**Structure:**
```
          Get in Touch (label)
           Contact Us (title)
         Description text...

       hello@sisterhood.app

    Twitter   Instagram   TikTok
```

**Background:** `bg-muted/30 border-y border-border/50`

**Links:**
- Email: `hover:text-primary transition-colors`
- Socials: `text-muted-foreground hover:text-primary`

### 6. Download CTA Section (Lines 463-513)

**Background Effects:**
```css
/* Base gradient */
bg-gradient-to-br from-sage-light/20 via-background to-blush-light/20

/* Large centered blur orb */
absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl centered
```

**Content:**
```
    Join your sisterhood (H2 - largest text on page)
    Description text...

    [App Store Badge]  [Google Play Badge]
```

**Badge Styling:**
- Height: `h-16`
- Hover: `scale: 1.02, y: -2`
- Tap: `scale: 0.98`

### 7. Footer (Lines 515-536)

**Layout:** `flex flex-col md:flex-row items-center justify-between gap-6`

**Structure:**
```
[Logo Icon + Brand]    © 2026 Sisterhood. Made with love.    [Privacy] [Terms]
```

---

## Animations

### Framer Motion Configurations

**File:** `src/pages/LandingPage.tsx`

| Element | Animation | Props |
|---------|-----------|-------|
| Navigation | Slide in from top | `initial={{ y: -100 }} animate={{ y: 0 }}` |
| Hero Text | Fade + slide from left | `initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}` |
| iPhone Mockup | Fade + slide from bottom | `initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}` |
| Floating Icons | Continuous float | `animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}` |
| Feature Cards | Staggered fade in | `whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}` |
| About Cards | Staggered fade in | `whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}` |
| Download CTA | Scale in | `initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}` |
| All CTA buttons | Hover scale | `whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}` |
| Mobile Menu | Expand/collapse | `initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}` |

### CSS Animations

**File:** `src/index.css` (lines 131-176)

| Class | Animation |
|-------|-----------|
| `.animate-pulse` | Tailwind default pulse |
| `.animate-float` | `translateY(0px) → -10px → 0px` (3s loop) |
| `.animate-fade-in` | `opacity: 0 → 1` (0.4s) |

---

## Responsive Behavior

### Breakpoints (Tailwind Defaults)

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Default | < 640px | Single column, mobile nav |
| `sm` | ≥ 640px | Download buttons side-by-side |
| `md` | ≥ 768px | Desktop nav, 4-column features, 3-column about |
| `lg` | ≥ 1024px | 2-column hero grid, larger typography |

### Mobile-Specific Adjustments

| Component | Mobile | Desktop |
|-----------|--------|---------|
| Navigation | Hamburger menu | Inline nav links |
| Hero H1 | `text-5xl` | `text-7xl` |
| iPhone Width | `w-[320px]` | `w-[360px]` |
| Feature Grid | 2 columns | 4 columns |
| About Grid | 1 column | 3 columns |
| Footer | Stacked | Horizontal |

---

## Assets & External Resources

### External Images

| Asset | URL | Usage |
|-------|-----|-------|
| App Store Badge | `https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg` | Hero + Download CTA |
| Google Play Badge | `https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png` | Hero + Download CTA |
| User Avatar | `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face` | iPhone mockup feed card |

### Icons (Lucide React)

| Icon | Import | Usage |
|------|--------|-------|
| `Menu` | `lucide-react` | Mobile nav hamburger |
| `X` | `lucide-react` | Mobile nav close |
| `Heart` | `lucide-react` | Logo, floating element |
| `Users` | `lucide-react` | iPhone mockup tabs |
| `Bell` | `lucide-react` | iPhone mockup header |
| `Gift` | `lucide-react` | Floating element |

### Google Fonts

```html
https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap
```

---

## Code Reference Map

| Section | File | Lines |
|---------|------|-------|
| Imports & Setup | `src/pages/LandingPage.tsx` | 1-27 |
| Font Import (inline) | `src/pages/LandingPage.tsx` | 31-35 |
| Navigation | `src/pages/LandingPage.tsx` | 38-117 |
| Hero Section | `src/pages/LandingPage.tsx` | 119-335 |
| Features Strip | `src/pages/LandingPage.tsx` | 337-362 |
| About Section | `src/pages/LandingPage.tsx` | 364-421 |
| Contact Section | `src/pages/LandingPage.tsx` | 423-461 |
| Download CTA | `src/pages/LandingPage.tsx` | 463-513 |
| Footer | `src/pages/LandingPage.tsx` | 515-536 |
| CSS Variables | `src/index.css` | 8-78 |
| Custom Components | `src/index.css` | 96-129 |
| Animations | `src/index.css` | 131-176 |
| Tailwind Colors | `tailwind.config.ts` | 20-82 |
| Tailwind Fonts | `tailwind.config.ts` | 16-19 |
| Routing | `src/App.tsx` | Route `/` points to `LandingPage` |
| Button Component | `src/components/ui/button.tsx` | Used for CTA buttons |

---

## Implementation Notes

### State Management

```tsx
const [isMenuOpen, setIsMenuOpen] = useState(false);    // Mobile menu toggle
const [activeSection, setActiveSection] = useState("home"); // Active nav highlight
const [scrolled, setScrolled] = useState(false);        // Nav background on scroll
```

### Scroll Detection

```tsx
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### Smooth Scroll Navigation

```tsx
const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  setActiveSection(id);
  setIsMenuOpen(false);
};
```

---

## Quality Checklist

- [ ] All colors use semantic tokens (no hardcoded hex values in components)
- [ ] All text uses `.font-display` or `.font-body` classes
- [ ] All interactive elements have hover/tap animations
- [ ] Mobile navigation works correctly
- [ ] Scroll behavior is smooth
- [ ] All external images load (App Store, Play Store badges)
- [ ] iPhone mockup accurately represents HomeScreen
- [ ] Footer links are accessible
- [ ] Page is fully responsive from 320px to 1920px+
- [ ] Animations are performant (60fps)
- [ ] Background blur effects render correctly

---

*End of Landing Page Product Specification*
