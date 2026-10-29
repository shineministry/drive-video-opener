# Drive — Video Opener

A single-page, **Google Drive–styled** interface that opens with a **full-screen video intro** the instant the page loads. When the video ends (or you hit *Skip intro*), it reveals a pixel-faithful recreation of the Drive web UI.

**Live demo:** https://shineministry.github.io/drive-video-opener/

> Unofficial demo — not affiliated with, endorsed by, or sponsored by Google.
> Google Drive is a trademark of Google LLC. The UI is recreated for
> educational / demonstration purposes only.

## Features

**Video opener**
- Plays instantly on page load (muted autoplay, works in every modern browser)
- *Skip intro* button, sound toggle, progress bar, `Esc` to skip
- Auto-fades into the Drive interface when the video ends
- Fallback chain (first playable source wins):
  1. `?video=<url>` — any hosted MP4, e.g. `index.html?video=https://example.com/intro.mp4`
  2. `opener.local.mp4` — drop your own file next to `index.html` (git-ignored)
  3. `assets/opener.mp4` — bundled sample, so it plays for every visitor online
- `?nointro=1` skips the opener entirely

**Drive interface**
- Top bar: hamburger, Drive logo, search with live filtering, mic/help/settings/apps/avatar
- Left rail: **New** menu (folder / uploads / Docs / Sheets / Slides), My Drive,
  Shared with me, Recent, Starred, Trash, storage meter
- **Suggested** carousel, grid **and** list views (toggle in the header)
- Sortable list columns (Name / Owner / Modified / File size)
- Right-click context menu, double-click preview modal, Details pane, snackbars
- Responsive: the sidebar collapses into a drawer on narrow screens

## Run locally

Just open `index.html` in a browser — no build step, no server required.

To use your own opener video, either:

```text
index.html?video=https://your-hosted-video.mp4     # online
copy my-video.mp4 opener.local.mp4                 # local (never committed)
```

## Project layout

```text
index.html          # everything: markup, CSS, JS
assets/opener.mp4   # bundled sample opener
README.md
LICENSE             # MIT (code)
```

## Credits

- Bundled sample opener: **Sintel** trailer © Blender Foundation —
  [durian.blender.org](https://durian.blender.org), licensed
  [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- Google Drive logo and UI are property of Google LLC, used here only to
  identify the interface being demonstrated.

## License

Code: [MIT](LICENSE).
