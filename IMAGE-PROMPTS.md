# Variant 3 image prompts

Mode: built-in image generation, identity-preserving edits of the supplied posters. These are recreated scenario images.

Each image receives the complete common prompt below, followed by its scenario prompt.

## Common prompt

Use case: identity-preserve. Edit the supplied reference poster into a clean photorealistic environmental photograph for a FULL-SCREEN mobile app background. Preserve MS Dhoni's facial identity, hairstyle, age, black SpeakX jacket and white T-shirt, with warm natural cinematic lighting consistent with the reference. RECOMPOSE from a pulled-back camera so the setting tells the story and the people do not dominate. Output a very tall portrait at 1024x2216 pixels (approximately 9:19.5), full-bleed photography from edge to edge. Remove ALL poster headlines, slogans, captions, laurels, black letterbox bands, and graphic overlays. Preserve the small existing jacket mark only. No new typography, UI, watermarks or graphic frames. CRITICAL LAYOUT: the essential contextual scene and all faces must be composed together between 20% and 59% of the full canvas height; Dhoni's face is near 33% height and occupies less than 12% of image width. Top 18% is atmospheric room/ceiling for a header overlay; bottom 35% continues the real scene as quieter foreground (floor/table/furniture), naturally darker, without crucial objects or faces, for code-rendered text and a button. Do not put a large person in the foreground. Do not blur away the setting. Scenario: 

## interview

Source: `../msd/03_04_handshake.png`

Saved asset: `public/images/context/interview.png`

Scenario prompt: A clearly recognizable JOB INTERVIEW in a modern glass-walled office. Show MS Dhoni seated on the right side of an interview desk, and a professional interviewer seated on the left, their faces and upper bodies visible in three-quarter profile as they have a warm conversation. A laptop, resume papers, pen, two office chairs, glass partitions, and city windows establish the setting. Both people and the desk must fit inside the central 80% of the narrow image. Do not make this a close-up handshake portrait.

## classroom

Source: `../msd/01_01_ptm.png`

Saved asset: `public/images/context/classroom.png`

Scenario prompt: A clearly recognizable parent-teacher conversation in a welcoming classroom. MS Dhoni sits at a small desk with two other adults, their faces visible, chatting naturally. Show colorful children's artwork, a classroom board, small chairs, books and cubbies in the same shot. Keep the adults and classroom furnishings clearly visible together.

## home

Source: `../msd/02_02_sofa.png`

Saved asset: `public/images/context/home.png`

Scenario prompt: MS Dhoni comfortably seated on a sofa using a smartphone to learn at home. Show the entire sofa, warm floor lamp, coffee table with a book and mug, framed artwork, window curtains and a plant. The room must be immediately recognizable as a cozy living room. A wide environmental composition, not a face close-up.

## meeting

Source: `../msd/04_05_whiteboard.png`

Saved asset: `public/images/context/meeting.png`

Scenario prompt: A clearly recognizable OFFICE MEETING. MS Dhoni stands beside a complete visible whiteboard with simple abstract diagram lines, presenting to two seated colleagues around a conference table with laptops. Show office chairs and large city windows. Include the entire whiteboard, presenter and colleagues inside the portrait composition.

## library

Source: `../msd/05_03_library.png`

Saved asset: `public/images/context/library.png`

Scenario prompt: MS Dhoni with books in a university library. Show long recognizable book-filled shelves on both sides, an arched window, reading lamps and a study table with students reading. Make the library architecture and rows of books as important as Dhoni. Dhoni stands naturally in the middle distance holding the books.

## airport

Source: `../msd/06_06_airport.png`

Saved asset: `public/images/context/airport.png`

Scenario prompt: MS Dhoni with passport, boarding pass and rolling suitcase in a clearly recognizable AIRPORT TERMINAL. Show large terminal windows with a visible airplane outside, rows of gate seats and a departures display with abstract rows, plus a few distant travelers. Keep the airplane, suitcase, gate seating and Dhoni all legible in the narrow composition.



## Variant 1 clean card artwork

Built-in image editing. Original posters preserved. All card headline and footer copy is rendered in React.

Prompt used for each of the six original images:

Edit this exact supplied SpeakX portrait poster. Remove only all overlaid promotional typography: the large white/orange headline at top, the lower 'Feel the change in just 1 week', 'TRUSTED BY 1 CRORE+ LEARNERS', and both laurel ornaments. Seamlessly reconstruct the underlying photographic/background pixels where removed. Keep the top black/dark quiet area and bottom dark gradient, but entirely free of poster text. Preserve the exact photograph, Dhoni's identity/face, hairstyle, expression, pose, hands, clothing, small embroidered SpeakX jacket logo, other people, objects, setting, lighting, framing and full original 1080:2052 portrait aspect ratio. Do not recompose, zoom, crop or add objects. This is a minimal text-removal edit, delivering the same image with the promotional text removed so HTML captions can replace it. Output a single clean portrait image with no new text.

