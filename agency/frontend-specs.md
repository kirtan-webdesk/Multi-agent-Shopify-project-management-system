# Frontend Section Specs
# St Josh - Frontend Implementation Specification

Based on the project requirements for the Catholic bookstore and the reference site analysis, I'll implement the 5 priority sections with complete Liquid, CSS, and functionality.

---

## 🗂️ SECTIONS TO BUILD

---

### Section 1: stjosh-hero-banner.liquid

**File:** sections/stjosh-hero-banner.liquid  
**Dawn compatibility:** 2.0+  
**Purpose:** Main hero banner with book-focused messaging and visual hierarchy

#### Schema — Settings
```json
{
  "settings": [
    {
      "type": "image_picker",
      "id": "hero_image",
      "label": "Hero background image",
      "info": "Recommended: 1920x800px"
    },
    {
      "type": "text",
      "id": "hero_title",
      "label": "Hero title",
      "default": "Discover Catholic Wisdom",
      "placeholder": "Enter hero title"
    },
    {
      "type": "textarea",
      "id": "hero_subtitle",
      "label": "Hero subtitle",
      "default": "Explore our collection of Catholic books, gifts, and spiritual resources to deepen your faith journey.",
      "placeholder": "Enter hero subtitle"
    },
    {
      "type": "url",
      "id": "primary_button_url",
      "label": "Primary button link"
    },
    {
      "type": "text",
      "id": "primary_button_text",
      "label": "Primary button text",
      "default": "Shop Books"
    },
    {
      "type": "url",
      "id": "secondary_button_url",
      "label": "Secondary button link"
    },
    {
      "type": "text",
      "id": "secondary_button_text",
      "label": "Secondary button text",
      "default": "Learn More"
    },
    {
      "type": "select",
      "id": "text_alignment",
      "label": "Text alignment",
      "options": [
        {"value": "left", "label": "Left"},
        {"value": "center", "label": "Center"},
        {"value": "right", "label": "Right"}
      ],
      "default": "center"
    },
    {
      "type": "color",
      "id": "overlay_color",
      "label": "Overlay color",
      "default": "#000000"
    },
    {
      "type": "range",
      "id": "overlay_opacity",
      "label": "Overlay opacity",
      "min": 0,
      "max": 100,
      "step": 10,
      "unit": "%",
      "default": 30
    }
  ]
}
```

#### Schema — Blocks
```json
{
  "blocks": [],
  "max_blocks": 0
}
```

