# Progress Log

Running session log maintained by Claude Code. Newest entries first.

## 2026-10-01 - Smaller videos (A/B) and pptx removed from git

- **Done:**
  - Re-compressed the four channels into `assets/channels/*.small.mp4` (H.264 CRF 34, 30 fps; Bad Apple scaled to 720p): 46 MB in total vs 134 MB for the originals. CRF 34 looked nearly identical to the source in frame crops; CRF 28 only halved the size.
  - Added `assets/static-noise.js`, CRT static drawn live on a canvas (0 MB) to replace `static.mov`. Tuned against the clip: luminance 5/50/95th percentile 12/68/145 vs 8/60/152 for the clip, cool tint, rolling band. Its grain is a little finer and less clumpy than the clip's.
  - Originals are kept alongside for A/B testing. `face-config.js` has `tv.videos` ('small' | 'original') and `tv.static` ('generated' | 'video'). URL `?videos=...&static=...` overrides them, and the tuning panel has two buttons that reload with the other option and show the current mode. `manifest.js` channels gained a `small` field.
  - `preview.html` shows original vs small for each channel, and the static video next to the generated static.
  - Headless test, both modes: defaults download 55 MB, originals 152 MB. With the network cut, the static transition, channel playback, return to the face and the static burst all worked, with no errors.
  - Git: the repo (remote `Scub3d/ChaosCosplay-s-Project`, nothing pushed yet) had one commit containing the 170 MB pptx. Took it out of that commit (amended "Initial commit", now 62b2dfe), added `.gitignore` with `*.pptx`, and expired the reflog and gc'd so the blob is gone. The pptx stays on disk. Pack size is now 159 MB.
- **Decided:** Defaults are the small videos and the generated static. The originals are only an A/B option.
- **Note:** The user replaced `README.md` with a 2-line title, so the usage notes written earlier are no longer in the repo.
- **Next:** User commits the current changes and pushes. A/B on the iPad. If the small versions win, the original channel .mov files could be dropped from the repo (`smash64.mov` at 77 MB triggers GitHub's 50 MB warning).
- **Blocked/Open:** None.

## 2026-10-01 - Face page made to work without a steady connection

- **Done:** Voice trigger words are now off by default (`voice.enabled: false`); the code is kept and V / Select toggles it. `face.html` now downloads the transition and channel videos into memory (blob URLs) during the start screen, shows progress there and in the tuning panel, and plays them from memory. Added `tv.preloadChannels` (true by default, about 152 MB in total). Tested in headless Chrome: after the download, with the network cut, a channel still played and returning to the face worked, with no errors. Updated `README.md`. `manifest.js` now assigns to `self.FACE_MANIFEST` (same object in the page).
- **Decided:** At events the iPad has internet only for loading the page. The Bluetooth controller is the main mood control, and voice triggers are optional. No offline cache (service worker), because the page can be loaded online.
- **Next:** Test on the iPad: the in-memory download size is fine on the device, and the HEVC transitions play from blob URLs in Safari. Optional offline mood from tone of voice (shouting → angry).
- **Blocked/Open:** None new.

## 2026-10-01 - iPad face page built

- **Done:** Built `face.html`, the iPad face page, with settings in `face-config.js` and usage notes in `README.md`.
  - Mic loudness picks the mouth frame (closed through most open) in the current mood's set. It uses a noise floor learned at start, open/close hysteresis and a minimum frame time.
  - Mood can be set from a gamepad (Gamepad API), a Bluetooth keyboard/clicker, or trigger words via Safari speech recognition. A voice mood lasts 10 s, then returns to the controller's mood.
  - TV modes: channel cycling through a static transition, colour bars, static burst.
  - Set1's tongue frame flashes now and then when quiet. Double-tap opens the tuning panel.
- Tested in headless Chrome with a fake mic and a fake speech recogniser. The mouth reacts to the fake mic's beeps. Mood keys, trigger words (only newly heard words fire), channels, bars and the idle tongue all work, with no console errors. **Not yet tested on an iPad.**
- **Decided:** Guessed moods: set5 = neutral (default), set4 = angry, set3 = sad, set2 = happy, set1 = flustered. Added default trigger words for each. Mood mapping and triggers live in `face-config.js`.
- **Next:** Host on HTTPS (GitHub Pages) and test on the iPad with the USB mic. Check that speech recognition and the mic stream work together in iOS Safari, and check the controller's button indices. Friend to confirm the moods. Possible next feature: a tone-based mood (shouting → angry).
- **Blocked/Open:** Whether iOS Safari lets speech recognition and the getUserMedia mic run at the same time.

## 2026-10-01 - Face assets extracted into the repo

- **Done:** Pulled everything from `TennaFaces.pptx` into `assets/`.
  - `mouths/setN-<look>/` holds the poses as transparent PNGs, ordered `0.png` = closed up to most open (set1 also has `extra-tongue.png`), plus the original `source-loop.mov`.
  - `transitions/` has `color-bars-glitch.mov` and `static.mov`.
  - `channels/` has `smash64`, `rickroll-deltarune`, `dvd-logo` and `bad-apple` (.mov).
  - `manifest.js` describes the sets: frame order, original loop order, 6 poses/s, video info.
  - `theme.css` holds `--screen-bg` (default `#DBE8F5`, the brightest part of the static clip scaled to near white).
- Added `preview.html` (repo root): it shows every set animating on its original loop, all frames, and the videos, with a colour picker for the screen colour. Checked it in headless Chrome. Removed the earlier `faces/` folder. The pptx is left untouched.
- **Decided:** The iPad is the final hardware. The screen background is a CRT-static white set in one CSS variable. Sets are named by how they look until the moods are confirmed. Transparency was removed by unmixing against a fixed 3-colour palette (light purple, dark purple, red). The white inside the open mouths is now transparent too, so it shows the screen colour.
- **Next:** Friend views `preview.html` and names the mood for each set. Then build the iPad face page: mic-level lip sync, controller/keyboard mood switching, experimental voice mood.
- **Blocked/Open:** Mood names per set.

## 2026-10-01 - TennaFaces.pptx contents review

- **Done:** Unpacked `TennaFaces.pptx` (170 MB, 4:3, 12 slides, no text). Slides 1-5 are mouth-only loops (1440x1080 HEVC, 20 s). Each one cycles 2-5 drawn poses at 6 poses/s. The embedded audio does not follow the mouth (correlation about 0). Slide 6 is glitchy colour bars, slide 7 is blank, slide 8 is TV static. Slides 9-12 are joke videos: Smash 64 gameplay, a Rickroll/Deltarune mashup (has profanity on screen), the bouncing DVD logo, and Bad Apple. Extracted all 17 distinct mouth poses as full-res PNGs into `faces/` (`slideN_poseM.png` plus `_overview.jpg`).
- **Decided:** Nothing yet. User now says the face runs on an iPad with a USB mic through a powered hub. Earlier notes had the iPad dropped for cost.
- **Next:** Confirm the mood names for slides 1-5 with the friend, and the background colour (frames are on white). Order each set's poses closed-to-open. Then adapt `mouth-test.html` to swap PNGs by mic level, add emotion switching from a Bluetooth controller (Gamepad API) or keyboard remote, and try voice-based mood detection as an experiment.
- **Blocked/Open:** Is the iPad the final hardware? Which mood is each slide?

## 2026-09-14 - Surface Pro 6 touch assembly dimensions check

- **Done:** Searched for the outline of the Surface Pro 5/6 LP123WQ1 touch screen assembly. Verified the bare panel at 265.38 x 183.49 mm (active 259.78 x 173.19 mm, 60-pin 4-lane eDP, 440 nits). No vendor or datasheet publishes the glass assembly outline or thickness; best estimate is ~290 x 199 mm from the 292 x 201 mm tablet body. Added a section to `display-options.md`.
- **Decided:** Nothing new. The assembly is likely ~10 mm too long for the 280.6 mm slot and still has the 60-pin board problem, so Option 1 (P130ZFA-BA1) stands.
- **Next:** If the Surface assembly is still of interest, ask a seller for a caliper measurement of the glass, or measure a Surface Pro 5/6 in hand.
- **Blocked/Open:** Assembly thickness unknown.
- **Done (later):** User gave the printed face-plate window: 254 x 191 mm (4:3). Checked every candidate's active area against it and added the results to `display-options.md`. Only the iPad Pro 12.9" 3rd/4th gen (262.9 x 197.2 lit) covers it as printed; the P130ZFA-BA1 is 8 mm short on height. Also recorded that the LP123WQ1 pin count is disputed (60 in datasheet-style listings, 40 in LCDOLED reseller listings).
- **Decided:** Nothing yet. Choice pending: iPad Pro with the current print, or P130ZFA-BA1 with the window reprinted at ~274 x 183 mm (3:2).
- **Done (later):** Checked the idea of replacing the Pi + camera + inner display with an iPhone 17 Pro + USB-C endoscope + powered hub. Finding: generic USB (UVC) webcams do not work on iPhone (Apple staff confirm it is iPad-only), but the user's own USB-C endoscope works via its vendor app, so the plan is viable; charging through a PD pass-through hub is fine. To test: camera through the hub while charging, and FoV/lag for walking. Wrote a section in `display-options.md` with working alternatives (USB-C iPad mini as inner display, keep the Pi, WiFi camera, custom WebRTC from the outer iPad's camera). Also noted iPad Pro 1st/2nd gen body size (305.7 x 220.6 x 6.9) and 5th/6th gen fit (+0.5 mm depth, no reprint needed if the back is open).

