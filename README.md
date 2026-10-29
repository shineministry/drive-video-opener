# Instant Video Player

Open `index.html` and **your video starts playing immediately**, full screen —
nothing else. No intro, no landing page, no menus.

## Video source (first one that exists wins)

1. `?v=<url>` — any hosted video: `index.html?v=https://example.com/my-video.mp4`
2. `../../The.Sound.of.Music. (1965) [580p].mp4` — the local file next to the
   project folder (plays instantly when you open the page on your computer)
3. `video.mp4` — drop any MP4 next to `index.html` as a portable default

Sound starts muted because browsers require it for autoplay — click anywhere
(or the *Tap for sound* pill) to enable audio. Native controls give you
seek/volume/fullscreen; `Space` toggles play/pause.

## 200% audio (double volume)

Browsers cap the `volume` property at 1.0 (100%), so the player inserts a
Web Audio `GainNode` with **`BOOST = 2.0`** (200%) into the audio path.
To change the level, edit this line in `index.html`:

```js
const BOOST = 2.0;   // 2.0 = 200% / double volume, 1.5 = 150%, 1.0 = normal
```

Notes:
- Boost applies to local/same-origin videos. A cross-origin `?v=<url>` video
  stays at 100% (routing it through Web Audio without CORS headers would
  silence it entirely).
- Doubling amplitude can clip (crackle) on already-loud parts — if you hear
  distortion, lower `BOOST` to ~1.5.

## About the public site

The GitHub Pages copy cannot read a file that lives on your computer, so it
shows a short "Video not available here" notice unless you launch it with
`?v=<url>` pointing at a video you have rights to host.

**No video files are committed to this repository** (`*.mp4` is git-ignored) —
keeps the repo tiny and avoids redistributing copyrighted media.

## License

[MIT](LICENSE)
