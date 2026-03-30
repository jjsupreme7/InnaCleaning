# PRD — InnaCleaning

## Overview
**Repo:** github.com/jjsupreme7/InnaCleaning
**Client:** Family friend — sole proprietor running a residential cleaning business
**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Vercel

## What It Is
A marketing website for a solo cleaning business. The site helps the owner look professional, show her services, let customers estimate pricing, and book cleanings. Simple, clean, effective.

## What's Built

### Pages & Sections
- **Homepage** — Hero banner, intro ("About Inna"), services preview, testimonials, service area map, CTA banner
- **Services** — 4 service types: Standard Cleaning, Deep Cleaning, Move-In/Move-Out, Airbnb/Short-Term Rental
- **Quote Estimator** — Multi-step interactive calculator:
  - Step 1: Home size (Studio → 4+ bed, $80–$220 base)
  - Step 2: Cleaning type (multipliers: 1x–1.75x)
  - Step 3: Condition (light/medium/heavy)
  - Step 4: Add-ons (fridge $20, oven $25, windows $30, laundry $15, pet hair $20)
  - Step 5: Frequency (one-time, weekly 10% off, bi-weekly 5% off, monthly)
  - Real-time price summary with breakdown
- **Booking form** — Contact/booking submission
- **FAQ** — Expandable Q&A section
- **Gallery** — Before/after cleaning photos
- **About** — About Inna page
- **Contact** — Contact page
- **Reviews** — Customer testimonial cards

### Components
- Sticky "Book Now" button (mobile)
- Mobile hamburger menu
- Footer with contact info
- Reusable UI components (Button, Container, SectionHeading)

### Architecture
- Pure frontend — no database, no backend API routes
- All data is static (services, pricing in TypeScript files)
- Deployed on Vercel

## Priority #1: UI/Design Overhaul

The current design looks like a developer scaffold — not a finished site for a real business. It needs a complete visual refresh:

### Problems
- Generic slate-800/sky-600 color scheme with no personality
- Hero section is just a CSS gradient with decorative squares — no real imagery
- Emoji as service icons (✨🧹📦🏠) instead of proper icons
- Sharp rectangles everywhere — cold and corporate for a warm personal business
- Single bland font ("Assistant") with limited weight variation
- No real photos anywhere
- Overall feels like a template, not a custom site

### Design Direction
- **Color palette:** Warm, fresh, trustworthy. Think soft greens, warm whites, light teals — colors that say "clean" and "welcoming." NOT corporate blue/slate.
- **Typography:** A friendlier heading font paired with a clean body font. Consider Inter, DM Sans, or similar warm sans-serifs. Add a serif or display font for headings if it fits.
- **Icons:** Replace all emoji with Lucide React icons (already available as a peer dep in Next.js ecosystem) or Heroicons. Clean, consistent line icons.
- **Border radius:** Add rounded corners throughout — cards, buttons, images. Soften the entire feel.
- **Hero section:** Use a high-quality stock photo of a clean, bright home interior. Overlay text on the image. Make it aspirational.
- **Service cards:** Redesign with subtle shadows, hover effects, proper icon containers, better spacing.
- **Testimonials:** Add avatar placeholders, star ratings, card-style layout.
- **Overall spacing:** More generous padding and margins. Let the design breathe.
- **Animations:** Subtle fade-ins and slide-ups on scroll (can use CSS or lightweight library).
- **Color accents:** Use 2-3 accent colors consistently. Primary action color for CTAs, secondary for info.

### Stock Images to Use
Use high-quality Unsplash images. Suggested searches:
- "clean modern living room" for hero
- "house cleaning professional" for about section
- "sparkling kitchen" for services
- "before after cleaning" for gallery placeholders

### Reference Sites for Inspiration
Look at sites like:
- Homeaglow.com — warm, friendly cleaning service site
- MaidBrigade.com — professional but approachable
- Handy.com — clean, modern service marketplace

## What's Next (After Design)
1. **Booking form backend** — Add email delivery (Resend or similar)
2. **SEO** — Meta tags, Open Graph, local SEO targeting Seattle/Tacoma area
3. **Google Business integration** — Reviews embed, map
4. **Real photos** — Replace stock with actual photos from the owner when available
5. **Contact info** — Real phone, email, service areas from the owner

## Don't Touch
- Pricing structure and rates — owner sets these
- Quote estimator logic — the calculator works correctly, don't change the math
- Service descriptions — written for her business specifically
- Keep it simple — no CMS, no admin panel, no database. Static site.

## Tech Constraints
- Keep dependencies minimal — this is a simple marketing site
- All images via Unsplash URLs or public CDN (no local image files to bloat the repo)
- Tailwind CSS only — no additional CSS frameworks
- Must remain deployable on Vercel with zero config
