# Project Plan: St Josh

# 📋 PROJECT OVERVIEW

**Client:** St Josh Catholic Bookstore  
**Store:** wds46.myshopify.com  
**Project Objective:** Build a complete Catholic e-commerce bookstore with inventory synchronization capabilities and modern browsing features within 4 weeks.  
**Platform:** Shopify Plus + Dawn theme (Dev theme ID: 144680353910)  
**Success Metrics:**
- Homepage load speed < 3 seconds on mobile
- Conversion rate baseline established with analytics tracking
- 100% responsive design across all device breakpoints

**Go-live Date:** Week 4 completion

---

# 🎯 MILESTONES

### Milestone M1: Foundation & Architecture
**Duration:** Week 1
**Goal:** Establish project foundation with sandbox environment and content architecture
**Deliverables:**
- WebDesk sandbox environment fully configured
- Dawn theme installed on dev theme ID 144680353910
- Information architecture document with navigation structure
- Content creation for 6 core pages (Return Policy, About Us, Terms, FAQ, Privacy, Contact)
- Store configuration (payment/shipping setup)
**Client dependencies:** Store access credentials and content approval by end of Week 1
**Acceptance criteria:**
1. Sandbox accessible at staging URL with Dawn theme active
2. All 6 content pages drafted and client-approved
3. Store settings configured for Catholic bookstore branding

### Milestone M2: Core Page Design & Navigation
**Duration:** Week 2
**Goal:** Implement homepage, category pages, and mega menu navigation system
**Deliverables:**
- Homepage design matching Catholic.com reference aesthetic
- Category page with product grid layout
- Mega menu navigation system
- Mobile-responsive navigation
**Client dependencies:** Homepage content and category structure approval by start of Week 2
**Acceptance criteria:**
1. Homepage loads with book-focused branding and Catholic aesthetic
2. Mega menu displays properly across all device sizes
3. Category pages display product grids with proper pagination

### Milestone M3: Product Experience & Custom Features
**Duration:** Week 3
**Goal:** Complete product pages and implement advanced browsing features
**Deliverables:**
- Product page with description tabs functionality
- About Us page implementation
- Welcome popup system
- Faceted filtering system
- "Recommended to you" product recommendations
- System page styling (cart, checkout, account)
**Client dependencies:** Product data and imagery provided by start of Week 3
**Acceptance criteria:**
1. Product pages display with tabbed descriptions and recommendations
2. Faceted filters work on collection pages
3. Welcome popup appears on first visit with dismissal functionality

### Milestone M4: SEO & Performance Optimization
**Duration:** Week 3-4 overlap
**Goal:** Optimize site for search engines and performance
**Deliverables:**
- On-page SEO implementation across all pages
- Technical SEO audit and fixes
- Schema markup for products and organization
- Performance optimization
**Client dependencies:** SEO keywords and business information provided
**Acceptance criteria:**
1. All pages have proper meta tags and structured data
2. Site passes Core Web Vitals benchmarks
3. Google Search Console configured and verified

### Milestone M5: Quality Assurance & Testing
**Duration:** Week 4
**Goal:** Comprehensive testing across all devices and browsers
**Deliverables:**
- Cross-browser testing report
- Mobile responsiveness verification
- Functionality testing checklist completion
- Bug fixes and optimizations
**Client dependencies:** Client UAT feedback within 48 hours of staging review
**Acceptance criteria:**
1. Site functions identically across Chrome, Safari, Firefox, Edge
2. All interactive elements work on touch devices
3. Zero critical bugs in final QA report

### Milestone M6: Go-Live & Integration
**Duration:** Week 4
**Goal:** Launch live site with third-party integrations active
**Deliverables:**
- Live site migration from sandbox
- Google Shopping Feed integration
- Facebook Shopping Feed integration
- Payment and shipping gateway activation
- Post-launch QA verification
**Client dependencies:** Live store access and third-party account credentials
**Acceptance criteria:**
1. Live site matches sandbox functionality exactly
2. All payment methods process test transactions
3. Shopping feeds successfully sync product catalog

---

# 🏃 SPRINT BREAKDOWN

