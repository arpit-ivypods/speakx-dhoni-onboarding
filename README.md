# SpeakX mobile onboarding

A single-page React application built with Vinext, React 19, TypeScript, and the supplied Design OS 2.1 language.

## Run locally

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npx tsc --noEmit
npm run build
```

## Experience

- Six supplied Dhoni scenes, with CSS cropping that leaves the originals intact.
- 3.6-second automatic rotation, 600ms crossfades and 12px headline transitions, plus a subtle 3.5% image zoom.
- Swipe/drag, arrow keys, previous/next controls, pagination, replay, and pause/play.
- Autoplay pauses for keyboard focus, open dialogs/menus, background tabs, and dragging. Reduced-motion settings disable autoplay and decorative motion.
- Get Started opens an accessible goal chooser with a working local completion state. Sign In explains the account-service integration boundary; it does not collect credentials or pretend to authenticate.
- Figtree fonts served locally. DS 2.1 dark semantic colors, orange 50/60/70 button states, pill CTAs, 16px cards, 24px dialogs, and blue focus rings.
- Responsive mobile layouts including 320×568 and 390×844, safe-area insets, and a centered mobile composition on desktop.

The provided Kuku video supplies the repeating imagery and changing headline reference. The Netflix screen supplies the header, dominant carousel, pagination, and bottom CTA structure. Source images and claims are supplied by the user.

## Design variations

The preview has an iPhone-style frame with a responsive scale, status bar, Dynamic Island, and home indicator. Use the tabs above the frame to switch between Card carousel and Full background. The active scene and playback state are shared between both views. Dialogs and the options menu remain inside the phone.

Full background uses an SVG viewport to crop the original poster to its photographic area (y=470–1610); source files remain intact. All visible headings and supporting captions are rendered by React, independently from the 800ms background crossfade and subtle zoom.

### Variant 3 — Scene context

Six new environment-focused images are available under `public/images/context/`. The original two variants continue using the original assets. Variant 3 fills the phone screen with portrait-composed imagery that shows the surrounding setting, with no zoom animation and a 4.8-second slide interval. The active scene and pause state remain shared across variants. CTA text is white, per the requested override.

See `IMAGE-PROMPTS.md` for the built-in image generation prompts and source/output mapping. Actual generated dimensions are 853×1844, closely matching the phone screen aspect ratio.
