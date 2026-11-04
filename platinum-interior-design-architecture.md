# Platinum Interior Design — Portfolio Website
## System Architecture & Design Document (v1.1)

> **For the coding agent:** This document is the single source of truth for building the Platinum Interior Design website. Follow it section by section. Where something is marked **[OPEN]**, implement the stated default and leave a `TODO(open):` comment so it can be revisited. Placeholder text in *italics* is draft copy the client can replace.

> **v1.1 changes:** The theme is now **gold & white**, with subtle gold-tinted sections. The primary booking action is now a **"Book Us Now" WhatsApp button**. It opens a chat with the company's WhatsApp account and prefills "Hi Platinum Interior Design, can I get more info on this?". The consultation form is now a secondary "Prefer email?" option.

---

## 1. Project Overview

**Client:** Platinum Interior Design. Tagline: **"Spaces That Inspire"**
**Site type:** Luxury portfolio and business website. The design is image-led and editorial, with a few sub-pages.
**Design inspiration:** Premium furniture/interior brand sites (e.g. Pianca): large calm photography, generous white space, thin serif headings in tracked uppercase, alternating image/text "collection" blocks, and restrained accents.

### 1.1 Goals
1. **Showcase the work.** Make the portfolio of completed spaces the hero of the site.
2. **Feel luxurious and welcoming.** Use bright white space, warm gold, and nothing heavy or dark.
3. **Make booking effortless.** One tap on **Book Us Now** opens WhatsApp with a ready-made message to the company.
4. **Connect social platforms.** Social links, an Instagram feed, and share buttons on projects.
5. **Load fast on mobile** despite heavy imagery.

### 1.2 Non-goals (v1)
- No e-commerce or online payments.
- No client login or project portal.
- No admin CMS panel. Content lives in JSON files plus image folders (see §13 for an optional later upgrade).

---

## 2. Brand & Design Direction

### 2.1 Mood
"Bright luxury." The site should feel like a sunlit, beautifully finished room: crisp white space, warm gold detail and calm photography.
- **White** is the main canvas.
- **Gold** carries the brand. It appears as fine lines, labels, icons and buttons, plus a few **soft gold-tinted sections** (pale champagne washes) that give rhythm down the page.
- Full-strength gold gradient bands are used **at most twice per page**, for the main booking call-to-action band and accents.
- No black sections. Text uses a warm dark brown-charcoal instead of pure black, so the page stays soft.

### 2.2 Colours
| Token | Hex | Usage |
|---|---|---|
| `white` | `#FFFFFF` | Main page background, cards, header |
| `champagne` | `#FBF7F0` | Subtle gold-tinted alternating section background |
| `sand` | `#F4EBDC` | Slightly deeper gold wash (footer, testimonial section, page heroes without images) |
| `gold` | `#C2955A` | Primary brand colour: buttons, icons, lines, borders, hover states |
| `gold-light` | `#E0B878` | Gradient top, highlights, hover glow |
| `gold-deep` | `#A07840` | Gold **text** on white (eyebrows, links), gradient bottom |
| `espresso` | `#2B2520` | Headings and body text (warm, not pure black) |
| `taupe` | `#8A7F72` | Captions, meta text |
| `hairline` | `#E9E0D2` | 1px borders and dividers |

**Gold gradient** (buttons, CTA band, logo wordmark): `linear-gradient(135deg, #E0B878 0%, #C2955A 50%, #A07840 100%)`.

**Subtle gold sheen** (optional, for gold buttons/bands): a very slow diagonal light sweep on hover, about 15% white overlay over 1.2s. Disabled under reduced motion.

### 2.3 Typography
| Role | Font (Google Fonts, self-hosted) | Style |
|---|---|---|
| Display / headings | **Cormorant Garamond** 300/400 | Uppercase, letter-spacing `0.12em`, light weight, colour `espresso` |
| UI, nav, labels, buttons | **Jost** 300/400/500 | Geometric sans that echoes the logo; uppercase labels with `0.25em` tracking |
| Body | **Jost** 300/400 | Sentence case, line-height 1.75, colour `espresso` |

