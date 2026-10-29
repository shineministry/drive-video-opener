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

## About the public site

The GitHub Pages copy cannot read a file that lives on your computer, so it
shows a short "Video not available here" notice unless you launch it with
`?v=<url>` pointing at a video you have rights to host.

**No video files are committed to this repository** (`*.mp4` is git-ignored) —
keeps the repo tiny and avoids redistributing copyrighted media.

## License

[MIT](LICENSE)
