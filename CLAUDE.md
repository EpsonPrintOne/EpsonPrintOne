# EpsonPrintOne.com — Bigspring Astro Skinning and Build Instructions

## 1. Purpose of this file

This file is the operating brief for Claude Code and the build guide for the Epson PrintOne website. It consolidates the setup completed so far, the Git workflow, known dependency issues, the PrintOne brand and commercial structure, the theme-skinning sequence, deployment controls, and the acceptance checklist.

Read this entire file before editing the project.

Do not make broad changes until the Phase 0 audit has been completed and reported.

---

## 2. Current project state

### Local project

```text
C:\Websites\Epson-PrintOne\epson-printone
```

### GitHub repository

```text
https://github.com/EpsonPrintOne/EpsonPrintOne.git
```

### Current working branch

```text
printone-redesign
```

The branch has been pushed and tracks:

```text
origin/printone-redesign
```

Known baseline commit:

```text
a0e47f6 Add original Bigspring Astro theme
```

Before changing code, verify the branch and working tree:

```powershell
git branch --show-current
git status
git branch -vv
git remote -v
```

Expected current branch:

```text
printone-redesign
```

The working tree should ideally be clean.

### Important branch rule

- `main` is the stable production branch.
- `printone-redesign` is the active redesign branch.
- Do not perform redesign work directly on `main`.
- Do not merge into `main` until the preview deployment has been reviewed and approved.

If `main` does not exist locally or remotely, do not guess. Report this and provide the exact command required to create it from the untouched baseline commit.

---

## 3. Theme and dependency status

The installation error identified the root package as:

```text
bigspring-light-astro@4.0.2
```

The project also reported:

```text
astro@7.0.3
```

A dependency conflict was reported because:

```text
@digi4care/astro-google-tagmanager@2.0.0
```

has a peer dependency on:

```text
astro@^6.0.0
```

while the project uses Astro 7.0.3.

This is an upstream compatibility declaration issue. Do not use `npm install --force` and do not downgrade Astro automatically.

### Package-manager rule

Inspect the lockfile before installing dependencies:

```powershell
Get-ChildItem -Name *lock*
(Get-Content package.json -Raw | ConvertFrom-Json).packageManager
```

Use the package manager that matches the supplied lockfile.

If `pnpm-lock.yaml` exists, use pnpm:

```powershell
pnpm install
pnpm dev
pnpm build
```

Do not create or retain a conflicting `package-lock.json` in a pnpm project.

### Important theme identity check

The project package name says `bigspring-light-astro`, while the intended purchased theme was Bigspring Astro. During the audit, determine whether this project is:

1. the full paid Bigspring Astro theme,
2. Bigspring Light,
3. a mixed or outdated package, or
4. a customised release supplied by Themefisher.

Do not replace the theme or upgrade packages before this is understood. The existing project should first be made stable and reproducible.

---

## 4. Project objective

Build the official PrintOne printer-subscription marketing and application website for Singapore.

### Proposed public domain

```text
EpsonPrintOne.com
```

Public use of the Epson trademark, Epson logo, Epson product photography, and an Epson-branded domain requires the appropriate written brand approval.

### Programme identity

```text
PrintOne
```

### Operator

```text
Print-IQ Singapore Pte Ltd
```

### Supporting technology brand

```text
Powered by Epson
```

### Primary proposition

```text
One Printer. One Plan. One Bill.
```

### Secondary proposition

```text
Print More. Pay Less. Never Buy Ink Again.
```

### Website purpose

The site is not a conventional online shop. It is a subscription-plan discovery and customer-conversion website.

The intended customer journey is:

```text
Understand PrintOne
→ Compare plans
→ Select a suitable plan
→ Submit an enquiry or application
→ Print-IQ verifies the application
→ Delivery and installation are arranged
```

Do not introduce a shopping cart, inventory workflow, quantity selector, Shopify checkout, or conventional product-purchase flow unless explicitly requested later.

---

## 5. Target audiences

The website must serve several customer groups without making the brand feel fragmented:

- Home users
- Families
- Students
- Home businesses
- SMEs
- Small offices
- Offices requiring A3 printing
- Corporate fleet customers and retail chains as a future extension

The visual and copy direction must feel accessible to consumers while retaining sufficient credibility for business buyers.