Scale (desktop → mobile):
- H1 hero: `clamp(2.25rem, 5vw, 4.5rem)`, Cormorant 300, uppercase, tracking `0.12em`
- H2 section: `clamp(1.75rem, 3.5vw, 3rem)`, Cormorant 300, uppercase
- Eyebrow: Jost 500, `0.8125rem`, uppercase, tracking `0.3em`, colour `gold-deep`
- Body: Jost 300, `1rem`–`1.0625rem`
- Caption: Jost 400, `0.75rem`, uppercase, tracking `0.2em`, colour `taupe`

### 2.4 Signature visual elements
- **Logo-style divider:** a thin gold line, then a small uppercase label, then a thin gold line (like "— SPACES THAT INSPIRE —"). Use it under section headings and in the footer.
- **Thin gold frame accent:** a 1px gold outline offset 16px behind selected images.
- **Buttons:**
  - *Book Us Now (primary):* gold gradient fill, `espresso` text, WhatsApp icon on the left, square corners, uppercase Jost 500 with `0.2em` tracking. Hover: deeper gradient + sheen. Specified in full in §5.4.
  - *Ghost:* white or transparent fill, 1px gold border, gold-deep text. Hover: champagne fill.
  - *Text link:* uppercase label + thin arrow →, with a gold underline that animates in on hover.
- **Square corners everywhere.** No pill shapes and no heavy shadows. Use hairline gold borders instead; cards may use a very soft warm shadow (`0 10px 30px rgba(160,120,64,0.08)`).
- **Gold corner ornaments** (optional): small L-shaped 1px gold corner marks on featured images and quote blocks.
- **Generous spacing:** section padding `8rem` desktop, `4.5rem` mobile. Max content width `1280px`. Text columns max `560px`.

### 2.5 Logo usage
- The supplied logo is gold on black. The website needs a **gold-on-transparent** version for white backgrounds. Use `gold-deep` → `gold` gradient for the wordmark so it stays legible on white.
- On image heroes (behind the transparent header), use a **white** version of the logo.
- **[OPEN]** Request the vector logo (SVG/AI) so these variants can be exported cleanly.

### 2.6 Motion (subtle, slow, elegant)
- Images fade in with a slight scale settle (`1.04 → 1`, 1.2s ease-out) when they scroll into view.
- Text blocks fade up 12px with a 150ms stagger.
- Gold divider lines "draw" from the centre outwards when they come into view.
- Hero: slow Ken Burns zoom or a crossfading slideshow.
- Hover on portfolio tiles: the image scales `1.03` and a soft white-to-transparent overlay reveals the project name with a gold underline.
- All motion is disabled under `prefers-reduced-motion`.

---

## 3. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Frontend | **React 18 + Vite** | Fast static build, easy hosting |
| Styling | **Tailwind CSS** with the tokens in §2 | Consistent, quick to build |
| Routing | **React Router v6** | Multi-page portfolio |
| Animation | **Framer Motion** (lazy-loaded) or CSS + IntersectionObserver | Smooth, restrained reveals |
| Lightbox / gallery | **yet-another-react-lightbox** | Full-screen project galleries with swipe and zoom |
| Content | JSON in `/src/content` + images in `/public/images` | Editable without a CMS |
| SEO head | `react-helmet-async` | Per-page meta and Open Graph |
| Booking | **WhatsApp click-to-chat** (`wa.me`) | No backend needed; it's the main booking channel |
| Forms backend | **PHP 8 endpoints** (`/api/*.php`) + **MySQL** + **PHPMailer** | Only for the secondary email enquiry form and the newsletter |
| Instagram feed | **Behold.so** (or similar) JSON feed, falling back to a curated static grid | Live feed with no API maintenance |
| Hosting | Static build in `public_html/`, API in `public_html/api/` | One host, SSL from the host |

---

## 4. High-Level Architecture

```
 Visitor ──► Static React site (Vite build, WebP/AVIF images, self-hosted fonts)
               │
               ├── "Book Us Now" ──► https://wa.me/<company number>?text=<prefilled message>
               │                     (opens WhatsApp app on mobile / WhatsApp Web on desktop)
               │
               ├── Content baked in from /src/content/*.json
               │
               ├── Instagram feed ──► Behold JSON (cached 6h, fallback instagram.json)
               │
               └── fetch POST ──► /api (PHP 8)      ← secondary channels only
                                   ├─ enquiry.php    → MySQL + email to studio + auto-reply
                                   └─ newsletter.php → MySQL
```

---

## 5. Information Architecture

