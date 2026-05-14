# Backend Plan
# 🏪 ST JOSH - SHOPIFY PLUS INTEGRATION SPECS

**Store:** wds46.myshopify.com  
**Theme:** Dawn  
**Timeline:** 4 weeks  
**Integrations:** Third-party apps (Searchanise, Swym Relay, Yotpo, Google Shopping Feed, Facebook Shopping Feed)

---

## 🗃️ METAFIELD DEFINITIONS

| Namespace | Key | Type | Owner | Purpose | Required? | UI label |
|-----------|-----|------|-------|---------|-----------|---------|
| custom | welcome_popup_enabled | boolean | shop | Control welcome popup display | No | Enable Welcome Popup |
| custom | welcome_popup_content | rich_text_field | shop | Welcome popup content | No | Welcome Popup Content |
| custom | welcome_popup_delay | number_integer | shop | Popup delay in seconds | No | Popup Delay (seconds) |
| custom | mega_menu_enabled | boolean | shop | Enable mega menu | No | Enable Mega Menu |
| custom | product_tabs | json | product | Product description tabs data | No | Product Tabs |
| custom | recommended_products | list.product_reference | product | Manual product recommendations | No | Recommended Products |
| custom | seo_title | single_line_text_field | product | Custom SEO title | No | SEO Title |
| custom | seo_description | multi_line_text_field | product | Custom SEO description | No | SEO Description |
| custom | featured_collection | collection_reference | shop | Homepage featured collection | No | Featured Collection |
| custom | hero_banner_image | file_reference | shop | Homepage hero banner | No | Hero Banner Image |
| custom | hero_banner_text | rich_text_field | shop | Homepage hero banner text | No | Hero Banner Text |

**Shopify CLI commands:**
```bash
shopify metafield-definition create --store wds46 --namespace custom --key welcome_popup_enabled --type boolean --owner-type shop --name "Enable Welcome Popup"
shopify metafield-definition create --store wds46 --namespace custom --key welcome_popup_content --type rich_text_field --owner-type shop --name "Welcome Popup Content"
shopify metafield-definition create --store wds46 --namespace custom --key welcome_popup_delay --type number_integer --owner-type shop --name "Popup Delay (seconds)"
shopify metafield-definition create --store wds46 --namespace custom --key mega_menu_enabled --type boolean --owner-type shop --name "Enable Mega Menu"
shopify metafield-definition create --store wds46 --namespace custom --key product_tabs --type json --owner-type product --name "Product Tabs"
shopify metafield-definition create --store wds46 --namespace custom --key recommended_products --type list.product_reference --owner-type product --name "Recommended Products"
shopify metafield-definition create --store wds46 --namespace custom --key seo_title --type single_line_text_field --owner-type product --name "SEO Title"
shopify metafield-definition create --store wds46 --namespace custom --key seo_description --type multi_line_text_field --owner-type product --name "SEO Description"
shopify metafield-definition create --store wds46 --namespace custom --key featured_collection --type collection_reference --owner-type shop --name "Featured Collection"
shopify metafield-definition create --store wds46 --namespace custom --key hero_banner_image --type file_reference --owner-type shop --name "Hero Banner Image"
shopify metafield-definition create --store wds46 --namespace custom --key hero_banner_text --type rich_text_field --owner-type shop --name "Hero Banner Text"
```

---

## 🔔 WEBHOOKS

| Topic | Why needed | Handler action | Idempotency check |
|-------|------------|----------------|-------------------|
| customers/data_request | GDPR compliance | Export customer data to JSON | Check request ID uniqueness |
| customers/redact | GDPR compliance | Anonymize customer PII | Check customer ID + timestamp |
| shop/redact | GDPR compliance | Delete all shop data | Check shop domain + request ID |
| orders/create | Inventory sync with physical store | Update inventory counts | Check order ID existence |
| orders/updated | Order status tracking | Sync order status changes | Compare order updated_at timestamp |
| products/create | SEO automation | Generate meta tags from product data | Check product ID existence |
| products/update | SEO automation | Update meta tags when product changes | Compare product updated_at timestamp |
| app/uninstalled | Cleanup | Remove webhooks and app data | Check app installation status |

---

## 🔗 INTEGRATION SPECS

### Searchanise Search & Filter