#### Liquid Template
```liquid
<section class="stjosh-hero-banner" 
         data-section-id="{{ section.id }}"
         style="--overlay-color: {{ section.settings.overlay_color }}; --overlay-opacity: {{ section.settings.overlay_opacity | divided_by: 100.0 }};">
  
  {%- if section.settings.hero_image -%}
    <div class="stjosh-hero-banner__image">
      {{- section.settings.hero_image | image_url: width: 1920 | image_tag:
          loading: 'eager',
          fetchpriority: 'high',
          widths: '375, 550, 750, 1100, 1500, 1780, 1920',
          sizes: '100vw',
          alt: section.settings.hero_image.alt | default: section.settings.hero_title
      -}}
    </div>
  {%- endif -%}

  <div class="stjosh-hero-banner__overlay"></div>

  <div class="stjosh-hero-banner__content">
    <div class="container">
      <div class="stjosh-hero-banner__text text-{{ section.settings.text_alignment }}">
        
        {%- if section.settings.hero_title != blank -%}
          <h1 class="stjosh-hero-banner__title">
            {{ section.settings.hero_title | escape }}
          </h1>
        {%- endif -%}

        {%- if section.settings.hero_subtitle != blank -%}
          <p class="stjosh-hero-banner__subtitle">
            {{ section.settings.hero_subtitle | escape }}
          </p>
        {%- endif -%}

        {%- if section.settings.primary_button_text != blank or section.settings.secondary_button_text != blank -%}
          <div class="stjosh-hero-banner__buttons">
            {%- if section.settings.primary_button_text != blank -%}
              <a href="{{ section.settings.primary_button_url | default: '#' }}" 
                 class="stjosh-btn stjosh-btn--primary">
                {{ section.settings.primary_button_text | escape }}
              </a>
            {%- endif -%}

            {%- if section.settings.secondary_button_text != blank -%}
              <a href="{{ section.settings.secondary_button_url | default: '#' }}" 
                 class="stjosh-btn stjosh-btn--secondary">
                {{ section.settings.secondary_button_text | escape }}
              </a>
            {%- endif -%}
          </div>
        {%- endif -%}

      </div>
    </div>
  </div>
</section>

{% stylesheet %}
  .stjosh-hero-banner {
    position: relative;
    min-height: 60vh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .stjosh-hero-banner__image {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  .stjosh-hero-banner__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .stjosh-hero-banner__overlay {
    position: absolute;
    inset: 0;
    background-color: var(--overlay-color);
    opacity: var(--overlay-opacity);
    z-index: 2;
  }

  .stjosh-hero-banner__content {
    position: relative;
    z-index: 3;
    width: 100%;
    padding: 4rem 0;
  }

  .stjosh-hero-banner__text {
    max-width: 60rem;
  }

  .stjosh-hero-banner__text.text-center {
    margin: 0 auto;
    text-align: center;
  }

  .stjosh-hero-banner__text.text-right {
    margin-left: auto;
    text-align: right;
  }

  .stjosh-hero-banner__title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.2;
    color: #ffffff;
    margin-bottom: 1.5rem;
    font-family: 'Crimson Text', serif;
  }

  .stjosh-hero-banner__subtitle {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    line-height: 1.6;
    color: #f0f0f0;
    margin-bottom: 2rem;
    font-weight: 400;
  }

  .stjosh-hero-banner__buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .stjosh-hero-banner__text.text-center .stjosh-hero-banner__buttons {
    justify-content: center;
  }

  .stjosh-hero-banner__text.text-right .stjosh-hero-banner__buttons {
    justify-content: flex-end;
  }

  .stjosh-btn {
    display: inline-block;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 0.375rem;
    transition: all 0.3s ease;
    text-align: center;
    min-width: 9rem;
    border: 2px solid transparent;
  }

  .stjosh-btn--primary {
    background-color: #8B4513;
    color: #ffffff;
    border-color: #8B4513;
  }

  .stjosh-btn--primary:hover {
    background-color: #A0522D;
    border-color: #A0522D;
    transform: translateY(-2px);
  }

  .stjosh-btn--secondary {
    background-color: transparent;
    color: #ffffff;
    border-color: #ffffff;
  }

  .stjosh-btn--secondary:hover {
    background-color: #ffffff;
    color: #8B4513;
  }

  @media screen and (max-width: 768px) {
    .stjosh-hero-banner {
      min-height: 50vh;
    }

    .stjosh-hero-banner__content {
      padding: 2rem 0;
    }

    .stjosh-hero-banner__buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .stjosh-hero-banner__text.text-center .stjosh-hero-banner__buttons,
    .stjosh-hero-banner__text.text-right .stjosh-hero-banner__buttons {
      align-items: stretch;
    }
  }
{% endstylesheet %}
```

#### CSS
```css
/* Already included in {% stylesheet %} tag above */
```

#### JavaScript (if needed)
```javascript
/* No JavaScript needed for this section */
```

#### Accessibility checklist
- [x] alt text pattern used - image_tag with proper alt fallback
- [x] focus management - proper button focus states
- [x] keyboard navigation - all interactive elements accessible
- [x] ARIA labels - semantic HTML with proper heading hierarchy
- [x] Touch targets - minimum 44px touch targets on buttons

#### Performance checklist  
- [x] LCP image: fetchpriority='high', loading='eager', responsive widths, sizes
- [x] Below-fold images: N/A (hero is above fold)
- [x] No layout shift: aspect-ratio maintained with object-fit
- [x] Stylesheet: {% stylesheet %} tag used

---

### Section 2: stjosh-featured-collections.liquid

**File:** sections/stjosh-featured-collections.liquid  
**Dawn compatibility:** 2.0+  
**Purpose:** Showcase key book categories with visual grid layout