### 5.1 Routes
| Path | Page | Purpose |
|---|---|---|
| `/` | Home | Brand impression, featured work, services, social, booking |
| `/portfolio` | Portfolio | All projects, filterable by category |
| `/portfolio/:slug` | Project detail | Story + full gallery of one project |
| `/services` | Services | What the studio offers and the design process |
| `/about` | About | Studio story, philosophy, team |
| `/journal` | Journal / News **[OPEN: optional for v1]** | Latest projects, events, design tips |
| `/journal/:slug` | Journal post | |
| `/contact` | Contact | WhatsApp booking (primary), phone, email form (secondary), map, socials |
| `/privacy` | Privacy notice | Required because the site collects personal data |
| `*` | 404 | "This room is still being designed." with a link home |

### 5.2 Header (white)
- **Desktop layout:**
  - Left: logo (gold wordmark).
  - Centre: `Home · Portfolio · Services · About · Journal · Contact` in uppercase Jost, small, widely tracked, colour `espresso`. Hover and the current page get a gold underline.
  - Right: small gold social icons (Instagram, Facebook, Pinterest), then the **Book Us Now** gold button.
- **On Home:** transparent over the hero with white text and a white logo. After scrolling 80px it becomes a solid white bar with a 1px gold hairline at the bottom and switches to the gold logo (smooth transition).
- **On sub-pages:** solid white from the start.
- **Mobile:** logo + a thin gold hamburger. A compact gold WhatsApp icon button also sits in the header bar, so booking is always one tap away. The menu opens as a full-screen **white** overlay with a champagne bottom panel, large Cormorant links, and a full-width **Book Us Now** button at the bottom, followed by the social icons.

### 5.3 Footer (`sand` background with a gold top border)
- Top: centred gold logo + the logo-style divider with "SPACES THAT INSPIRE".
- Directly under the logo: a large **Book Us Now** button.
- Four columns:
  1. **Studio:** address, phone, email, opening hours.
  2. **Explore:** Portfolio, Services, About, Journal, Contact.
  3. **Follow us:** gold icon + label rows for Instagram, Facebook, Pinterest, TikTok, LinkedIn, Houzz.
  4. **Newsletter:** "Design inspiration, occasionally." with a white email field with a gold border and a gold submit arrow.
- Bottom bar (white strip): `© {year} Platinum Interior Design` · Privacy, in taupe text.

### 5.4 WhatsApp "Book Us Now" — primary booking system

**This is the main conversion action on the whole site.** Every booking or enquiry call-to-action uses it.

**Link format**
```
https://wa.me/<WHATSAPP_NUMBER>?text=<encodeURIComponent(message)>
```
- `WHATSAPP_NUMBER` is digits only in international format with no `+`, spaces or leading zero (e.g. `2637XXXXXXXX`), stored in `site.json`. **[OPEN]** Get the company's WhatsApp number.
- Opens in a new tab with `rel="noopener noreferrer"`. On mobile it opens the WhatsApp app; on desktop it opens WhatsApp Web or the desktop app.

**Prefilled message**
- Base message (exact text): **"Hi Platinum Interior Design, can I get more info on this?"**
- Context is appended automatically so the company knows what the client was looking at:

| Where the button is clicked | Message sent |
|---|---|
| Header, footer, hero, floating button, Home CTA | `Hi Platinum Interior Design, can I get more info on this?` |
| Project detail page | `Hi Platinum Interior Design, can I get more info on this?` + `\n\nProject: {project.title}\n{page URL}` |
| Service block / Services page | `…can I get more info on this?` + `\n\nService: {service.title}` |
| Portfolio category | `…can I get more info on this?` + `\n\nCategory: {category.title}` |

- Build all links with one helper so the message stays consistent:
```js
// src/lib/whatsapp.js
import site from '../content/site.json';
export const BASE_MSG = 'Hi Platinum Interior Design, can I get more info on this?';
export function whatsappLink(context) {
  const lines = [BASE_MSG];
  if (context?.label && context?.value) lines.push('', `${context.label}: ${context.value}`);
  if (context?.url) lines.push(context.url);
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
}
```
- Component: `<BookNowButton context={…} variant="solid|ghost|icon|floating" size="sm|md|lg" />`.

**Placements**
1. Header (desktop button; mobile icon).
2. Hero (main button).
3. Floating button on every page:
   - Bottom-right, gold gradient. Square with the WhatsApp icon on mobile; on desktop it expands to an icon + "Book Us Now" pill-free tab.
   - A subtle gold pulse ring every 6s (stops after 3 pulses, disabled under reduced motion).
   - It appears after the first scroll and hides when the footer's Book Us Now button is in view, to avoid duplicates.