### Sprint S1.1: Sandbox Setup & Theme Installation
**Owner:** Backend
**Duration:** 2 days
**Branch:** feature/sandbox-setup
**Tasks:**
- [ ] Clone live store to WebDesk sandbox environment
- [ ] Install Dawn theme on dev theme ID 144680353910
- [ ] Configure basic store settings and branding
- [ ] Set up GitHub repository connection
**Definition of done:**
- [ ] Sandbox URL accessible and functional
- [ ] Dawn theme active with St Josh branding
**Handoff to:** Sprint S1.2

### Sprint S1.2: Information Architecture & Content
**Owner:** Frontend
**Duration:** 3 days
**Branch:** feature/content-architecture
**Tasks:**
- [ ] Create navigation structure document
- [ ] Draft content for templates/page.about-us.liquid
- [ ] Draft content for templates/page.returns.liquid
- [ ] Draft content for templates/page.privacy.liquid
- [ ] Draft content for templates/page.terms.liquid
- [ ] Draft content for templates/page.faq.liquid
- [ ] Draft content for templates/page.contact.liquid
**Definition of done:**
- [ ] All 6 pages created with placeholder content
- [ ] Navigation structure approved by client
**Handoff to:** Milestone M1 review

### Sprint S2.1: Homepage Implementation
**Owner:** Frontend
**Duration:** 3 days
**Branch:** feature/homepage-design
**Tasks:**
- [ ] Customize templates/index.liquid with Catholic bookstore aesthetic
- [ ] Implement hero section with book imagery
- [ ] Add featured products section
- [ ] Style sections/featured-collection.liquid
- [ ] Add testimonials or featured categories section
**Definition of done:**
- [ ] Homepage matches Catholic.com reference styling
- [ ] All sections responsive across device breakpoints
**Handoff to:** Sprint S2.2

### Sprint S2.2: Category Pages & Mega Menu
**Owner:** Frontend
**Duration:** 3 days
**Branch:** feature/navigation-collections
**Tasks:**
- [ ] Customize templates/collection.liquid for book categories
- [ ] Implement mega menu in sections/header.liquid
- [ ] Style collection grid layouts
- [ ] Add collection page pagination
- [ ] Configure collection sorting options
**Definition of done:**
- [ ] Mega menu displays all book categories
- [ ] Collection pages load with proper product grids
**Handoff to:** Milestone M2 review

### Sprint S3.1: Product Page & Features
**Owner:** Frontend
**Duration:** 3 days
**Branch:** feature/product-experience
**Tasks:**
- [ ] Customize templates/product.liquid with description tabs
- [ ] Implement sections/product-recommendations.liquid
- [ ] Style product image gallery
- [ ] Add product review display area
- [ ] Configure variant selection interface
**Definition of done:**
- [ ] Product pages display with tabbed descriptions
- [ ] Recommendations appear below product details
**Handoff to:** Sprint S3.2

### Sprint S3.2: Custom Features Implementation
**Owner:** Both
**Duration:** 4 days
**Branch:** feature/advanced-functionality
**Tasks:**
- [ ] Create welcome popup in sections/popup-modal.liquid
- [ ] Implement faceted filtering using Shopify's filter system
- [ ] Style filter sidebar components
- [ ] Add sort dropdown functionality
- [ ] Configure popup display logic and dismissal
**Definition of done:**
- [ ] Welcome popup appears on first visit only
- [ ] Filters work on all collection pages
**Handoff to:** Sprint S4.1

### Sprint S4.1: SEO & Performance
**Owner:** Backend
**Duration:** 3 days
**Branch:** feature/seo-optimization
**Tasks:**
- [ ] Add schema markup to layout/theme.liquid
- [ ] Optimize templates/product.liquid meta tags
- [ ] Configure sitemap.xml generation
- [ ] Compress and optimize image assets
- [ ] Audit and fix Core Web Vitals issues
**Definition of done:**
- [ ] All pages have proper structured data
- [ ] Site scores 90+ on Lighthouse performance
**Handoff to:** Sprint S4.2