#### Schema — Settings
```json
{
  "settings": [
    {
      "type": "text",
      "id": "section_title",
      "label": "Section title",
      "default": "Shop by Category"
    },
    {
      "type": "textarea",
      "id": "section_subtitle",
      "label": "Section subtitle",
      "default": "Discover books that nurture your spiritual journey"
    },
    {
      "type": "select",
      "id": "layout",
      "label": "Layout",
      "options": [
        {"value": "grid-2", "label": "2 columns"},
        {"value": "grid-3", "label": "3 columns"},
        {"value": "grid-4", "label": "4 columns"}
      ],
      "default": "grid-3"
    },
    {
      "type": "checkbox",
      "id": "show_collection_description",
      "label": "Show collection descriptions",
      "default": true
    }
  ]
}
```

#### Schema — Blocks
```json
{
  "blocks": [
    {
      "type": "collection",
      "name": "Collection",
      "settings": [
        {
          "type": "collection",
          "id": "collection",
          "label": "Collection"
        },
        {
          "type": "image_picker",
          "id": "custom_image",
          "label": "Custom image",
          "info": "Optional: Override collection featured image"
        },
        {
          "type": "text",
          "id": "custom_title",
          "label": "Custom title",
          "info": "Optional: Override collection title"
        }
      ]
    }
  ],
  "max_blocks": 8
}
```

#### Liquid Template
```liquid
{%- unless section.blocks.size == 0 -%}
<section class="stjosh-featured-collections" data-section-id="{{ section.id }}">
  <div class="container">
    
    {%- if section.settings.section_title != blank or section.settings.section_subtitle != blank -%}
      <div class="stjosh-featured-collections__header">
        {%- if section.settings.section_title != blank -%}
          <h2 class="stjosh-featured-collections__title">
            {{ section.settings.section_title | escape }}
          </h2>
        {%- endif -%}

        {%- if section.settings.section_subtitle != blank -%}
          <p class="stjosh-featured-collections__subtitle">
            {{ section.settings.section_subtitle | escape }}
          </p>
        {%- endif -%}
      </div>
    {%- endif -%}

    <div class="stjosh-featured-collections__grid {{ section.settings.layout }}">
      {%- for block in section.blocks -%}
        {%- liquid
          assign collection = collections[block.settings.collection]
          assign collection_image = block.settings.custom_image | default: collection.featured_image
          assign collection_title = block.settings.custom_title | default: collection.title
          assign collection_url = collection.url | default: '#'
        -%}

        <div class="stjosh-featured-collections__item" {{ block.shopify_attributes }}>
          <a href="{{ collection_url }}" class="stjosh-collection-card">
            
            {%- if collection_image -%}
              <div class="stjosh-collection-card__image">
                {{- collection_image | image_url: width: 600 | image_tag:
                    loading: 'lazy',
                    widths: '300, 400, 500, 600',
                    sizes: '(min-width: 990px) 33vw, (min-width: 750px) 50vw, 100vw',
                    alt: collection_image.alt | default: collection_title
                -}}
              </div>
            {%- endif -%}

            <div class="stjosh-collection-card__content">
              <h3 class="stjosh-collection-card__title">
                {{ collection_title | escape }}
              </h3>

              {%- if section.settings.show_collection_description and collection.description != blank -%}
                <p class="stjosh-collection-card__description">
                  {{ collection.description | strip_html | truncatewords: 20 | escape }}
                </p>
              {%- endif -%}

              {%- if collection.products_count > 0 -%}
                <p class="stjosh-collection-card__count">
                  {{ collection.products_count }} 
                  {%- if collection.products_count == 1 -%}
                    {{ 'products.general.product' | t }}
                  {%- else -%}
                    {{ 'products.general.products' | t }}
                  {%- endif -%}
                </p>
              {%- endif -%}
            </div>

            <div class="stjosh-collection-card__overlay">
              <span class="stjosh-collection-card__cta">
                {{ 'collections.general.shop_now' | t | default: 'Shop Now' }}
              </span>
            </div>
          </a>
        </div>
      {%- endfor -%}
    </div>

  </div>
</section>
{%- endunless -%}

{% stylesheet %}
  .stjosh-featured-collections {
    padding: 4rem 0;
    background-color: #fefefe;
  }

  .stjosh-featured-collections__header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .stjosh-featured-collections__title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #2c2c2c;
    margin-bottom: 1rem;
    font-family: 'Crimson Text', serif;
  }

  .stjosh-featured-collections__subtitle {
    font-size: 1.125rem;
    color: #666666;
    max-width: 40rem;
    margin: 0 auto;
    line-height: 1.6;
  }

  .stjosh-featured-collections__grid {
    display: grid;
    gap: 2rem;
  }

  .stjosh-featured-collections__grid.grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .stjosh-featured-collections__grid.grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .stjosh-featured-collections__grid.grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  .stjosh-collection-card {
    display: block;
    position: relative;
    background-color: #ffffff;
    border-radius: 0.5rem;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    height: 100%;
  }

  .stjosh-collection-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .stjosh-collection-card__image {
    position: relative;
    aspect-ratio: 4/3;
    overflow: hidden;
  }

  .stjosh-collection-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .stjosh-collection-card:hover .stjosh-collection-card__image img {
    transform: scale(1.05);
  }

  .stjosh-collection-card__content {
    padding: 1.5rem;
  }

  .stjosh-collection-card__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c2c2c;
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }

  .stjosh-collection-card__description {
    font-size: 0.875rem;
    color: #666666;
    line-height: 1.5;
    margin-bottom: 0.75rem;
  }

  .stjosh-collection-card__count {
    font-size: 0.75rem;
    color: #8B4513;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .stjosh-collection-card__overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(139, 69, 19, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .stjosh-collection-card:hover .stjosh-collection-card__overlay {
    opacity: 1;
  }

  .stjosh-collection-card__cta {
    color: #ffffff;
    font-size: 1.125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  @media screen and (max-width: 990px) {
    .stjosh-featured-collections__grid.grid-4 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 750px) {
    .stjosh-featured-collections {
      padding: 3rem 0;
    }

    .stjosh-featured-collections__grid.grid-3,
    .stjosh-featured-collections__grid.grid-4 {
      grid-template-columns: repeat(2, 1fr);
    }

    .stjosh-featured-collections__grid {
      gap: 1.5rem;
    }
  }

  @media screen and (max-width: 550px) {
    .stjosh-featured-collections__grid {
      grid-template-columns: 1fr;
    }
  }
{% endstylesheet %}
```