4. After each Featured Spaces block and each service block (ghost variant with context).
5. Project detail: in the title block, and in a sticky bar on mobile at the bottom of the screen ("Love this space? **Book Us Now**").
6. Gold CTA band (§6.10).
7. Contact page (largest variant).
8. Footer.

**Tracking (optional)**
- Fire an analytics event `book_whatsapp_click` with `{ placement, context }`, using GA4 or Plausible if added (**[OPEN]**). No personal data is sent.

**Fallback**
- If `site.whatsapp` is empty, render the button as a link to `/contact` and log a console warning in development.

---

## 6. Home Page — Section Specs (top → bottom)

Backgrounds follow this **white / champagne** rhythm with one gold band:

| Section | Background |
|---|---|
| 6.1 Hero | Image |
| 6.2 Intro | White |
| 6.3 Featured Spaces | Champagne |
| 6.4 Selected Projects | White |
| 6.5 Services | Champagne |
| 6.6 Process | White |
| 6.7 Testimonials | Sand |
| 6.8 Social | White |
| 6.9 Journal | Champagne |
| 6.10 CTA | Gold gradient band |
| Footer | Sand |

### 6.1 Hero (`<Hero />`)
- Full-viewport (`100svh`) image or crossfading slideshow (3–4 bright, airy rooms), with a soft warm gradient at the bottom and a light top fade so the white header text stays readable.
- Centred content in white text:
  - Eyebrow: **PLATINUM INTERIOR DESIGN** (gold-light)
  - H1: **Spaces That Inspire**
  - A thin gold divider line.
  - Sub-line: *Bespoke interiors for homes and businesses, designed around the way you live.*
  - Buttons: **Book Us Now** (gold, WhatsApp) · **View Our Work** (ghost, white border → `/portfolio`)
- Bottom centre: a "SCROLL" label above a thin animated gold line.
- Slideshow: 6s per slide, 1.5s crossfade, paused on hover and on focus, with small gold line indicators.
- The first image is LCP-critical: preload it, use `fetchpriority="high"` and set explicit dimensions.

### 6.2 Introduction (`<Intro />`), white
- Two columns:
  - Left: eyebrow **WELCOME**, H2 **Designed With Intention**, two short paragraphs, and a text link **Discover Our Story →**.
  - Right: one tall image with the offset gold frame accent.
- Below it: **3 stats** in large gold-gradient Cormorant numerals with small labels, separated by thin vertical gold lines. **[OPEN]** These need real numbers; hide the row if none are provided.

### 6.3 Featured Spaces (`<FeaturedSpaces />`), champagne
- **Block A, Residential:**
  - A large image on the left. On the right: eyebrow **RESIDENTIAL**, H2 **Living Spaces**, text, a text link **Explore Residential →**, and a ghost **Book Us Now** with context `Category: Residential`.
  - Below it: a row of 3 images with captions (Living Rooms, Bedrooms, Kitchens & Dining), each linking to the filtered portfolio.
- **Block B, Commercial (mirrored):** eyebrow **COMMERCIAL**, H2 **Workspaces & Hospitality**, then 3 images (Offices, Restaurants & Lounges, Retail & Showrooms).
- Images sit on white cards with a thin gold border.

### 6.4 Selected Projects (`<SelectedProjects />`), white
- H2 **Selected Projects**, followed by the gold logo-style divider.
- An asymmetric editorial grid of 5–6 featured projects:
  - Desktop: 12-column grid with mixed tile sizes.
  - Mobile: a single column.
- Hover/focus: a white gradient rises from the bottom and shows the project name, location · year, and "VIEW PROJECT →" in gold-deep.
- Below the grid, centred: **View Full Portfolio** (ghost).

### 6.5 Services Preview (`<ServicesPreview />`), champagne
- H2 **What We Do**.
- 4 white cards with a thin gold top border (3px), a gold line icon, a title, one line of text and a small "Enquire →" WhatsApp link with service context:
  1. **Interior Design**
  2. **Space Planning**
  3. **Furniture & Décor Sourcing**
  4. **Renovation & Styling**
- **[OPEN]** Confirm the real service list.

