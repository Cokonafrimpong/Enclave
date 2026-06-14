# Image Replacement Guide — The Enclave Website

All images below are referenced in index.html via `data-placeholder=""` attributes.
Drop your files into this `images/` folder with the exact filenames listed below,
then update each `.img-block[data-placeholder="..."]` CSS rule in style.css to use:

  background-image: url('../images/your-filename.jpg');

---

## REQUIRED IMAGES

| Filename | Used In | Recommended Shot |
|---|---|---|
| `hero-aerial-coastal.jpg` | Hero (full-screen bg) | Aerial drone — wide view of Gomoa Fetteh coastline or beach. Golden hour preferred. Min 2400×1400px. |
| `feature-masterplan-view.jpg` | Feature Split (right col) | Rendered bird's-eye masterplan, or aerial of the 305-acre site. Min 1200×1400px. |
| `highlights-waterfront.jpg` | Highlights card 1 (tall left) | Waterfront promenade, marina, or beach. Vertical crop. Min 900×1400px. |
| `highlights-residential.jpg` | Highlights card 2 (top right) | Residential architecture render or gated street view. Landscape. Min 900×700px. |
| `highlights-greenspace.jpg` | Highlights card 3 (bottom right) | Lagoon, park, or green corridor. Landscape. Min 900×700px. |
| `banner-coastal-aerial.jpg` | Banner (full-width dark) | Wide dramatic aerial of the coast — ideally moody/overcast or golden. Min 2400×1200px. |
| `vision-lifestyle-coastal.jpg` | Vision section (right col) | Lifestyle — people enjoying the community, coastal social scene. Min 1200×1400px. |
| `footer-coastal-dusk.jpg` | Footer (full-width bg) | Dusk or dawn aerial of coastline. Dark/moody. Min 2400×1200px. |

---

## HOW TO ACTIVATE AN IMAGE

In `css/style.css`, find the matching rule and add `url()`:

```css
/* Example: activating the hero image */
.img-block[data-placeholder="hero-aerial-coastal.jpg"] {
  background-image: url('../images/hero-aerial-coastal.jpg');
  /* Keep the gradient as a fallback below the url() */
}
```

The existing gradient backgrounds serve as placeholders until real images are added.

---

## IMAGE TIPS

- Use WebP format for best performance (rename accordingly)
- Compress to ~85% quality — most images should be under 500KB
- Hero and banner: prioritize wide, cinematic crops (16:9 or wider)
- Residential and highlights: both portrait and landscape work
- All images should feel premium, calm, and coastal in tone