**Connection method:** Shopify app install  
**Install URL:** https://apps.shopify.com/searchanise  
**Config steps:**
1. Install Searchanise app from Shopify App Store
2. Complete initial indexing (may take 30-60 minutes)
3. Configure faceted filters for: Price, Author, Category, Availability, Reviews
4. Set up smart search with typo tolerance
5. Configure search results layout to match theme
6. Enable instant search suggestions

**Shopify API calls needed:**
| Method | Endpoint | Why |
|--------|----------|-----|
| GET | /admin/api/2023-10/products.json | Initial product indexing |
| GET | /admin/api/2023-10/collections.json | Collection structure for filters |
| GET | /admin/api/2023-10/metafields.json | Product attributes for filtering |

**Theme integration:**
- File: sections/collection-template.liquid, templates/search.liquid
- Location: Replace default search and collection rendering
- Code pattern: 
```liquid
{% comment %} Searchanise integration {% endcomment %}
<div id="snize-search-results-gridview" data-snize-search-results="true"></div>
<script src="https://w.snize.com/js/se_widget.min.js"></script>
```

**Events tracked:**
- search_performed → Analytics tracking
- filter_applied → User behavior analysis
- product_clicked_from_search → Conversion tracking

**Testing checklist:**
- [ ] Search returns relevant results for "Catholic books"
- [ ] Filters work: Price range, Author, Category
- [ ] Mobile responsive search interface
- [ ] Search analytics appear in Searchanise dashboard

---

### Swym Relay Wishlist

**Connection method:** Shopify app install  
**Install URL:** https://apps.shopify.com/swym-relay  
**Config steps:**
1. Install Swym Relay from App Store
2. Configure wishlist button design to match theme
3. Set up email notifications for back-in-stock
4. Configure wishlist sharing options
5. Set up abandoned wishlist email campaigns

**Shopify API calls needed:**
| Method | Endpoint | Why |
|--------|----------|-----|
| GET | /admin/api/2023-10/customers.json | Customer wishlist association |
| POST | /admin/api/2023-10/customers/{id}/metafields.json | Store wishlist data |

**Theme integration:**
- File: sections/product-form.liquid, templates/product.liquid
- Location: Near add-to-cart button
- Code pattern:
```liquid
<div class="swym-wishlist-button-bar" 
     data-product-id="{{ product.id }}" 
     data-variant-id="{{ product.selected_or_first_available_variant.id }}">
</div>
<script src="https://dl.swym.it/core/js/swym-shopify.min.js"></script>
```

**Events tracked:**
- wishlist_add → Product popularity metrics
- wishlist_remove → User engagement
- wishlist_share → Social engagement

**Testing checklist:**
- [ ] Wishlist button appears on all product pages
- [ ] Guest users can create wishlists with email
- [ ] Logged-in users see persistent wishlists
- [ ] Email notifications work for back-in-stock items

---

### Yotpo Reviews & Ratings

**Connection method:** Shopify app install  
**Install URL:** https://www.yotpo.com/integrations/shopify/  
**Config steps:**
1. Install Yotpo app and complete onboarding
2. Import existing order data for review requests
3. Configure review request email timing (7 days post-delivery)
4. Set up review display widgets for product pages
5. Configure star ratings for collection pages
6. Set up review syndication to Google Shopping

**Shopify API calls needed:**
| Method | Endpoint | Why |
|--------|----------|-----|
| GET | /admin/api/2023-10/orders.json | Historical orders for review requests |
| GET | /admin/api/2023-10/products.json | Product data for review widgets |

**Theme integration:**
- File: sections/product-reviews.liquid, templates/product.liquid
- Location: Below product description tabs
- Code pattern:
```liquid
<div class="yotpo yotpo-main-widget" 
     data-product-id="{{ product.id }}" 
     data-price="{{ product.price | money_without_currency }}"
     data-currency="{{ shop.currency }}">
</div>
<script src="//staticw2.yotpo.com/{{ shop.id }}/widget.js"></script>
```

**Events tracked:**
- review_submitted → Content generation
- review_helpful_voted → Review quality
- review_displayed → Widget performance

**Testing checklist:**
- [ ] Review widgets load on product pages
- [ ] Star ratings display in collection grids
- [ ] Review request emails send properly
- [ ] Reviews sync to Google Shopping feed

---

### Google Shopping Feed

**Connection method:** Shopify app install  
**Install URL:** https://apps.shopify.com/google-shopping-feed  
**Config steps:**
1. Install Google Shopping Feed app
2. Connect Google Merchant Center account
3. Map product attributes (GTIN, Brand, Category)
4. Configure automatic feed updates
5. Set up conversion tracking with Google Analytics
6. Configure feed for Google Ads campaigns