### 6.6 Our Process (`<Process />`), white
- A horizontal timeline (vertical on mobile) of 5 steps joined by a thin gold line:
  1. **Say Hello on WhatsApp**
  2. Consultation
  3. Concept & Mood Board
  4. Design & Installation
  5. The Reveal
- Each step has a large gold Cormorant numeral (01–05), a title and one sentence. Step 1 includes a small WhatsApp link.

### 6.7 Testimonials (`<Testimonials />`), sand
- Large gold quote marks and gold corner ornaments.
- A slider of client quotes in Cormorant italic (espresso), with the name and project type in a gold-deep caption, and gold line indicators.
- **Real testimonials only:** use real client quotes, with the client's permission. Hide this section when `testimonials.json` is empty.

### 6.8 Social / Instagram (`<SocialFeed />`), white
- Eyebrow **FOLLOW OUR WORK** and H2 **@platinuminteriordesign** **[OPEN: confirm handle]**.
- A 6-image square grid. Each image has a thin gold border on hover, a soft white overlay and a gold Instagram icon, and links to the post.
- Below the grid: a row of square social buttons with a white fill, thin gold border and gold icons. Hover fills them gold with white icons.
- Data: a Behold JSON feed, falling back to `instagram.json`. Lazy-loaded with champagne skeletons while loading.

### 6.9 Journal Preview (`<JournalPreview />`), champagne **[OPEN: optional v1]**
- Heading + text on the left, 2 white article cards on the right. Hidden when empty.

### 6.10 Booking CTA Band (`<CtaBand />`), gold gradient
- Full-width gold gradient band (the one bold gold moment on the page) with a faint large logo monogram watermark.
- H2 in espresso: **Let's Create Your Space**.
- Sub-line: *Tap below to chat with us on WhatsApp. We usually reply within the hour during business hours.* **[OPEN: confirm response time]**
- Button: a large **white** "Book Us Now" button with gold-deep text and a WhatsApp icon (it inverts against the gold band). Below it, a small text link: "Prefer email? Send an enquiry →" (to `/contact#enquiry`).

---

## 7. Sub-Page Specs

**Common page hero:** 50vh image with a white H1 and breadcrumb, or a sand background with a gold-deep H1 when no image is available.

### 7.1 Portfolio (`/portfolio`)
- Filter bar: uppercase tabs `All · Residential · Commercial · Hospitality · Renovation`, with a gold underline on the active tab. The filter state is synced to the URL (`?category=`).
- Masonry grid (3 cols desktop, 2 tablet, 1 mobile). Show 9 projects, then a **Load More** ghost button.

### 7.2 Project detail (`/portfolio/:slug`)
- Cover image, then the title block: name, meta row (Location · Year · Category · Size) and a **Book Us Now** button with project context.
- Story layout: intro + "The Brief / Our Approach".
- Optional **Before & After** slider with a gold handle.
- Editorial gallery that opens in the lightbox.
- Share row with gold icons: Facebook, Pinterest, WhatsApp share, Copy link (with a toast).
- Prev / Next project, then a related projects row, then the gold CTA band.
- **Mobile sticky bottom bar** (white, gold top border): "Love this space?" + a **Book Us Now** button with project context.

### 7.3 Services (`/services`)
- Alternating white/champagne image-text blocks, one per service. Each has a "What's included" list with gold bullet lines and a **Book Us Now** button with service context.
- Process timeline, FAQ accordion (gold +/− icons), then the CTA band.

### 7.4 About (`/about`)
- Story, then a philosophy quote (large Cormorant italic on champagne), then values, then the team grid (portraits with a thin gold frame), then the CTA band.

### 7.5 Contact (`/contact`)
- **Top: primary booking card.** A large centred champagne card with a gold border:
  - H2 **Book Us Now**.
  - "The quickest way to reach us is WhatsApp."
  - A large gold **Chat on WhatsApp** button.
  - The WhatsApp number displayed underneath.
- **Below, in two columns:**
  - **Left, `id="enquiry"`: "Prefer email?"** A short enquiry form on white with hairline gold borders and floating labels (§8.3).
  - **Right:** studio details (address, phone `tel:`, email `mailto:`, hours), social icons, and a Google Map that loads only after the user clicks "Show map".
- Form success state: "Thank you, we'll be in touch soon," plus a link to continue on WhatsApp.

---

## 8. Data & Content Model