## 2026-09-10 - Face display panel selection for the helmet slot

- **Done:** Researched laptop/tablet panels for the 280.6 x 214.9 x 5.9 mm slot; wrote `display-options.md` with Option 1 and the ranked alternatives. Added Option 2 (refurbished iPad Pro 12.9" 3rd/4th gen running a standalone Safari lip-sync page) and wrote `mouth-test.html`, a Web Audio mic-driven mouth animation test page with a tuning panel (script passes `node --check`; not yet run on a device). Appended two reference sections to `display-options.md`: Bluetooth remote for swapping animation sets (use a BLE HID keyboard-style remote; no Web Bluetooth in iOS Safari) and self-hosting the page from the Pi (built-in WiFi hotspot on 5 GHz, wired USB-C Ethernet alternative, power accessories, and the Safari HTTPS mic catch that favours doing voice detection on the Pi).
- **Decided:** Option 1 = Innolux P130ZFA-BA1 (13.0" 3:2, 280.75 x 196.82 x 3.0 mm, 2160x1440) with a 4-lane 30-pin eDP board flashed for it (VSDISPLAY VS-RTD2556HM-V1). Chosen because it matches the slot length within 0.15 mm and leaves the smallest gap on the short axis among panels that have a board. Option 2 = iPad Pro 12.9" 3rd/4th gen as the perfect-fit backup. iPad Pro bare LCD ruled out: no driver board exists.
- **Next:** Test `mouth-test.html` over HTTPS on an iPhone or iPad (GitHub Pages or local HTTPS) and tune thresholds; confirm with VSDISPLAY that the board can be flashed for P130ZFA-BA1 before buying the panel; pick the second display (HDMI1 / DSI / SPI) and power setup (12 V / 2 A for the board, 5 V / 3 A for the Pi).
- **Blocked/Open:** Board compatibility for P130ZFA-BA1 is unconfirmed by any vendor listing.
