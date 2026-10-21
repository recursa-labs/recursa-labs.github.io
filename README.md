# recursa labs

Landing page for recursa labs: https://recursa-labs.github.io

## Local preview

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Static HTML, CSS, and JavaScript. GitHub Pages publishes the root of `main`.

Edit `index.html`, `styles.css`, and `app.js`. Assets and font licenses live in `assets/`.

## Blog

Articles live in `blog/<slug>/index.html`; diagrams live in `assets/blog/`.
Edit the article HTML directly. Keep its title, description, reading time, and
series links consistent with the listings in `blog/index.html` and the Blog
section of the root `index.html`. The static blog index and articles work
without JavaScript. Article pages share `styles.css` with the landing page.

The October 2026 series reports the team's 25-game experiment result. Run
artifacts were not available during authoring; no synthetic result charts were
created. Update the experimental post when supporting artifacts are ready.