### 8.1 Content files (`/src/content`)
```jsonc
// site.json
{
  "name": "Platinum Interior Design",
  "tagline": "Spaces That Inspire",
  "whatsapp": "2637XXXXXXXX",            // digits only, intl format — TODO(open)
  "whatsappDisplay": "+263 7X XXX XXXX", // shown on the page — TODO(open)
  "whatsappMessage": "Hi Platinum Interior Design, can I get more info on this?",
  "whatsappReplyNote": "We usually reply within the hour during business hours.",
  "phone": "+263 00 000 0000",
  "email": "hello@platinuminteriors.co.zw",
  "address": "…, Harare, Zimbabwe",
  "hours": "Mon–Fri 08:00–17:00 · Sat by appointment",
  "socials": { "instagram": "", "facebook": "", "pinterest": "", "tiktok": "", "linkedin": "", "houzz": "" },
  "stats": [ { "value": 10, "suffix": "+", "label": "Years of experience" } ]
}

// categories.json
[{ "slug": "residential", "title": "Living Spaces", "eyebrow": "Residential",
   "description": "…", "cover": "/images/categories/residential.webp",
   "subcategories": [{ "label": "Living Rooms", "image": "…" }] }]

// projects.json
[{
  "slug": "borrowdale-family-residence",
  "title": "Borrowdale Family Residence",
  "category": "residential",
  "location": "Harare", "year": 2026, "size": "420 m²", "featured": true,
  "cover": "/images/projects/borrowdale/cover.webp",
  "intro": "…", "brief": "…", "approach": "…",
  "gallery": [ { "src": "…", "alt": "…", "layout": "full|half|third" } ],
  "beforeAfter": { "before": "…", "after": "…" }
}]

// services.json, testimonials.json, team.json, journal.json, faq.json, instagram.json
```

**Image conventions:** `/public/images/<section>/<slug>/<name>-{480,960,1600,2400}.webp`, plus AVIF versions. Generate them with `scripts/optimize-images.mjs` (`sharp`) from originals in `/raw-images` (git-ignored). Every image entry needs meaningful `alt` text.

**Photography note:** choose bright, warm-toned photos. They suit the white-and-gold theme far better than dark, moody shots.

### 8.2 Database (MySQL), secondary channels only
```sql
CREATE TABLE enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(40),
  project_type ENUM('Residential','Commercial','Hospitality','Renovation','Other') DEFAULT 'Other',
  message TEXT NOT NULL,
  consent TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip VARCHAR(45)
);

CREATE TABLE subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip VARCHAR(45)
);

CREATE TABLE rate_limits (
  ip VARCHAR(45) NOT NULL,
  endpoint VARCHAR(40) NOT NULL,
  hits INT NOT NULL DEFAULT 1,
  window_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ip, endpoint)
);
```

### 8.3 API contracts
All endpoints use `POST` with `Content-Type: application/json` and return JSON.

