/*
  INSPIRATION LIBRARY — DATA FILE
  ================================
  This is the only file you need to edit to grow the library.

  To add a new piece:
    1. Drop the full-size image into /images  (e.g. images/my-new-thing.png)
    2. (Optional) add a smaller copy to /images/thumbs as .jpg for a faster grid.
       If you skip this, the grid just uses the full image.
    3. Copy an entry below, paste it at the top of LIBRARY, and fill it in.

  Field guide
    id        unique, lowercase-with-dashes. Used in the URL.
    title     shown on the card and detail page.
    project   the brand / site / source it came from. Used for grouping.
    source    optional URL.
    category  ONE of CATEGORIES below (what kind of thing it is).
    tone      "Dark" or "Light".
    styles    any number of visual styles. New ones appear in filters automatically.
    colors    color families from COLOR_FAMILIES below (for filtering).
    palette   exact hex swatches pulled from the image (click-to-copy on the detail page).
    mood      any number of mood words.
    images    one or more filenames in /images. Multiple = frames / states.
    brief     a design brief: what it is and why it works.
    prompt    an image-generation prompt that recreates the look.
    notes     optional: what to steal from it.
    added     date added, YYYY-MM-DD.
*/

window.CATEGORIES = [
  "Hero",
  "Full Page",
  "Section",
  "Component",
  "Device Mockup",
  "Illustration",
];

// name -> swatch shown in the color filter
window.COLOR_FAMILIES = {
  Black: "#0b0b0b",
  Gray: "#8a8a8a",
  "Warm Neutral": "#d9d6d0",
  White: "#f4f4f2",
  Blue: "#2f5bff",
  Slate: "#474b66",
  Green: "#2c5140",
  Mint: "#a6f0b4",
  Lavender: "#c3bdf5",
  Violet: "#a64dff",
  Peach: "#e9b7a0",
  Gold: "#d9a441",
};