---

## 6. Brand hierarchy and visual direction

### Brand hierarchy

Use this hierarchy consistently:

1. PrintOne programme
2. Print-IQ as the operator and service provider
3. Powered by Epson as the technology and printer brand

Do not make the site look as though Epson directly operates the subscription unless that arrangement is formally approved.

### Desired appearance

- Premium but approachable
- Spacious and uncluttered
- High-trust presentation
- More corporate service platform than technology startup
- Modern Singapore telecom-style plan comparison
- Strong product photography
- Restrained animation
- Excellent mobile readability
- Clear conversion paths

### Colour direction

Use the final supplied brand assets and approved colours. Until exact colour values are confirmed, use a restrained system based on:

- Deep Print-IQ blue as the primary action colour
- Epson blue as a supporting brand colour
- White and pale grey backgrounds
- Dark neutral text
- Limited green accents for sustainability content

Avoid:

- Neon colours
- Excessive gradients
- Heavy glassmorphism
- Cartoonish SaaS illustrations
- Overly playful startup visuals
- Generic stock photography unrelated to printing
- Excessive shadows or animated effects

### Typography

Retain Bigspring’s typography framework initially unless the supplied Epson or Print-IQ brand guide requires a change. Prioritise readability, clear numerical pricing, and a strong information hierarchy.

---

## 7. Commercial plan data

Create one central source of truth for all plan data. Do not hard-code prices and allowances separately across multiple pages.

Recommended file:

```text
src/data/plans.ts
```

Use this approved working data:

| Plan | Epson model | Monthly fee | Monthly pages | Primary audience |
|---|---|---:|---:|---|
| PrintOne Lite | Epson EcoTank L1250 | $9.90 | 100 | Home users |
| PrintOne Lite Plus | Epson EcoTank L4360 | $16.90 | 200 | Families |
| PrintOne Pro | Epson EcoTank L6390 | $25.90 | 500 | Students and home businesses |
| PrintOne Pro Plus | Epson EcoTank L6490 | $35.90 | 750 | SMEs |
| PrintOne Max | Epson EcoTank L15150 | $69.90 | 1,000 | Small offices requiring A3 |
| PrintOne Max Plus | Epson EcoTank L15180 | $99.90 | 1,000 | Higher-volume offices |

Mark PrintOne Pro as the featured or highly recommended plan.

Suggested data structure:

```ts
export const plans = [
  {
    slug: "lite",
    name: "PrintOne Lite",
    model: "Epson EcoTank L1250",
    monthlyFee: 9.9,
    monthlyPages: 100,
    audience: "Home users",
    image: "/images/printers/epson-l1250.webp",
    featured: false,
  },
  {
    slug: "lite-plus",
    name: "PrintOne Lite Plus",
    model: "Epson EcoTank L4360",
    monthlyFee: 16.9,
    monthlyPages: 200,
    audience: "Families",
    image: "/images/printers/epson-l4360.webp",
    featured: false,
  },
  {
    slug: "pro",
    name: "PrintOne Pro",
    model: "Epson EcoTank L6390",
    monthlyFee: 25.9,
    monthlyPages: 500,
    audience: "Students and home businesses",
    image: "/images/printers/epson-l6390.webp",
    featured: true,
  },
  {
    slug: "pro-plus",
    name: "PrintOne Pro Plus",
    model: "Epson EcoTank L6490",
    monthlyFee: 35.9,
    monthlyPages: 750,
    audience: "SMEs",
    image: "/images/printers/epson-l6490.webp",
    featured: false,
  },
  {
    slug: "max",
    name: "PrintOne Max",
    model: "Epson EcoTank L15150",
    monthlyFee: 69.9,
    monthlyPages: 1000,
    audience: "Small offices requiring A3",
    image: "/images/printers/epson-l15150.webp",
    featured: false,
  },
  {
    slug: "max-plus",
    name: "PrintOne Max Plus",
    model: "Epson EcoTank L15180",
    monthlyFee: 99.9,
    monthlyPages: 1000,
    audience: "Higher-volume offices",
    image: "/images/printers/epson-l15180.webp",
    featured: false,
  },
] as const;
```

Add TypeScript types and helper functions rather than duplicating formatting logic.

---

## 8. Services included with every plan

Use these working inclusions consistently:

