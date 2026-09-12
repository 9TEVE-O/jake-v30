# JAKE v30.0.0

A birthday release disguised as a tiny web app.

## Run it

No build step. No dependencies.

Open `index.html` directly, or run a tiny local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select `main` and `/ (root)`.
4. Save.

The site is plain HTML, CSS and JavaScript. The birthday hero photo is embedded directly in `index.html` so the live build has no image-path dependency. The airhorn is synthesised in the browser with Web Audio; there is no copyrighted audio file.

## Files

- `index.html` — birthday experience, copy and embedded hero image
- `styles.css` — layout, responsive design and animation
- `script.js` — boot sequence, airhorn, confetti and developer-mode test
- `30-for-30.md` — hidden coding/ChatGPT/GitHub birthday extra

## Jake

If you're reading this because you opened the repository instead of just looking at the card: correct.

Fork it. Break it. Improve it.