**Shopify API calls needed:**
| Method | Endpoint | Why |
|--------|----------|-----|
| GET | /admin/api/2023-10/products.json | Product data for feed |
| GET | /admin/api/2023-10/inventory_levels.json | Stock levels for feed |

**Theme integration:**
- File: theme.liquid (head section)
- Location: Before closing </head> tag
- Code pattern:
```liquid
<!-- Google Shopping conversion tracking -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-CONVERSION_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-CONVERSION_ID');
</script>
```

**Events tracked:**
- product_feed_updated → Feed health monitoring
- google_ads_click → Campaign performance
- shopping_conversion → ROI tracking

**Testing checklist:**
- [ ] Products appear in Google Merchant Center
- [ ] Feed updates automatically every 24 hours
- [ ] Conversion tracking fires on checkout
- [ ] Product data includes required attributes

---

### Facebook Shopping Feed

**Connection method:** Shopify app install  
**Install URL:** https://apps.shopify.com/facebook-marketplace-connector  
**Config steps:**
1. Install Facebook Shopping Feed app
2. Connect Facebook Business Manager account
3. Link to Facebook Shop and Instagram Shopping
4. Configure product catalog sync
5. Set up Facebook Pixel for tracking
6. Configure dynamic product ads

**Shopify API calls needed:**
| Method | Endpoint | Why |
|--------|----------|-----|
| GET | /admin/api/2023-10/products.json | Product catalog sync |
| GET | /admin/api/2023-10/collections.json | Collection-based ad sets |

**Theme integration:**
- File: theme.liquid (head section)
- Location: After Google Analytics, before closing </head>
- Code pattern:
```liquid
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'PIXEL_ID');
fbq('track', 'PageView');
</script>
```

**Events tracked:**
- facebook_shop_sync → Catalog health
- instagram_product_tag → Social commerce
- facebook_conversion → Ad performance

**Testing checklist:**
- [ ] Products sync to Facebook Shop
- [ ] Instagram Shopping tags work
- [ ] Facebook Pixel fires correctly
- [ ] Dynamic product ads populate

---

## 🔒 SECURITY REQUIREMENTS

- **Admin API token:** Stored in environment variables, encrypted at rest, rotated every 90 days
- **Storefront API token:** Read-only access to products/collections, safe for theme JS
- **Minimum required API scopes:** 
  - read_products, write_products
  - read_orders, write_orders  
  - read_customers, write_customers
  - read_content, write_content
  - read_inventory, write_inventory
- **Rate limiting strategy:** Exponential backoff starting at 1s, max 32s, with jitter
- **GDPR handlers:**
  - customers/data_request: Export all customer data to JSON format
  - customers/redact: Anonymize PII, keep order history for accounting
  - shop/redact: Complete data deletion when store closes
- **Secret rotation plan:** Quarterly rotation with 48-hour overlap period

---

## 🧪 INTEGRATION TESTING PLAN

### Searchanise Testing
1. **Manual test:** Search for "Catholic books" - should return relevant results
2. **Expected outcome:** Results display with proper styling, filters available
3. **Verify in admin:** Searchanise app dashboard shows search analytics

### Swym Relay Testing  
1. **Manual test:** Click wishlist button on product page as guest user
2. **Expected outcome:** Email prompt appears, wishlist saves after email provided
3. **Verify in admin:** Swym dashboard shows wishlist events

### Yotpo Testing
1. **Manual test:** Submit a product review through widget
2. **Expected outcome:** Review appears after moderation, star rating updates
3. **Verify in admin:** Yotpo dashboard shows review metrics

### Google Shopping Testing
1. **Manual test:** Check Google Merchant Center for product listings
2. **Expected outcome:** All products appear with correct data
3. **Verify in admin:** Feed status shows "Active" with no errors

### Facebook Shopping Testing  
1. **Manual test:** Visit Facebook Shop page, check product catalog
2. **Expected outcome:** Products display with current pricing/availability
3. **Verify in admin:** Facebook Business Manager shows active catalog

### GDPR Testing
1. **Manual test:** Submit data deletion request via webhook
2. **Expected outcome:** Customer data anonymized within 30 days
3. **Verify in admin:** Customer record shows anonymized data

All integrations must pass testing on the sandbox (wds46.myshopify.com) before production deployment.