- Printer included
- Free delivery
- Free installation and setup
- Genuine Epson ink supplied under the programme
- Free monthly pages according to the selected plan
- Onsite servicing
- Onsite repair or one-to-one exchange, subject to final approved terms
- Official Epson warranty wording, subject to final approval
- Singapore local support
- Scan-to-email configuration where supported and applicable

### Commercial claims that must not be invented

Do not invent or infer:

- Contract duration
- Minimum commitment
- Early termination charges
- Cancellation process
- Excess-page or overage charges
- Unused-page rollover
- Eligibility requirements
- Credit-review criteria
- Deposit requirements
- Billing date
- Payment methods
- Service-response time
- Repair turnaround time
- Exchange exclusions
- Ink-delivery thresholds
- Warranty exclusions
- Geographic service limitations
- Promotion expiry dates

Where these are needed, render a visible internal placeholder in source content:

```text
COMMERCIAL CONFIRMATION REQUIRED
```

Do not expose that placeholder on the public production site. Before launch, replace it with approved wording or hide the affected section.

---

## 9. Asset structure

Create or retain a clear asset structure:

```text
public/
└── images/
    ├── branding/
    ├── printers/
    ├── programme/
    ├── sustainability/
    ├── case-studies/
    ├── icons/
    └── backgrounds/
```

Recommended filenames:

```text
public/images/branding/printone-logo.svg
public/images/branding/printiq-logo.svg
public/images/branding/powered-by-epson.svg

public/images/printers/epson-l1250.webp
public/images/printers/epson-l4360.webp
public/images/printers/epson-l6390.webp
public/images/printers/epson-l6490.webp
public/images/printers/epson-l15150.webp
public/images/printers/epson-l15180.webp
```

### Image rules

- Use the exact official printer model image for each plan.
- Do not reuse one model image for another printer.
- Keep the entire printer visible.
- Use `object-fit: contain` or the equivalent Tailwind utility.
- Use meaningful alt text with the full model name.
- Avoid upscaling small raster images.
- Use transparent WebP, PNG, or SVG assets where suitable.
- Do not remove Themefisher source assets until all references have been audited.

---

## 10. Required reusable components

Audit existing Bigspring components first and reuse them where practical. Create new components only where the existing architecture cannot cleanly support the PrintOne flow.

Target component set:

```text
src/components/
├── Header.astro
├── Footer.astro
├── HeroBanner.astro
├── TrustStrip.astro
├── PlanCard.astro
├── PlanComparisonTable.astro
├── HowItWorks.astro
├── IncludedServices.astro
├── OwnershipComparison.astro
├── UseCaseGrid.astro
├── SustainabilitySection.astro
├── CaseStudyCard.astro
├── FAQAccordion.astro
├── CTASection.astro
├── PlanSelector.astro
└── EnquiryForm.astro
```

Names may differ if Bigspring already has equivalent components. Preserve the theme’s conventions instead of forcing this exact structure.

---

## 11. Page conversion map

Audit the actual routes and content collections before renaming anything.

Recommended mapping:

| Bigspring content | PrintOne use |
|---|---|
| Homepage | Main PrintOne landing page |
| Pricing | Plans and comparison |
| Features | Why PrintOne |
| How It Works | How PrintOne Works |
| Product | Printer plans |
| Product Details | Individual plan/model pages |
| Case Studies | Customer stories |
| Case Study Details | Charles & Keith and future case studies |
| FAQ | PrintOne FAQ |
| Contact | Talk to Print-IQ |
| Privacy Policy | Privacy and PDPA policy |
| Terms | Subscription terms |
| Blog | PrintOne Insights, optional at launch |
| Careers | Remove from navigation initially |
| Team | Remove from navigation initially |
| Authors | Hide unless the blog is launched |
| About/Company | About PrintOne and Print-IQ |

Do not delete collections or routes until references, internal links, sitemap behaviour, and build output have been checked.

---

## 12. Homepage information architecture

Use this order unless the audit shows a better component mapping:

1. Header
2. Hero
3. Trust strip
4. How PrintOne works
5. Featured PrintOne Pro plan
6. Six-plan comparison
7. Everything included with every subscription
8. Traditional printer ownership versus PrintOne
9. Home, business, and office use cases
10. Sustainability and Epson Heat-Free Technology
11. Customer case study
12. Frequently asked questions
13. Final conversion CTA
14. Footer