| Endpoint | Body | Success | Errors |
|---|---|---|---|
| `/api/enquiry.php` | `{ name, email, phone?, project_type?, message, consent, website? }` | `200 { ok:true }`. Emails the studio and sends a short branded auto-reply that includes the WhatsApp link. | `422 { ok:false, errors }`, `429`, `500` |
| `/api/newsletter.php` | `{ email, website? }` | `200 { ok:true }`, also for duplicate emails (don't reveal whether an email is already subscribed) | `422`, `429` |

- `website` is a hidden **honeypot** field. If it is filled in, return `200` and discard the submission.
- `consent` must be `true`.
- **Email templates:** white body, gold logo header, a gold divider line, espresso text, and a gold "Chat with us on WhatsApp" button.

---

## 9. Frontend Structure

```
platinum-interior-design/
├─ public/
│  ├─ images/…, logo/ (logo-gold.svg, logo-white.svg, mark-gold.svg)
│  ├─ favicon.svg, apple-touch-icon.png, og-default.jpg, robots.txt, sitemap.xml
├─ src/
│  ├─ main.jsx, App.jsx
│  ├─ content/ *.json
│  ├─ components/
│  │  ├─ layout/ Header.jsx, MobileMenu.jsx, Footer.jsx, FloatingBookNow.jsx,
│  │  │         MobileStickyBookBar.jsx, BackToTop.jsx, PageHero.jsx
│  │  ├─ ui/ BookNowButton.jsx, Button.jsx, TextLink.jsx, Eyebrow.jsx, SectionHeading.jsx,
│  │  │     LogoDivider.jsx, GoldCorners.jsx, FramedImage.jsx, ResponsiveImage.jsx,
│  │  │     Reveal.jsx, Toast.jsx, Accordion.jsx, Skeleton.jsx
│  │  ├─ home/ Hero, Intro, Stats, FeaturedSpaces, SelectedProjects, ServicesPreview,
│  │  │       Process, Testimonials, SocialFeed, JournalPreview, CtaBand
│  │  ├─ portfolio/ FilterBar, ProjectGrid, ProjectTile, Gallery, BeforeAfter, ShareRow, ProjectNav
│  │  └─ forms/ EnquiryForm.jsx, NewsletterForm.jsx, FloatingField.jsx
│  ├─ pages/ Home, Portfolio, ProjectDetail, Services, About, Journal, JournalPost, Contact, Privacy, NotFound
│  ├─ lib/ whatsapp.js, api.js, validators.js, instagram.js, seo.js, analytics.js, useScrolled.js
│  └─ styles/ index.css
├─ api/ config.example.php, bootstrap.php, db.php, mailer.php, templates/, enquiry.php, newsletter.php, .htaccess
├─ scripts/ optimize-images.mjs, generate-sitemap.mjs
├─ database/schema.sql
├─ tailwind.config.js
└─ README.md
```

### 9.1 Tailwind theme extension
```js
theme: { extend: {
  colors: {
    champagne: '#FBF7F0', sand: '#F4EBDC',
    gold: { DEFAULT: '#C2955A', light: '#E0B878', deep: '#A07840' },
    espresso: '#2B2520', taupe: '#8A7F72', hairline: '#E9E0D2'
  },
  fontFamily: {
    display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
    sans: ['Jost', 'system-ui', 'sans-serif']
  },
  letterSpacing: { luxe: '0.12em', label: '0.25em', wide3: '0.3em' },
  maxWidth: { content: '1280px', prose: '560px' },
  backgroundImage: {
    'gold-gradient': 'linear-gradient(135deg,#E0B878 0%,#C2955A 50%,#A07840 100%)'
  },
  boxShadow: { soft: '0 10px 30px rgba(160,120,64,0.08)' }
}}
```

---

## 10. Social Integration (summary)
| Feature | Where | Implementation |
|---|---|---|
| **WhatsApp booking** | Header, hero, floating button, section CTAs, project pages, CTA band, contact page, footer | `wa.me` link with the prefilled "can I get more info on this?" message plus page context (§5.4) |
| Social profile links | Header, mobile menu, footer, contact page, social section | From `site.json`; links with an empty URL are hidden; new tab |
| Instagram feed | Home §6.8 | Behold JSON, falling back to static JSON; cached 6h |
| Share project | Project detail | Facebook, Pinterest, WhatsApp share, copy link; Web Share API on mobile |
| Rich link previews | Every page | Open Graph + Twitter tags; project cover as `og:image` (1200×630) |

---

## 11. Non-Functional Requirements

### 11.1 Performance
- Targets: Lighthouse mobile Performance ≥ 90, LCP < 2.5s, CLS < 0.05.
- AVIF/WebP via `<picture>`, responsive `srcset`/`sizes`, and lazy loading below the fold. Each image fades in from a blurred placeholder.
- Self-hosted woff2 fonts (only the weights in use), with Cormorant 300 and Jost 400 preloaded.
- Code-split routes. Lazy-load the lightbox, animation library, map and Instagram feed.
- Gzipped JS budget: < 180 KB on initial load.

### 11.2 Accessibility (WCAG 2.1 AA): important with a gold & white theme
- **Gold contrast rules:**
  - `gold #C2955A` on white is about 2.6:1, so it **fails** for text. Use it only for lines, borders, icons and decoration.
  - Gold text on white must use `gold-deep #A07840` (about 3.6:1). Use it for large text and bold labels of 14px+ only. Anything smaller uses `espresso`.
  - Text **on** gold buttons and bands must be `espresso` (passes AA), never white.
- White text over images always gets a gradient overlay so it reaches at least 4.5:1.
- WhatsApp buttons get an accessible name: `aria-label="Book us now on WhatsApp (opens in new tab)"`.
- Visible focus rings (2px gold-deep outline, 3px offset). Sliders and the lightbox are keyboard operable and have pause controls.
- Form labels, `aria-live` error messages and `aria-describedby` on fields.

### 11.3 SEO
- Unique title and description per page, with local keywords (e.g. "interior designer in Harare").
- JSON-LD `LocalBusiness`/`InteriorDesigner` including `telephone`, `sameAs` socials, and a `ContactPoint` that lists WhatsApp. Use `CreativeWork` on projects.
- Generated sitemap, `robots.txt` and canonical URLs.

### 11.4 Security & privacy
- PDO prepared statements, server-side validation, honeypot and per-IP rate limiting.
- CORS restricted to the site's own origin. Forced HTTPS and security headers.
- Keep `config.php` out of the web root.
- The privacy notice should mention that WhatsApp chats are handled by WhatsApp/Meta under their own terms.

---

## 12. Build & Deployment
1. `npm install`, then `npm run images`, then `npm run dev`.
2. `npm run build` writes the output to `dist/` (including the sitemap).
3. Upload `dist/*` to `public_html/` and `api/` to `public_html/api/`.
4. Root `.htaccess` handles the HTTPS redirect, the SPA fallback (excluding `/api`) and long cache headers for assets.
5. Create the MySQL database, run `database/schema.sql`, and fill in `api/config.php`.
6. **Test WhatsApp booking** on Android, iPhone and desktop:
   - Check the message arrives exactly as "Hi Platinum Interior Design, can I get more info on this?".
   - Check the context lines appear on project and service pages.
   - Check it reaches the correct company number.
7. Test the enquiry form, newsletter, social links, share buttons and Open Graph previews.
8. Submit the sitemap to Google Search Console. Add the website link to the WhatsApp Business profile, the Google Business Profile and all social bios.

Environment variables: `VITE_API_BASE=/api`, `VITE_INSTAGRAM_FEED_URL=`, `VITE_SITE_URL=`.

**Recommendation for the client:** use **WhatsApp Business** on the company number. Set up a greeting message, quick replies (prices, availability, portfolio link) and an away message for after-hours enquiries, since this is now the main booking channel.

---

## 13. Future Enhancements (not v1)
- Headless CMS (Sanity or Decap) so the client can add projects themselves.
- WhatsApp Business API with a catalogue or an automated first reply.
- Online consultation calendar.
- 3D / 360° virtual tours.
- "Discover your style" quiz that ends in a WhatsApp booking.

---

## 14. Acceptance Criteria (definition of done)
- [ ] Gold & white theme as in §2: white canvas, champagne/sand gold-tinted sections, one gold gradient CTA band, gold lines and icons, espresso text, square corners. It should feel bright, luxurious and welcoming.
- [ ] **Book Us Now** opens WhatsApp to the company number with the message "Hi Platinum Interior Design, can I get more info on this?", plus project/service/category context where relevant, from every placement in §5.4.
- [ ] The floating Book Us Now button and the mobile sticky bar on project pages work and don't overlap the footer button.
- [ ] The home page has every section in §6, in order, with the background rhythm in §6.
- [ ] Portfolio filtering is synced to the URL. Project pages have the gallery lightbox, optional before/after, share buttons, prev/next and related projects.
- [ ] Social links, the Instagram feed (with fallback) and Open Graph previews work.
- [ ] The secondary enquiry form and newsletter save to MySQL. The honeypot, rate limit and consent check work.
- [ ] All gold text meets the contrast rules in §11.2.
- [ ] Fully responsive at 360, 768, 1024, 1440 and 1920px.
- [ ] Lighthouse mobile scores: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- [ ] README explains how to add a project and how to change the WhatsApp number/message in `site.json`.

---

## 15. Open Questions (implement defaults, flag with `TODO(open):`)
1. **Company WhatsApp number** (main booking channel). Is it a WhatsApp Business account?
2. Typical WhatsApp response time to promise on the site.
3. Other contact details: phone, email, studio address, opening hours, domain.
4. Social handles and URLs. Which platforms are actually active?
5. Vector logo files, to create gold-on-white and white versions.
6. The real service list and project categories.
7. Project photos and details for at least 6 projects (3 featured). Do before/after photos exist?
8. Real stats and real client testimonials, shared with their clients' permission. Hide these sections if unavailable.
9. Include the Journal in v1?
10. Add analytics (GA4 / Plausible) to count WhatsApp booking clicks?