#### CSS
```css
/* Already included in {% stylesheet %} tag above */
```

#### JavaScript (if needed)
```javascript
/* No JavaScript needed for this section */
```

#### Accessibility checklist
- [x] alt text pattern used - proper alt fallback for collection images
- [x] focus management - proper link focus states
- [x] keyboard navigation - all links keyboard accessible
- [x] ARIA labels - semantic heading hierarchy maintained
- [x] Touch targets - adequate card touch targets

#### Performance checklist  
- [x] LCP image: N/A (below fold)
- [x] Below-fold images: loading='lazy' used
- [x] No layout shift: aspect-ratio set on image containers
- [x] Stylesheet: {% stylesheet %} tag used

---

### Section 3: stjosh-product-recommendations.liquid

**File:** sections/stjosh-product-recommendations.liquid  
**Dawn compatibility:** 2.0+  
**Purpose:** Display recommended products with book-focused styling

#### Schema — Settings
```json
{
  "settings": [
    {
      "type": "text",
      "id": "section_title",
      "label": "Section title",
      "default": "Recommended for You"
    },
    {
      "type": "product_list",
      "id": "featured_products",
      "label": "Featured products",
      "limit": 8,
      "info": "Leave empty to show general product recommendations"
    },
    {
      "type": "range",
      "id": "products_per_row_desktop",
      "label": "Products per row (desktop)",
      "min": 3,
      "max": 5,
      "step": 1,
      "default": 4
    },
    {
      "type": "range",
      "id": "products_per_row_mobile",
      "label": "Products per row (mobile)",
      "min": 1,
      "max": 2,
      "step": 1,
      "default": 2
    },
    {
      "type": "checkbox",
      "id": "show_rating",
      "label": "Show product rating",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_vendor",
      "label": "Show product vendor",
      "default": false
    },
    {
      "type": "checkbox",
      "id": "enable_quick_add",
      "label": "Enable quick add to cart",
      "default": true
    }
  ]
}
```

#### Schema — Blocks
```json
{