### Hero copy

Headline:

```text
Print More. Pay Less. Never Buy Ink Again.
```

Supporting message:

```text
Epson PrintOne brings together the printer, monthly pages, ink support,
installation and servicing in one simple monthly plan.
```

Tagline:

```text
One Printer. One Plan. One Bill.
```

Primary CTA:

```text
View Plans
```

Secondary CTA:

```text
Subscribe Now
```

Use a correct Epson printer image or approved PrintOne hero visual. Avoid generic SaaS artwork.

### Trust strip

Use concise benefits such as:

- Printer included
- Delivery and installation
- Genuine Epson ink
- Monthly pages included
- Onsite servicing
- Local Singapore support

Do not use unapproved absolutes such as “unlimited,” “guaranteed,” or “zero downtime.”

### How it works

1. Choose your printer plan
2. Print-IQ delivers and installs the Epson printer
3. Print within the plan’s monthly page allowance
4. Ink support and servicing are managed under the programme

### Featured plan

Feature:

```text
PrintOne Pro
Epson EcoTank L6390
$25.90 per month
500 pages per month
Highly Recommended
```

### Comparison section

The desktop table must be scannable and the mobile view must not become an unreadable horizontally compressed table. On mobile, use stacked comparison cards, a controlled horizontal scroll with clear cues, or a plan selector.

### Traditional ownership comparison

Compare approved high-level concepts only:

- Upfront printer purchase versus monthly plan
- Separate ink purchasing versus programme ink support
- Ad hoc servicing versus included servicing framework
- Unpredictable operating cost versus predictable monthly fee

Do not insert savings percentages without a documented calculation and approved assumptions.

### Sustainability section

May cover:

- Epson Heat-Free Technology
- Reduced energy requirements compared with conventional heat-based laser printing, subject to substantiation
- Lower consumables and packaging burden where supported
- Centralised fleet-management benefits
- Corporate reporting and case studies

All numerical environmental claims require an approved source, assumptions, calculation method, and date.

---

## 13. Navigation structure

Recommended launch navigation:

```text
Home
Plans
How It Works
Why PrintOne
Sustainability
Case Studies
FAQ
Contact
```

Primary navigation CTA:

```text
Subscribe Now
```

On mobile:

- The CTA must remain easy to find.
- The menu must be keyboard accessible.
- The menu must close after navigation.
- Focus states must be visible.
- The header must not cover anchored content.

---

## 14. Footer structure

Include:

- PrintOne logo
- “Operated by Print-IQ Singapore Pte Ltd”
- “Powered by Epson” in the approved supporting position
- Plans
- How It Works
- FAQ
- Contact
- Privacy Policy
- Terms and Conditions
- Copyright notice
- Company contact details when approved

Do not add fictional social accounts, addresses, awards, accreditations, or partner logos.

---

## 15. Enquiry and application strategy

### Phase 1: launch-safe enquiry form

The first public version should use a simple enquiry or plan-interest form that does not collect identity documents.

Suggested fields:

- Full name
- Mobile number
- Email address
- Customer type: home or business
- Selected PrintOne plan
- Singapore postal code
- Preferred contact method
- Message or installation requirement
- Consent to be contacted

Use spam protection and server-side validation.

### Phase 2: secure application workflow

Only add sensitive application data after the privacy, commercial, and operational workflow is approved.

Potential application fields:

- Full legal name
- NRIC or FIN, only if collection is necessary and legally approved
- Date of birth, only if necessary
- Mobile number
- Email
- Installation address
- Selected plan
- Preferred installation date
- Supporting documents
- Billing consent
- Terms acceptance

### Sensitive-data rules

- Do not store identity documents in `/public`.
- Do not email identity-document attachments.
- Do not expose NRIC or FIN in URLs.
- Do not write sensitive values to browser or server logs.
- Do not use a public storage bucket.
- Do not expose a service-role key to the browser.
- Do not collect more personal data than the approved process requires.
- Use private storage, server-side access controls, retention rules, and administrator authentication.

Recommended later architecture:

```text
Astro frontend and server endpoint
→ Cloudflare runtime
→ Supabase database
→ Private Supabase Storage
→ Transactional email service
→ Print-IQ review workflow
```

