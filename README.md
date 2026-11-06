# UzaDeals

UzaDeals is a Kenyan small-business marketplace concept. It helps people
discover, evaluate, buy, and sell businesses such as kiosks, salons,
agrovets, car washes, M-Pesa shops, online stores, and other small
enterprises.

The current project is a frontend demonstration built with fictional
listing data and simulated workflows. It is not connected to a production
backend, payment provider, identity provider, or notification service.

## Features

### Marketplace

- Responsive homepage and business discovery experience.
- Business categories and Kenyan county filters.
- Search, sorting, pagination, and URL-synchronized filters.
- Business listing cards and detailed listing pages.
- Asking price, revenue, profit, operating history, and other listing
  information.
- Estimated payback calculation when monthly profit is available.
- Seller-reported financial figures and verification disclosures.
- Demo listing labels.

### Buyer experience

- Listing inquiry form.
- Kenyan phone number normalization and validation.
- Inquiry input sanitization and honeypot field.
- Saved listings stored in browser local storage.
- Search alert preferences.

### Seller experience

- Multi-step listing wizard.
- Draft autosaving in browser storage.
- Business information and financial details.
- Photo selection and client-side photo handling.
- Seller dashboard and listing status presentation.

### Account experience

- Simulated phone OTP sign-in.
- Saved listings and account pages.
- Search alert preference management.

### Payments and platform information

- Simulated payment status flow.
- How It Works page.
- Verification explanation.
- Privacy and Terms placeholder pages.
- Demo moderation interface.
- English and Swahili message dictionaries.

### UI and accessibility

- Shared buttons, inputs, sheets, accordions, chips, skeletons, and
  toast components.
- Responsive layouts.
- Keyboard-accessible controls where implemented.
- Visible focus indicators.
- Reduced-motion support for animated elements.
- Semantic labels and form error messaging.

### PWA metadata

- Web app manifest.
- Standalone display configuration.
- Theme and background colors.
- SVG application icon.

The project currently has no service worker or offline caching.

## Technology stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- lucide-react
- react-hook-form
- Zod
- @hookform/resolvers

The application uses Next.js server components by default and client
components where browser interaction or local state is required.

## Requirements

- Node.js compatible with the installed Next.js version.
- npm.
- Git.

## Getting started

Clone the repository:

```bash
git clone <repository-url>
cd uzadeals