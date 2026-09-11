# SpeakX mobile onboarding

A single-page React app built with Vinext, React 19, TypeScript, and the supplied Design OS 2.1 language. The experience sits inside a responsive phone frame.

## Run locally

Requires Node.js 22.13 or newer and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by the development server (normally http://localhost:5173).

## Verify and build

```sh
npx tsc --noEmit
npm run build
```

## Design variations

Use the tabs above the phone to switch among three layouts. The active slide and playback state are shared.

1. **Card carousel:** clean artwork with all promotional headlines and supporting captions rendered in React.
2. **Full background:** edge-to-edge imagery with code-rendered captions. Original posters use an SVG crop; the friends-and-family scene uses dedicated full-screen artwork.
3. **Scene context:** portrait imagery composed to preserve the surrounding setting, with no zoom animation.

The six scenes cover everyday conversations, friends and family, job interviews, office meetings, college life, and travel. The friends-and-family scene shows MSD in a living-room conversation.

## Interactions and design

- Swipe/drag, arrow keys, previous/next controls, pagination, and pause/play.
- Automatic rotation starts at 0.5 seconds, adjustable from 0.5–12 seconds with the preview slider across all variants; manually browsing a slide pauses autoplay until Play is tapped. The core “Speak English” headline stays fixed while the situation fades in.
- Autoplay pauses for keyboard focus, open dialogs/menus, background tabs, and dragging. Reduced-motion preferences disable autoplay and decorative motion.
- Get Started opens a goal chooser with a local completion state. Sign In is a preview; account authentication is not connected.
- The menu to the right of Sign In contains Contact us, FAQ, Privacy Policy, and About us. Support panels stay inside the phone; official website links open separately.
- Locally served Figtree fonts, dark Design OS colors, orange pill buttons with white text, and visible keyboard focus states.

## Assets and implementation

- `app/page.tsx`: onboarding, header, carousel, and goal selection.
- `app/globals.css`: design tokens, phone frame, responsive layout, and animations.
- `app/context-backdrop.tsx`: scene-context image layer.
- `app/support-content.tsx`: contact, FAQ, and about panels.
- `public/images/`: original supplied posters.
- `public/images/card/`: clean card artwork.
- `public/images/context/`: full-screen contextual artwork.
- `IMAGE-PROMPTS.md`: image generation prompts and asset mapping.

Original assets are retained. Captions remain separate from edited/generated images. The Netflix reference informed the onboarding structure and the Kuku video informed the changing imagery and headline motion.

## Hosting

Published at https://speakx-dhoni-onboarding.arpit710942.chatgpt.site.

`.openai/hosting.json` identifies the existing Sites project. Publishing is managed through Sites; pushing to this GitHub repository does not automatically redeploy the site. Local runtime files, dependencies, build output, and environment files are excluded by `.gitignore`.

## UX and readability improvements

The first screen opens with “Speak English / with confidence.” Every scene uses the same two-line structure, followed by Get Started and a single trust line below the button. The one-week claim and repeated motivational taglines have been removed. Headline contrast, control sizes and spacing have been increased. The goal chooser uses a shorter, direct question.

## Image loading fallback

All three variations share one 3,310-byte WebP portrait (`public/images/fallback/msd.webp`), embedded as a data URL in `app/fallback-image.ts`. It renders with the app shell without a separate image download. `app/scene-image.tsx` loads and decodes scene photos before fading them in; failures keep the portrait visible. A CSS gradient is the base layer. Captions, navigation and Get Started remain usable.

Use **Test image loading** above the phone: Normal loading, Slow loading (a five-second delay before requesting each photo), or Images unavailable (invalid image bytes exercise the image error handler). Switching back to Normal restores scene photos. The fallback avoids a separate request; loading the web app itself still requires its shell to be available. Native app packaging should include the same asset in its bundle.