Do not build the sensitive backend during the visual skinning phase.

---

## 16. SEO, analytics, and technical requirements

Retain or improve Bigspring’s existing SEO framework.

Required launch elements:

- Unique page titles
- Unique meta descriptions
- Canonical URL configuration
- Open Graph metadata
- Social sharing image
- Sitemap
- Robots file
- Favicons
- Structured heading hierarchy
- Descriptive image alt text
- Accessible links and controls
- 404 page
- No demo metadata or fictional company names

### Analytics

Do not block the build on the current Google Tag Manager integration.

Audit how the GTM package is used. If the package remains incompatible with Astro 7, recommend one of these controlled options:

1. update to a compatible official or maintained integration,
2. replace it with a small native Astro component using an environment-controlled container ID, or
3. temporarily disable GTM until the public launch configuration is ready.

Do not silently bypass a failed dependency by forcing the entire dependency tree.

Cloudflare Web Analytics may be used later if approved.

---

## 17. Cloudflare deployment workflow

The current recommended deployment pattern is:

```text
Local project
→ Git commit on printone-redesign
→ Push to GitHub
→ Cloudflare preview deployment
→ Review and approve
→ Pull request or merge to main
→ Cloudflare production deployment
→ Custom domain
```

For a static Astro build, the typical Cloudflare Pages settings are:

```text
Production branch: main
Build command: pnpm build
Build output directory: dist
```

If Cloudflare is currently configured with npm while the repository uses pnpm, update the build command to match the project lockfile.

### Preview deployment rule

Push redesign work to `printone-redesign`. Review the generated branch or pull-request preview URL before merging.

Do not point the public custom domain to the redesign branch.

### Dynamic routes later

The initial marketing site can remain static. Add the Cloudflare Astro adapter only when server-rendered routes, API endpoints, or secure form processing are needed.

Do not add the adapter merely for a static content redesign.

---

## 18. Git operating procedure

### Before every work session

```powershell
cd C:\Websites\Epson-PrintOne\epson-printone
git switch printone-redesign
git pull
git status
```

### After a completed and tested change

```powershell
pnpm build
git status
git add .
git commit -m "Describe the completed change"
git push
```

Recommended small commit messages:

```text
Audit Bigspring project structure
Configure PrintOne brand system
Add PrintOne plan data
Rebuild header and footer
Rebuild PrintOne homepage
Add responsive plan comparison
Add How It Works page
Add sustainability content framework
Add case study structure
Add FAQ content
Add enquiry form
Prepare Cloudflare production configuration
```

### Do not commit

```text
node_modules/
dist/
.astro/
.env
.env.*
.wrangler/
.dev.vars
customer data
identity documents
API keys
service-role keys
private certificates
```

Retain `!.env.example` only if it contains placeholder names and no secrets.

### Recovery commands

Inspect recent commits:

```powershell
git log --oneline --decorate -10
```

Inspect changed files:

```powershell
git status
git diff
git diff --staged
```

Do not run destructive commands such as `git reset --hard`, `git clean -fd`, or force-push without explicit approval and a verified backup.

---

## 19. Phase-by-phase implementation plan

## Phase 0 — Audit only

Do not modify files.

Report:

1. Installed Astro version
2. Theme name and version
3. Whether this is Bigspring or Bigspring Light
4. Package manager and lockfile
5. Existing dependency warnings
6. Tailwind configuration
7. Main site configuration files
8. Header and navigation source
9. Footer source
10. Homepage section structure
11. Pricing data source
12. Content collections
13. Product content source
14. Case-study content source
15. FAQ content source
16. Image handling
17. Contact-form behaviour
18. Sitepins CMS configuration
19. Existing Cloudflare configuration
20. Environment variables
21. Themefisher agent or skill files
22. Build output and current errors
23. Pages and components that can be retained
24. Pages and components that should be hidden or removed
25. New components required

After the audit, stop and wait for approval.

## Phase 1 — Global brand skin

Implement only:

- Site title and metadata
- Favicon placeholders
- Colour tokens
- Typography decisions
- Global buttons
- Header
- Navigation
- Footer
- Logo slots
- Removal of visible demo identity

Do not rebuild every page in this phase.

Run:

```powershell
pnpm build
```

