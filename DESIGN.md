---
name: Premium Kids EdTech
colors:
  surface: '#fff8f6'
  surface-dim: '#ebd6cf'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ec'
  surface-container: '#ffe9e3'
  surface-container-high: '#fae4dd'
  surface-container-highest: '#f4ded7'
  on-surface: '#241915'
  on-surface-variant: '#57423b'
  inverse-surface: '#3a2e29'
  inverse-on-surface: '#ffede8'
  outline: '#8b7169'
  outline-variant: '#dec0b6'
  surface-tint: '#a43c12'
  primary: '#a43c12'
  on-primary: '#ffffff'
  primary-container: '#ff7f50'
  on-primary-container: '#6c2000'
  inverse-primary: '#ffb59c'
  secondary: '#4e6073'
  on-secondary: '#ffffff'
  secondary-container: '#cfe2f9'
  on-secondary-container: '#526478'
  tertiary: '#006970'
  on-tertiary: '#ffffff'
  tertiary-container: '#00b5c0'
  on-tertiary-container: '#004145'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59c'
  on-primary-fixed: '#380c00'
  on-primary-fixed-variant: '#822800'
  secondary-fixed: '#d1e4fb'
  secondary-fixed-dim: '#b5c8df'
  on-secondary-fixed: '#091d2e'
  on-secondary-fixed-variant: '#36485b'
  tertiary-fixed: '#7af4ff'
  tertiary-fixed-dim: '#4dd9e4'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f54'
  background: '#fff8f6'
  on-background: '#241915'
  surface-variant: '#f4ded7'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is built for a premium educational environment that balances parental trust with child-friendly engagement. The brand personality is **nurturing, professional, and sophisticated**, moving away from the chaotic "toy-store" aesthetic of traditional kids' apps toward a refined, modern SaaS experience.

The visual style is **Soft Minimalism**. It utilizes generous white space, a restricted but cheerful palette, and tactile depth to create a focused learning atmosphere. The goal is to evoke a sense of calm discovery, ensuring the interface never competes with the educational content itself.

## Colors

The color strategy uses a high-contrast primary for action and a sophisticated neutral foundation for focus.

- **Primary (Coral/Orange):** Reserved exclusively for call-to-action elements, progress markers, and interactive "wins." It provides the necessary energy against the calm background.
- **Text (Dark Navy/Charcoal):** Used for all instructional content to ensure maximum readability and a professional, "published" feel.
- **Backgrounds:** A crisp white (#FFFFFF) is used for cards and interactive surfaces, while an off-white/light-grey (#FAFAFA) is used for page backgrounds to reduce eye strain.
- **Pastel Accents:** These are used as functional backgrounds for specific content categories or "subject zones." They should remain at low saturation to prevent visual fatigue.

## Typography

The typography system prioritizes clarity and a friendly, geometric structure. 

- **Headlines:** Montserrat is used for its open, circular forms which feel approachable yet authoritative. High-level headers use a bold weight to establish clear information hierarchy.
- **Body & Labels:** Inter is utilized for its exceptional legibility at all sizes. We maintain a slightly larger base font size (18px for primary body text) to accommodate younger readers and provide a comfortable reading experience for parents.
- **Hierarchy:** Use tight leading for displays and generous leading (1.6) for body text to keep the layout feeling airy and "premium."

## Layout & Spacing

This design system employs a **Fixed Grid** on desktop and a **Fluid Fluid** on mobile, built on an 8px base unit.

- **Desktop:** A 12-column grid with a maximum container width of 1200px. Large 64px outer margins create a "letterbox" effect that feels intentional and high-end.
- **Mobile:** A 4-column grid with 20px side margins.
- **Vertical Spacing:** Use generous padding within cards (minimum 32px) to ensure content never feels cramped. Sections should be separated by large vertical gaps (80px–120px) to clearly define different learning modules.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Ambient Shadows**.

- **Surfaces:** The base layer is the off-white background. The secondary layer consists of pure white cards.
- **Shadows:** Use extremely soft, diffused shadows with a large blur radius and low opacity (e.g., `box-shadow: 0 10px 30px rgba(44, 62, 80, 0.05)`). This creates a sense of "lifting" off the page without the harshness of traditional drop shadows.
- **Depth:** Interactive elements should appear to "sink" slightly on click (active state) to provide tactile feedback, mimicking a physical button press.

## Shapes

The shape language is defined by **Exaggerated Rounding**.

- **Cards & Containers:** Use `rounded-2xl` (1.5rem / 24px) or `rounded-3xl` (2rem / 32px) for primary containers. This removes all visual "sharpness," making the product feel safe and friendly.
- **Buttons:** Buttons use a fully rounded (pill) shape to maximize their clickability and friendly appearance.
- **Inputs:** Input fields should use `rounded-lg` (1rem / 16px) to maintain consistency with the overall soft-cornered theme.

## Components

- **Primary Buttons:** High-contrast Coral background with White text. Bold, pill-shaped, and slightly larger than standard SaaS buttons to facilitate easy tapping for children.
- **Educational Cards:** Pure white backgrounds, 2xl rounded corners, and a very soft ambient shadow. Use accent-colored headers (Mint, Sky, etc.) to categorize content.
- **Progress Indicators:** Use the Primary Coral color for active progress. Track bars should have rounded ends and a soft beige background.
- **Interactive Chips:** Used for filtering topics. Use light grey backgrounds that transition to the Primary color when selected.
- **Inputs:** Clean, white backgrounds with a subtle 1px border in a light navy tint. On focus, the border should thicken and change to the Primary color or a soft Sky Blue.
- **Feedback Toasts:** Use the pastel accent colors (Mint for success, Soft Yellow for warnings) to keep system messages gentle and non-alarming.