### Sprint S4.2: Quality Assurance
**Owner:** Both
**Duration:** 3 days
**Branch:** feature/qa-testing
**Tasks:**
- [ ] Cross-browser testing on Chrome, Safari, Firefox, Edge
- [ ] Mobile responsiveness testing on iOS/Android
- [ ] Form submission testing
- [ ] Cart and checkout flow testing
- [ ] Performance testing across device types
**Definition of done:**
- [ ] Zero critical bugs identified
- [ ] All functionality works across target browsers
**Handoff to:** Sprint S4.3

### Sprint S4.3: Go-Live Preparation
**Owner:** Backend
**Duration:** 2 days
**Branch:** feature/production-deploy
**Tasks:**
- [ ] Configure Google Shopping Feed app
- [ ] Configure Facebook Shopping Feed app
- [ ] Set up payment gateway integration
- [ ] Configure shipping rate calculations
- [ ] Prepare production deployment checklist
**Definition of done:**
- [ ] All third-party integrations configured
- [ ] Payment processing tested successfully
**Handoff to:** Go-live process

---

# ⚠️ RISK REGISTER

| # | Risk | Probability | Impact | Mitigation | Owner |
|---|------|-------------|--------|------------|-------|
| 1 | Client content approval delays extend timeline | High | High | Build content approval checkpoints into each milestone, provide template examples | PM |
| 2 | Dawn theme limitations require custom liquid development | Medium | Medium | Conduct theme capability audit in Sprint S1.1, identify custom dev needs early | Frontend |
| 3 | Third-party app integrations fail during go-live | Medium | High | Test all integrations in sandbox, have backup manual processes ready | Backend |
| 4 | Shopify Plus API rate limits during data migration | Low | Medium | Implement exponential backoff, schedule migration during off-peak hours | Backend |
| 5 | Catholic bookstore product data structure incompatible with Shopify | Medium | High | Audit product data structure in Week 1, create migration plan early | PM |

---

# 📅 WEEK-BY-WEEK TIMELINE

| Week | Milestone | Sprints | Client action required |
|------|-----------|---------|----------------------|
| 1 | M1: Foundation | S1.1, S1.2 | Provide store access, approve content drafts |
| 2 | M2: Core Pages | S2.1, S2.2 | Approve homepage design, provide category structure |
| 3 | M3: Product Features | S3.1, S3.2 | Provide product data, approve custom features |
| 4 | M4-M6: Launch | S4.1, S4.2, S4.3 | UAT feedback, provide third-party credentials |

---

# 🚫 OUT OF SCOPE

1. Inventory synchronization system between physical store and online (requires custom POS integration)
2. Customer account creation and management beyond Shopify's standard features
3. Multi-language or multi-currency support
4. Advanced subscription or membership functionality
5. Custom checkout modifications or one-page checkout
6. Integration with existing physical store POS system
7. Custom CRM or email marketing platform integration beyond basic Shopify
8. Advanced reporting or analytics dashboard beyond Shopify's native analytics
9. Bulk product import from external systems (client must provide products in Shopify-compatible format)
10. Custom apps development or Shopify app creation

---

# 🔄 CHANGE MANAGEMENT

**Scope Change Process:**
1. Client requests must be submitted via email to project manager
2. WebDesk team provides impact assessment within 24 hours
3. Estimate includes time impact and additional cost
4. Client approval required in writing before implementation
5. Timeline adjustments communicated to all stakeholders

**Change Request SLA:** 24-hour response for estimate, 48-hour implementation timeline adjustment

**Approval Authority:** Client project stakeholder and WebDesk PM must both approve changes

---

# 📞 COMMUNICATION PLAN

**Weekly Standups:** Every Tuesday and Friday at 10 AM EST via Zoom
- Sprint progress review
- Blocker identification and resolution
- Next sprint planning

**Staging Reviews:** End of each milestone
- Client reviews staging environment
- Feedback collection and prioritization
- Sign-off required before next milestone

**Sign-off Process:**
1. WebDesk presents completed milestone on staging
2. Client has 48 hours to provide feedback
3. WebDesk addresses feedback within 24 hours
4. Client provides written approval to proceed
5. Milestone marked complete, next milestone initiated

**Emergency Contact:** PM available via email/phone for critical issues during business hours (9 AM - 6 PM EST)