
# UzaDeals internationalisation scaffold

Current locales:

- `en` — English
- `sw` — Swahili

## Translation structure

Messages are grouped by product area in `messages.ts`:

- `common`
- `home`
- `listing`
- `seller`
- `verification`

Use the same message keys across both locales.

## Swahili translation status

**Needs native review before production.**

The Swahili text is an initial translation scaffold. A fluent native Swahili reviewer should check:

- Natural wording and regional usage.
- Business and financial terminology.
- Legal and verification language.
- Consistency across navigation, forms and error messages.
- Accessibility and clarity for different levels of literacy.

Do not treat the current translations as legally approved copy.

## Adding another locale

1. Add the locale to the `Locale` type.
2. Add a matching dictionary to `messages`.
3. Keep the same message keys in every locale.
4. Have the translations reviewed before enabling the locale in production.

## Current limitation

This is a message dictionary only. Locale selection, URL prefixes,
language persistence, number formatting and date formatting have not
yet been connected to the application.
