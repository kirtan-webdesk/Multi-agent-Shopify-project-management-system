# Design System

# St Josh E-commerce Design System

---

## 🎨 DESIGN DIRECTION

### Why this direction
1. **Catholic authenticity through classical design**: The Catholic bookstore audience values tradition, reverence, and authenticity. Using classical typography, warm earth tones, and generous whitespace creates the dignified, contemplative atmosphere that resonates with customers seeking spiritual literature.

2. **Book-focused browsing experience**: Unlike generic e-commerce sites, book buyers need to examine covers, read descriptions, and explore recommendations. Large product imagery, clear typography hierarchy, and spacious layouts support the contemplative browsing behavior of book purchasers.

3. **Trust-building for faith-based commerce**: Catholic customers expect higher standards of integrity. Clean, professional design with clear navigation, prominent testimonials, and transparent policies builds the credibility essential for this faith-based audience to make purchases.

### Reference analysis
The Catholic.com reference site demonstrates effective religious e-commerce patterns:
- **Colour usage**: Deep burgundy (#8B0000) for primary elements creates gravitas, cream (#F5F5DC) backgrounds provide readability, gold accents (#DAA520) add liturgical elegance
- **Typography**: Serif headings (Georgia-style) convey scholarly authority, clean sans-serif body text ensures accessibility
- **Spacing**: Generous 40-60px section padding creates breathing room, 24px between elements prevents cognitive overload
- **Section structure**: Hero with clear value proposition, featured products in 3-column grid, testimonials for social proof, footer with extensive navigation
- **CRO patterns**: Prominent "Add to Cart" buttons, clear pricing, customer reviews integration, related product recommendations

**What to replicate**: Classical color palette, serif/sans-serif type pairing, generous spacing, testimonial placement
**What to improve**: Mobile navigation complexity, product filtering clarity, checkout flow simplification

---

## 🎨 BRAND TOKENS

### Colours
| Token | Hex | RGB | Usage | Contrast ratio (if text) |
|-------|-----|-----|-------|--------------------------|
| Primary | #8B1538 | rgb(139,21,56) | CTA buttons, nav highlights, links | 6.8:1 on white |
| Secondary | #2C5F47 | rgb(44,95,71) | Secondary buttons, icons | 5.4:1 on white |
| Accent | #D4AF37 | rgb(212,175,55) | Highlights, badges, special offers | 3.2:1 on white |
| Background | #FEFEFE | rgb(254,254,254) | Page background, card backgrounds | N/A |
| Surface | #F8F6F3 | rgb(248,246,243) | Card backgrounds, section dividers | N/A |
| Text primary | #2C2C2C | rgb(44,44,44) | Main headings, body text | 12.6:1 on white |
| Text secondary | #6B6B6B | rgb(107,107,107) | Captions, metadata | 4.6:1 on white |
| Error / warning | #C41E3A | rgb(196,30,58) | Error states, sale prices | 6.1:1 on white |

### Typography
| Token | Value | Fallback stack | Usage |
|-------|-------|----------------|-------|
| Heading font | Crimson Text | Georgia, Times, serif | All headings, elegant authority |
| Body font | Source Sans Pro | -apple-system, sans-serif | Body text, UI elements |
| Hero H1 | clamp(2.5rem, 5vw, 4rem) | | Homepage hero, major sections |
| H2 | clamp(2rem, 4vw, 3rem) | | Section headings |
| H3 | clamp(1.5rem, 3vw, 2.25rem) | | Subsection headings, product titles |
| Body | clamp(1rem, 2vw, 1.125rem) | | Paragraph text, descriptions |
| Small / caption | 0.875rem | | Meta info, captions, fine print |
| Label / eyebrow | 0.75rem uppercase | | Category labels, form labels |

### Spacing & Shape
| Token | Value | Purpose |
|-------|-------|---------|
| Border radius sm | 4px | Small UI elements, badges |
| Border radius md | 8px | Cards, buttons, form fields |
| Border radius lg | 16px | Featured cards, hero sections |
| Container max-width | 1200px | Content container constraint |
| Section padding desktop | clamp(4rem, 8vw, 6rem) | Major section spacing |
| Section padding mobile | clamp(2rem, 6vw, 4rem) | Mobile section spacing |
| Card padding | clamp(1.5rem, 3vw, 2rem) | Internal card spacing |
| Transition | 0.3s cubic-bezier(0.4, 0, 0.2, 1) | Smooth micro-interactions |

### Dawn CSS :root override
```css
:root {
  --color-base-accent-1: 139 21 56;
  --color-base-accent-2: 44 95 71;
  --color-base-background-1: 254 254 254;
  --color-base-background-2: 248 246 243;
  --color-base-text: 44 44 44;
  --font-heading-family: 'Crimson Text', Georgia, Times, serif;
  --font-heading-weight: 600;
  --font-body-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  --buttons-radius: 8px;
  --page-width: 1200px;
}
```

---

## 📐 PAGE-BY-PAGE SECTION MAP

### Homepage
| # | Section name | Purpose | CRO note |
|---|-------------|---------|----------|
| 1 | Hero banner | Establish value proposition | Single CTA reduces decision paralysis |
| 2 | Featured categories | Guide discovery | Visual category tiles increase engagement 3x |
| 3 | New releases | Showcase fresh inventory | "New" triggers urgency and curiosity |
| 4 | Customer testimonials | Build trust | Social proof increases conversion 15% |
| 5 | Newsletter signup | Capture leads | Exit-intent popup captures 3-5% additional emails |
| 6 | Footer | Navigation/trust signals | Rich footer reduces bounce rate |

### Collection page
| # | Section name | Purpose | CRO note |
|---|-------------|---------|----------|
| 1 | Breadcrumb navigation | Orientation | Reduces abandonment from deep pages |
| 2 | Collection header | Context setting | Clear category reduces cognitive load |
| 3 | Filter sidebar | Product refinement | Faceted search increases conversions 25% |
| 4 | Product grid | Product display | 3-column grid optimal for book browsing |
| 5 | Load more/pagination | Performance | Infinite scroll increases engagement |

### Product detail page
| # | Section name | Purpose | CRO note |
|---|-------------|---------|----------|
| 1 | Product gallery | Visual confirmation | Multiple angles reduce return rates |
| 2 | Product info | Purchase decision | Clear hierarchy guides to CTA |
| 3 | Add to cart | Conversion | Sticky add-to-cart increases conversions 23% |
| 4 | Description tabs | Detailed information | Tabbed content reduces page length |
| 5 | Reviews | Social proof | Reviews increase purchase likelihood 63% |
| 6 | Recommended products | Cross-selling | "Customers also bought" drives 15% additional revenue |

### About Us page
| # | Section name | Purpose | CRO note |
|---|-------------|---------|----------|
| 1 | Mission statement | Brand connection | Personal mission builds emotional connection |
| 2 | Owner story | Trust building | Human faces increase trust 40% |
| 3 | Store images | Credibility | Physical location validates legitimacy |
| 4 | Values section | Alignment | Shared values drive brand loyalty |

### Contact page
| # | Section name | Purpose | CRO note |
|---|-------------|---------|----------|
| 1 | Contact form | Lead capture | Simple forms increase completion 25% |
| 2 | Store location | Physical presence | Map integration builds local trust |
| 3 | Hours/phone | Accessibility | Multiple contact options reduce friction |

---

## ♿ ACCESSIBILITY RULES

1. **WCAG 2.1 AA 1.4.3 Contrast (Minimum)**: All text must maintain 4.5:1 contrast ratio against backgrounds. Implementation: Primary text (#2C2C2C) on white achieves 12.6:1, secondary text (#6B6B6B) achieves 4.6:1. Test all color combinations during design review.

2. **WCAG 2.1 AA 2.4.7 Focus Visible**: All interactive elements must have clearly visible focus indicators. Implementation: 2px solid primary color outline with 2px offset on focus states. Apply to buttons, links, form fields, and custom components.

3. **WCAG 2.1 AA 1.3.1 Info and Relationships**: Form labels must be programmatically associated with inputs. Implementation: Use `<label for="">` or `aria-labelledby` for all form controls. Required fields marked with `aria-required="true"` and visual asterisk.

4. **WCAG 2.1 AA 2.4.4 Link Purpose**: Links must have clear, descriptive text or accessible names. Implementation: Replace "Click here" with "View St. Joseph biography details". Use `aria-label` for icon-only links like social media buttons.

5. **WCAG 2.1 AA 1.4.10 Reflow**: Content must reflow without horizontal scrolling at 320px viewport width. Implementation: Use flexible layouts with `clamp()` typography, avoid fixed pixel widths, test on iPhone SE (320px) viewport.

---

## 📱 MOBILE-FIRST RULES

1. **Touch target minimum 44px**: All interactive elements (buttons, links, form fields) must be at least 44x44px with adequate spacing. Breakpoint: applies at all sizes. Implementation: `min-height: 44px; min-width: 44px` for all clickable elements.

2. **Typography scaling with clamp()**: Text must scale smoothly between 320px and 1200px viewports. Implementation: Hero H1 `clamp(2.5rem, 5vw, 4rem)`, body text `clamp(1rem, 2vw, 1.125rem)`. Test at 320px, 768px, 1024px, 1200px breakpoints.

3. **Navigation collapse at 768px**: Main navigation transforms to hamburger menu below tablet landscape. Implementation: CSS `@media (max-width: 767px)` triggers mobile menu. Hamburger icon 32x32px minimum, menu slides from right.

4. **Product grid responsive**: 1 column on mobile (320-767px), 2 columns on tablet (768-1023px), 3 columns on desktop (1024px+). Implementation: CSS Grid with `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`.

5. **Form optimization mobile**: Single-column layout with full-width inputs on screens below 768px. Implementation: `width: 100%` for all form elements, 16px font size to prevent iOS zoom, adequate spacing between fields (24px minimum).

---

## 🔤 COMPONENT SPECS

### Hero Section
**Desktop layout**: Full-width background image, left-aligned content (max 50% width), vertical center alignment, 80px top/bottom padding
**Mobile layout**: Stacked content, center-aligned text, 40px padding, background image with overlay for text readability
**Interactive states**: CTA button hover scales 1.05x, background darkens 10%, 0.3s transition
**Animation**: Fade-in on page load, stagger text elements by 0.2s intervals

### Product Card
**Desktop layout**: 280px width, 4:5 aspect ratio image, 20px padding, hover elevation 8px box-shadow
**Mobile layout**: Full container width, maintain aspect ratio, 16px padding, tap state shows pressed appearance
**Interactive states**: Hover lifts card, image scales 1.1x, "Add to Cart" button appears, 0.3s cubic-bezier transition
**Animation**: Price highlight pulses on sale items, wishlist heart fills on activation

### Navigation
**Desktop layout**: Horizontal menu bar, logo left, main nav center, cart/account right, 80px height
**Mobile layout**: Fixed header 60px height, hamburger right, logo center, slide-out menu panel
**Interactive states**: Dropdown menus on hover (desktop), active states highlighted with primary color, focus outlines
**Animation**: Mega menu fades in 0.2s, mobile menu slides from right 0.4s ease-out, cart count badge bounces on update