Report all modified files and any remaining demo references.

## Phase 2 — Plan data and homepage

Implement:

- Central plan data
- Hero
- Trust strip
- How It Works
- Featured PrintOne Pro
- Six-plan grid
- Included services
- Ownership comparison
- Use cases
- Sustainability teaser
- Case-study teaser
- FAQ teaser
- Final CTA

Ensure all plan displays read from the same data source.

## Phase 3 — Core pages

Implement:

- Plans
- Individual plan pages if required
- How It Works
- Why PrintOne
- Sustainability
- Case Studies
- FAQ
- Contact
- About PrintOne and Print-IQ

Hide careers, team, and author pages from navigation unless specifically requested.

## Phase 4 — Enquiry conversion

Implement a non-sensitive enquiry form with:

- Server-side or approved form handling
- Validation
- Accessible errors
- Spam protection
- Consent checkbox
- Success state
- Internal notification
- No identity-document upload

## Phase 5 — Launch hardening

Complete:

- Responsive testing
- Accessibility review
- Cross-browser review
- Metadata review
- Link audit
- Image audit
- Lighthouse or equivalent performance check
- Production build
- Preview deployment review
- Removal of demo content
- Approval of all commercial claims
- Privacy and terms review

## Phase 6 — Secure application backend

Separate project phase. Do not commence without approved requirements for personal data, identity verification, billing, retention, security, and administrator access.

---

## 20. Exact Claude Code prompts

### Prompt A — Audit

```text
Read CLAUDE.md in full and inspect this complete Bigspring Astro project.

Do not modify files yet.

Complete Phase 0 exactly as specified in CLAUDE.md. Confirm the current Git
branch, theme identity, package manager, dependency state, content structure,
Cloudflare configuration and build status. Identify whether this is Bigspring
Astro or Bigspring Light and explain any version mismatch.

Then provide:
1. the audit findings,
2. a file-by-file implementation plan,
3. risks and unresolved commercial inputs,
4. the proposed Phase 1 change list.

Stop and wait for approval before editing.
```

### Prompt B — Global skin

```text
Proceed with Phase 1 only, following CLAUDE.md.

Implement the PrintOne global brand skin, header, navigation, footer, global
metadata, button system and approved colour direction. Preserve Bigspring's
responsive and accessibility architecture. Remove visible demo identity but
do not delete content collections or rebuild all pages yet.

Do not invent commercial terms or Epson approvals.

After editing:
- run the production build,
- fix build errors,
- list every modified file,
- list remaining demo references,
- recommend the next commit message,
- stop before Phase 2.
```

### Prompt C — Homepage and plans

```text
Proceed with Phase 2 only, following CLAUDE.md.

Create a typed central plan data source and make all homepage plan displays
read from it. Rebuild the homepage using the specified PrintOne section order.
Use the exact six working plans, prices and page allowances in CLAUDE.md.
Feature PrintOne Pro and the Epson EcoTank L6390.

Use local approved printer image paths and preserve the full printer image with
object-fit contain. Do not substitute printer models.

Do not invent contract duration, overage charges, cancellation rules, warranty
exclusions, service response times or savings percentages.

After editing:
- run the production build,
- test responsive behaviour,
- list modified files,
- identify missing assets or approvals,
- recommend the next commit message,
- stop before Phase 3.
```

### Prompt D — Core pages

```text
Proceed with Phase 3 only, following CLAUDE.md.

Convert the retained Bigspring pages into Plans, How It Works, Why PrintOne,
Sustainability, Case Studies, FAQ, Contact, and About PrintOne/Print-IQ.
Retain the existing content and component architecture where practical.
Hide careers, team and author routes from navigation without destructively
deleting them unless the build audit confirms they are unused.

All plan information must come from the central plan data source.
All unapproved claims must remain absent or be marked internally for commercial
confirmation.

Run the build, fix errors, audit links and report modified files before stopping.
```

### Prompt E — Enquiry form

```text
Proceed with Phase 4 only, following CLAUDE.md.

Build a launch-safe plan enquiry form. Do not collect NRIC, FIN, date of birth,
identity documents or payment credentials.

Include accessible validation, spam protection integration points, consent,
selected plan context, success and error states, and secure server-side handling
or a clearly isolated approved provider integration.

Do not expose secrets in public environment variables or commit them to Git.
Run the production build and provide a security review of the implementation.
```