- `public/images/card/01_01_ptm.png` from `/Users/arpitmittal/.codex/generated_images/01a08f88-fce0-7703-84a1-41a8d1b560cf/exec-788708ac-77a9-437b-9582-fe0368451926.png`
- `public/images/card/02_02_sofa.png` from `/Users/arpitmittal/.codex/generated_images/01a08f88-fce0-7703-84a1-41a8d1b560cf/exec-278bd127-5cd5-4c33-9f98-73e098efc11a.png`
- `public/images/card/03_04_handshake.png` from `/Users/arpitmittal/.codex/generated_images/01a08f88-fce0-7703-84a1-41a8d1b560cf/exec-6efed4e9-ca16-482c-b5ef-5d67514ab16c.png`
- `public/images/card/04_05_whiteboard.png` from `/Users/arpitmittal/.codex/generated_images/01a08f88-fce0-7703-84a1-41a8d1b560cf/exec-ad371ac4-2b2f-459f-814b-f861e43a872c.png`
- `public/images/card/05_03_library.png` from `/Users/arpitmittal/.codex/generated_images/01a08f88-fce0-7703-84a1-41a8d1b560cf/exec-78488497-d005-4f28-b3c4-0b39c215b2fa.png`
- `public/images/card/06_06_airport.png` from `/Users/arpitmittal/.codex/generated_images/01a08f88-fce0-7703-84a1-41a8d1b560cf/exec-383a1095-9be9-48ad-9a75-4b154f30d31e.png`


## Friends and family replacement slide

Built-in image generation from the cleaned original MSD sofa image. Two compositions for card and full-screen layouts; captions remain in code.

### card

Asset: `public/images/card/friends-family.png`

Use the supplied image only as reference for MS Dhoni's exact recognizable identity, hairstyle, black SpeakX zip jacket with small orange embroidered logo, white T-shirt and warm photographic campaign style. Recreate the setting as a relaxed living-room conversation with MS Dhoni and three fictional Indian adult friends/family members (an older woman, a man around 40 and a woman around 30). They are smiling, gesturing and listening to one another around a coffee table with tea cups, seated on a sofa and armchairs. NO phones, NO one looking at camera, real eye contact among them; MSD visibly speaking confidently. Warm Indian contemporary home with sofa, cushions, framed family photographs, lamp, shelves and plant. Everyone fully clothed. Fictional companions, do not depict real Dhoni relatives. Natural hands/anatomy, premium photorealistic advertising lighting, realistic expressions. Absolutely no headlines, captions, marketing typography, laurels or watermarks; only the small embroidered SpeakX clothing logo may have text. Preserve enough environment to make friends/family context immediately clear. Portrait canvas 1080x2052. Match source's card art composition with quiet dark upper 20% and lower 14%, people faces clustered from 34% to 52% of canvas height. Keep all four faces inside the middle 80% of image width; seated group shown to waist, table and home setting visible. Space at top and bottom for separately coded text.

### context

Asset: `public/images/context/friends-family.png`

Use the supplied image only as reference for MS Dhoni's exact recognizable identity, hairstyle, black SpeakX zip jacket with small orange embroidered logo, white T-shirt and warm photographic campaign style. Recreate the setting as a relaxed living-room conversation with MS Dhoni and three fictional Indian adult friends/family members (an older woman, a man around 40 and a woman around 30). They are smiling, gesturing and listening to one another around a coffee table with tea cups, seated on a sofa and armchairs. NO phones, NO one looking at camera, real eye contact among them; MSD visibly speaking confidently. Warm Indian contemporary home with sofa, cushions, framed family photographs, lamp, shelves and plant. Everyone fully clothed. Fictional companions, do not depict real Dhoni relatives. Natural hands/anatomy, premium photorealistic advertising lighting, realistic expressions. Absolutely no headlines, captions, marketing typography, laurels or watermarks; only the small embroidered SpeakX clothing logo may have text. Preserve enough environment to make friends/family context immediately clear. Very tall portrait canvas 1024x2216 (phone screen ratio). Pulled-back environmental composition: all four people together within the middle 80% of width. Faces clustered between 30% and 45% of full canvas height, interactions/hands/table at 45%-58%. Top 18% shows quieter room background for app header; bottom 35% is gently darkened floor/rug/coffee-table foreground for separately coded caption and button. Important facial and setting details must remain visible above the lower captions. No tight headshot.

## Universal bundled fallback

Asset: `public/images/fallback/msd.webp` (320 × 692, WebP quality 48, 3,310 bytes). Embedded in `app/fallback-image.ts`. Generated from the cleaned MSD interview card.

Preserve MS Dhoni's recognizable identity, face, hairstyle and black zip jacket with small orange SpeakX logo over a white T-shirt. Use a smooth warm charcoal studio background with a subtle amber glow, no objects or texture. Facing camera with a calm friendly smile, relaxed natural pose, hands out of frame, centered upper-body portrait. Tall phone composition with quiet upper background and the lower torso fading into charcoal. Simplified lighting and smooth gradients to compress very small, clear face at low resolution, no poster typography, captions, borders, laurels or watermark.