window.LIBRARY = [
  {
    id: "doss-ribbon-hero",
    title: "Monochrome Ribbon Hero",
    project: "DOSS",
    category: "Hero",
    tone: "Dark",
    styles: ["Monochrome", "3D Render", "Monospace Type", "Minimal"],
    colors: ["Black", "Gray", "White"],
    palette: ["#0a0a0a", "#1c1c1c", "#5e5e5e", "#a8a8a8", "#ededed"],
    mood: ["Premium", "Industrial", "Futuristic"],
    images: ["doss-ribbon-hero.png"],
    brief:
      "Full-bleed dark hero where a single matte-gray 3D ribbon folds diagonally across the frame behind a centered wordmark. There's no headline or CTA, just the logo and small monospace labels pinned to the four corners like a technical spec sheet. It feels confident because it's so restrained: one material, one light source, and faint grid lines and dust particles that give the black depth.",
    prompt:
      "Minimal dark website hero, a single wide matte gray 3D ribbon folding in diagonal loops across a pure black background, soft top-down studio lighting, subtle film grain and tiny floating dust particles, faint thin grid lines, bold geometric white wordmark centered, small white monospace uppercase labels in the corners, monochrome, premium industrial tech aesthetic, octane render, 16:9",
    notes: "Corner-anchored mono labels give it an editorial frame without needing any copy.",
    added: "2026-09-22",
  },
  {
    id: "doss-product-cards",
    title: "Isometric Product Cards, Hover States",
    project: "DOSS",
    category: "Component",
    tone: "Dark",
    styles: ["Dark UI", "Isometric Line Art", "Pixel Mosaic", "Monospace Type"],
    colors: ["Black", "Gray", "Blue"],
    palette: ["#000000", "#161616", "#2a2a2a", "#8a8782", "#2f5bff"],
    mood: ["Technical", "Precise", "Premium"],
    images: ["doss-product-cards-1.png", "doss-product-cards-2.png", "doss-product-cards-3.png"],
    brief:
      "A three-up product card row (ARP / IDP / DataStudio) on near-black. Each card holds a thin-line isometric cube diagram. On hover, that card's diagram animates into something richer and a single electric-blue accent appears: an orbiting cube, a dashboard grid, a rising bar chart. A mosaic of gray pixel blocks fades out behind the cards. Blue shows up only on the active state, so the interaction feels earned.",
    prompt:
      "Dark UI product card grid, three cards side by side on black, each with a thin white isometric wireframe cube illustration on a subtle line grid, one card highlighted with an electric blue accent element, small monospace product labels and gray body text, background of fading gray square pixel mosaic blocks, precise technical enterprise software aesthetic, flat vector, 4:3",
    notes: "Three frames show the hover state of each card. Idea to reuse: accent color only on interaction.",
    added: "2026-09-22",
  },
  {
    id: "doss-full-page-scroll",
    title: "Full-Page Scroll with Isometric Sections",
    project: "DOSS",
    category: "Full Page",
    tone: "Dark",
    styles: ["Dark UI", "Isometric Line Art", "Wireframe Grid", "Pixel Mosaic"],
    colors: ["Black", "Gray", "White"],
    palette: ["#000000", "#141414", "#232323", "#6b6b6b", "#e6e6e6"],
    mood: ["Technical", "Structured", "Calm"],
    images: ["doss-full-page-scroll.png"],
    brief:
      "A long-scroll homepage built as a vertical rhythm of 'manage / transform / analyze' sections. Each section pairs a short headline and paragraph with a large white-line isometric cube sitting on a perspective grid. A left-hand tab rail switches between products. The page is almost entirely black and white, and the repeated cube motif turns the product story into one continuous visual system.",
    prompt:
      "Full-length dark SaaS landing page layout, black background, repeated sections each featuring a large white thin-line isometric cube sitting on a receding perspective line grid, small white sans-serif headlines and gray paragraphs, left vertical tab navigation, fading gray pixel squares at the page edges, clean enterprise tech aesthetic, vertical composition, 9:16",
    notes: "Good reference for keeping a long page coherent with one illustration motif.",
    added: "2026-09-22",
  },
  {
    id: "doss-orbit-diagram",
    title: "Orbital Platform Diagram",
    project: "DOSS",
    category: "Illustration",
    tone: "Dark",
    styles: ["Line Art", "Monochrome", "Space", "Monospace Type"],
    colors: ["Black", "Gray", "White"],
    palette: ["#000000", "#0f0f0f", "#3a3a3a", "#9a9a9a", "#f2f2f2"],
    mood: ["Futuristic", "Cinematic", "Calm"],
    images: ["doss-orbit-diagram.png"],
    brief:
      "A 'solar system' metaphor for a platform: a white-edged cube (ARP) at the center, with thin elliptical orbits carrying pill-shaped module labels like 'Warehousing' and 'Subscriptions'. Soft light streaks at the corners suggest a lens flare in deep space. Mono labels frame the composition. It turns an abstract feature list into a single memorable image.",
    prompt:
      "Minimal black space scene, a small dark 3D cube with white edges and logo at center, several thin white elliptical orbit rings around it at different angles, small glowing spheres and frosted pill-shaped labels riding the orbits, soft diffused white light streaks at the corners like a lens flare, tiny distant stars, monochrome, cinematic tech aesthetic, 4:3",
    notes: "Orbits with labeled pills are a nice way to show modules around a core product.",
    added: "2026-09-22",
  },
  {
    id: "doss-light-features",
    title: "Light Editorial Feature Grid",
    project: "DOSS",
    category: "Section",
    tone: "Light",
    styles: ["Editorial", "Swiss Grid", "Minimal", "Light UI"],
    colors: ["Warm Neutral", "Gray", "Black"],
    palette: ["#e9e7e3", "#d9d6d0", "#9b9892", "#3a3936", "#141414"],
    mood: ["Calm", "Confident", "Clear"],
    images: ["doss-light-features.png"],
    brief:
      "The light counterpart to the dark brand pages. A warm off-white canvas with visible dashed layout guides, a large two-line statement headline, and three feature rows. Each row has an icon and short title on the left and a bolded lead sentence plus gray body text on the right. The visible grid lines make it feel architectural and precise while staying quiet.",
    prompt:
      "Light editorial website section, warm off-white background, visible thin dashed layout grid lines, large black two-line sans-serif headline, three feature rows each with a small line icon and short bold title on the left and a paragraph of gray text on the right, generous whitespace, Swiss typographic grid, calm minimal enterprise aesthetic, 4:3",
    notes: "Showing the layout guides as a visual element is the move here.",
    added: "2026-09-22",
  },
  {
    id: "doss-mobile-mockup",
    title: "Mobile Mockup on Green Velvet",
    project: "DOSS",
    category: "Device Mockup",
    tone: "Dark",
    styles: ["Lifestyle Photography", "Device Mockup", "Dark UI"],
    colors: ["Green", "Black", "Blue"],
    palette: ["#1f3b2f", "#2c5140", "#0e0e0e", "#2f5bff", "#d8c3a5"],
    mood: ["Warm", "Premium", "Human"],
    images: ["doss-mobile-mockup.png"],
    brief:
      "A hand holds an iPhone showing the dark mobile site against a deep emerald velvet sofa. The rich, tactile green warms up an otherwise cold, techy brand, and the blue isometric cubes on screen pop against it. The brand's corner mono labels are carried into the photo so it still reads as part of the site.",
    prompt:
      "Lifestyle product photo, a hand holding a modern black smartphone displaying a dark website with bright blue isometric cubes, resting against a deep emerald green velvet sofa, soft natural window light, shallow depth of field, rich texture, warm and premium, small white monospace labels overlaid in the corners, editorial photography, 4:3",
    notes: "Contrast pairing: cold UI with a warm, tactile setting.",
    added: "2026-09-22",
  },
  {
    id: "aicm-glass-hero",
    title: "Frosted Glass & Neon 3D Hero",
    project: "AICM",
    category: "Hero",
    tone: "Light",
    styles: ["3D Render", "Glassmorphism", "Soft Light", "Light UI"],
    colors: ["White", "Lavender", "Violet", "Gold"],
    palette: ["#f1eff6", "#dcd8e8", "#a64dff", "#1b1a4b", "#d9a441"],
    mood: ["Airy", "Premium", "Futuristic"],
    images: ["aicm-glass-hero-1.png", "aicm-glass-hero-2.png", "aicm-glass-hero-3.png"],
    brief:
      "A bright, sunlit 3D scene sits under a bold navy headline. Frosted-glass tubes and rings wind between white concrete slabs, with a hot-violet neon glow leaking from the seams and a single gold coin traveling through the path. Hard window-light shadows add realism and warmth. The three frames show the scroll animation as the coin moves through the scene.",
    prompt:
      "Bright minimal 3D render, frosted translucent glass tubes and rings curving between white speckled concrete blocks, glowing violet neon light emanating from the gaps, a single shiny gold coin rolling along the glass path, strong soft sunlight casting leaf and window shadows, lavender white palette, clean airy premium tech aesthetic, space for bold navy headline on the left, octane render, 16:10",
    notes: "Three frames show scroll progression. Sunlight shadows keep the 3D from looking sterile.",
    added: "2026-09-22",
  },
  {
    id: "clue-gradient-type-hero",
    title: "Holographic Gradient Type Hero",
    project: "Clue",
    category: "Hero",
    tone: "Dark",
    styles: ["Dark UI", "Gradient", "Outline Type", "Fluid Lines"],
    colors: ["Black", "Mint", "Lavender"],
    palette: ["#000000", "#9ef0a8", "#b7b5f5", "#d9d4ff", "#ffffff"],
    mood: ["Confident", "Playful", "Techy"],
    images: ["clue-gradient-type-hero.png"],
    brief:
      "Giant condensed headline ('Never lose your secrets') where the letters fade from a mint-to-lavender holographic gradient into hollow outlines, as if the words are vanishing. That's a clever nod to the product. A single fluid ribbon and hairline loops weave through the type. Below, a logo strip and a pastel gradient stats card bring the same palette down the page.",
    prompt:
      "Dark website hero, black background, huge uppercase sans-serif headline where letters transition from a mint green to lavender holographic gradient fill into thin white outline strokes, a translucent iridescent ribbon and thin white fluid line loops weaving through the text, mint green pill button, clean modern developer tool aesthetic, 4:3",
    notes: "Fill-to-outline type as storytelling. Mint + lavender on black is a fresh combo.",
    added: "2026-09-22",
  },
  {
    id: "tae-mountain-hero",
    title: "Misty Mountain Photo Hero",
    project: "TAE",
    category: "Hero",
    tone: "Dark",
    styles: ["Full-Bleed Photography", "Expressive Display Type", "Nature"],
    colors: ["Slate", "Green", "Peach", "White"],
    palette: ["#3b3f56", "#5a5e7a", "#2c3a2e", "#e9b7a0", "#f2eee8"],
    mood: ["Serene", "Adventurous", "Moody"],
    images: ["tae-mountain-hero.png"],
    brief:
      "A travel/adventure hero built on one moody photograph: a snow peak catching peach alpenglow above fog and dark pines. The headline is set in a wide, quirky display face in off-white, centered and all caps, with a small ghost-button eyebrow above. A circular rotating-text badge with an arrow at the bottom invites the scroll. The photo carries the emotion and the type adds personality.",
    prompt:
      "Cinematic landscape photo for a website hero, snow-capped mountain peak glowing with soft peach alpenglow at dusk, rolling fog below, silhouettes of dark evergreen pines in the foreground, muted slate blue and deep forest green tones, moody atmospheric haze, centered space for large off-white display typography, 4:3",
    notes: "Circular text badge + arrow is a nice scroll cue.",
    added: "2026-09-22",
  },
  {
    id: "emhance-tablet-hero",
    title: "Blurred Mint Gradient on Tablet",
    project: "Emhance",
    category: "Device Mockup",
    tone: "Light",
    styles: ["Blur Gradient", "Large Type", "Device Mockup"],
    colors: ["Mint", "Lavender", "Slate"],
    palette: ["#b9f2c9", "#8fa3f0", "#6c77d9", "#1b1f5e", "#1a1f24"],
    mood: ["Calm", "Human", "Techy"],
    images: ["emhance-tablet-hero.png"],
    brief:
      "A tablet held up against a deep indigo backdrop shows a hero where the background is a heavily blurred, thermal-looking silhouette of a person gaming, in mint and periwinkle. Large dark sans-serif copy runs across the top, and key words ('research hub') sit in soft frosted pills. The blur hints at emotion and face tracking without showing anything literal.",
    prompt:
      "Hands holding a tablet against a deep indigo gradient background, the screen shows a heavily blurred abstract silhouette of a person in soft mint green and periwinkle blue like a thermal camera image, large dark sans-serif headline text across the top with a few words highlighted in frosted glass pills, small dark button bottom left, calm human-centered tech aesthetic, 5:4",
    notes: "Abstracted blur as a stand-in for sensitive imagery (faces, data).",
    added: "2026-09-22",
  },
];