### Prompt F — Launch audit

```text
Perform Phase 5 launch hardening according to CLAUDE.md.

Do not add new features. Audit and fix:
- mobile layout,
- navigation and keyboard access,
- headings,
- contrast,
- image alt text,
- broken links,
- metadata,
- canonical URLs,
- sitemap and robots output,
- demo content,
- incorrect printer models,
- inconsistent plan data,
- build warnings,
- unnecessary client JavaScript,
- sensitive data exposure.

Run the production build and provide a launch-blocker list separated into:
critical, approval required, and optional improvement.
```

---

## 21. Acceptance criteria for the redesigned theme

### Brand and content

- No visible Bigspring or fictional demo branding
- Correct PrintOne, Print-IQ, and Powered by Epson hierarchy
- Correct six plans
- Correct printer model assigned to each plan
- Correct monthly price and page allowance
- PrintOne Pro clearly featured
- No invented commercial terms
- No unsupported savings or sustainability figures

### UX

- Primary CTA visible above the fold
- Plans easy to compare on desktop and mobile
- Navigation works with keyboard and touch
- CTA text is consistent
- No shopping cart or conventional checkout
- Contact and enquiry routes are clear
- Mobile text and tap targets are readable

### Technical

- `pnpm build` succeeds
- No unresolved imports
- No missing local assets
- No console errors on major pages
- No secrets in source control
- No public sensitive-data storage
- Metadata is unique and accurate
- Preview deployment works before production merge

### Operations

- `main` remains stable
- Redesign work is committed in small logical commits
- Cloudflare production branch is `main`
- Custom domain is connected only after approval
- Privacy, terms, trademark use, pricing, and service terms are approved before launch

---

## 22. Troubleshooting reference

### `npm install` fails with ERESOLVE

Known error:

```text
Found: astro@7.0.3
Could not resolve dependency:
peer astro@^6.0.0 from @digi4care/astro-google-tagmanager@2.0.0
```

Preferred response:

1. Confirm the supplied lockfile.
2. Use pnpm if `pnpm-lock.yaml` exists.
3. Remove accidental `package-lock.json`.
4. Avoid `npm install --force`.
5. Audit the GTM integration after the original theme builds.

Commands:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
pnpm install
pnpm dev
pnpm build
```

If strict peer dependency enforcement still blocks installation, report it before changing versions. A temporary non-strict install may be used only to reproduce the vendor theme, followed by a planned GTM cleanup.

### `corepack` is not recognised

Install pnpm through npm:

```powershell
npm install -g pnpm@10
```

Use the major version stated by `package.json` when present.

Verify:

```powershell
pnpm --version
```

### `src refspec printone-redesign does not match any`

This means the local branch did not exist or there was no commit.

Typical fix:

```powershell
git add .
git commit -m "Add original Bigspring Astro theme"
git switch -c printone-redesign
git push -u origin printone-redesign
```

Current project state indicates this has already been resolved.

### Verify current tracking

```powershell
git branch -vv
git remote -v
```

Expected remote:

```text
origin https://github.com/EpsonPrintOne/EpsonPrintOne.git
```

---

## 23. Recommended immediate next action

From the project directory:

```powershell
cd C:\Websites\Epson-PrintOne\epson-printone
git switch printone-redesign
git status
pnpm build
claude
```

Then paste Prompt A from this file.

Do not ask Claude to “redesign everything” in one instruction. Complete the audit, global skin, homepage, core pages, form and launch audit as separate phases with a build and Git commit after each phase.

---

## 24. Official technical references

These references were current when this guide was prepared on 28 July 2026:

- Themefisher Bigspring Astro: https://themefisher.com/products/bigspring-astro
- Themefisher Bigspring Light Astro: https://themefisher.com/products/bigspring-light-astro
- Cloudflare Pages Astro guide: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- Cloudflare Pages preview deployments: https://developers.cloudflare.com/pages/configuration/preview-deployments/
- Cloudflare Pages Git integration: https://developers.cloudflare.com/pages/get-started/git-integration/
- GitHub push documentation: https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository

Dashboard labels and package versions may change. Inspect the actual project and current platform interface before applying version-specific changes.
