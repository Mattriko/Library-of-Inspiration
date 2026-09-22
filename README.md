# Inspiration Library

Open `index.html` in your browser. No install or server needed.

## Files
- `index.html`: the app
- `library.js`: **all the content.** Edit this file to add or change entries.
- `images/`: full-size images
- `images/thumbs/`: smaller copies for a faster grid (optional)
- `app.js`, `styles.css`: app code

## Adding a new piece
1. Put the image in `images/` with a short name, e.g. `images/acme-hero.png`.
2. Optional: make a thumbnail (macOS Terminal, from this folder):
   `sips -Z 1000 -s format jpeg images/acme-hero.png --out images/thumbs/acme-hero.jpg`
3. In `library.js`, copy any entry, paste it at the top of `LIBRARY`, and fill in the fields.
   New styles and moods show up in the filters automatically. Colors should use the names in `COLOR_FAMILIES`,
   and category should be one of `CATEGORIES`. You can add to either list.
4. Refresh the browser.

For multiple frames or states of one design, list every file in `images: [...]`.
