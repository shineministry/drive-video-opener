# Instant Video Player

Open `index.html` and **your video starts playing immediately**, full screen,
with **sound** — nothing else. No intro, no landing page, no menus.

## Video source (first one that exists wins)

1. `?v=<url>` — any hosted video: `index.html?v=https://example.com/my-video.mp4`
2. `video_hd.mp4` — the re-encoded HD version (see below)
3. `../../The.Sound.of.Music. (1965) [580p].mp4` — the local file next to the
   project folder (plays instantly when you open the page on your computer)
4. `video.mp4` — drop any MP4 next to `index.html` as a portable default

Native controls give you seek/volume/fullscreen/subtitles; `Space` toggles
play/pause.

## Sound: never muted

The player never mutes the video. Unmuted autoplay is attempted right away —
when the browser allows it, you get picture **and** sound on load. If the
browser's autoplay policy blocks playback, the video waits on its first frame
and the *Tap for sound* pill appears — the first tap starts it with sound.
(Older pages used muted autoplay + a tap-to-unmute pill; that is gone.)

## 200% audio (double volume)

Browsers cap the `volume` property at 1.0 (100%), so the player inserts a
Web Audio `GainNode` with **`BOOST = 2.0`** (200%) into the audio path.
To change the level, edit this line in `index.html`:

```js
const BOOST = 2.0;   // 2.0 = 200% / double volume, 1.5 = 150%, 1.0 = normal
```

Notes:
- The boost graph is only attached once the `AudioContext` is actually
  running (attaching it to a suspended context would silence the element);
  until then you hear the normal 100% volume, never silence.
- Boost applies to local/same-origin videos. A cross-origin `?v=<url>` video
  stays at 100% (routing it through Web Audio without CORS headers would
  silence it entirely).
- Doubling amplitude can clip (crackle) on already-loud parts — if you hear
  distortion, lower `BOOST` to ~1.5.

## HD video

The original is a 1280×580 web rip. `video_hd.mp4` is a background re-encode
that upscales to 1920×870 (lanczos + mild sharpening, H.264 CRF 17, audio
stream copied untouched) and sits first in the source list. To regenerate it:

```bash
ffmpeg -y -i "The.Sound.of.Music. (1965) [580p].mp4" \
  -vf "scale=1920:870:flags=lanczos,unsharp=5:5:0.45:5:5:0.08,format=yuv420p" \
  -c:v libx264 -preset veryfast -crf 17 -c:a copy -movflags +faststart video_hd.mp4
```

If `video_hd.mp4` is missing the player falls back automatically to the
original 580p file.

## Subtitles

English subtitles ship as `subtitles.vtt` (WebVTT) and are **on by default**,
timed for this 23.976 fps release — the opening *"The hills are alive"* lands
at 2:43, matching the video. Toggle them any time via the native controls'
subtitle menu. The file is a plain format conversion (SRT → WebVTT) of an
existing English subtitle track; cue timings and text are unchanged.

## About the public site

The GitHub Pages copy cannot read a file that lives on your computer, so it
shows a short "Video not available here" notice unless you launch it with
`?v=<url>` pointing at a video you have rights to host. Subtitles and all
player features work there the same way.

**No video files are committed to this repository** (`*.mp4` is git-ignored) —
keeps the repo tiny and avoids redistributing copyrighted media.

## License

[MIT](LICENSE)
