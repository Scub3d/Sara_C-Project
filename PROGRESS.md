# Progress Log

Running session log maintained by Claude Code. Newest entries first.

## 2026-10-18 - Sad mood, friend's iPad feedback

- **Done:**
  - New **sad** mood from the artist's frames, renamed to `sad/0-4.png`, ordered closed → open (originals Illustration57_5, 1, 3, 2, 4). Key 6, left-stick click (L3). Triggers: sad, oh no, sorry, so sad, unfortunately, boo.
  - Each mood's name is now a trigger word (happy, neutral, surprised, smug, sad), plus "normal", "ok" (Safari writes "okay" as "ok"), "omg", "oh my god", "thanks". "Thank you" stays on happy.
  - Fixed: a trigger word said a second time sometimes didn't fire. Safari reuses a result slot for a new phrase, and the old count stayed. Counts now drop as well as rise. This (and "ok" not matching "okay") is the likely cause of "hard to switch back to neutral".
  - Voice "error", "technical difficulties" or "please stand by" bring up the colour bars (`voice.colorBars` in face-config.js). Any mood word goes back to the face.
  - The voice log now shows which word fired what.
  - README: sad added; the smug pose is described as the flat sideways line; the bars voice words are listed.
  - Tested the matching in node, and face.html and README.html load headless with no errors. Not tested on the iPad.
- **Next:** Push, then have the friend retest on the iPad: "happy", "neutral"/"okay" after "omg", "error", and the sad mood. Confirm the sad frame order looks right while talking.

## 2026-10-16 - Voice diagnostics: event log, restart-loop cap, lip-sync-off test

- **Done:** On the friend's iPad, after the dropRec fix went live, the button was stuck on "restarting". Recognition is ending straight away each time, and the error was overwritten by "restarting". Now:
  - The last error is kept (`restarting (last error: …)`).
  - The panel has a "voice log" line with the last 8 events and their times.
  - After 4 ends in a row within 2 s with nothing heard, voice stops with `error: keeps stopping straight away (<error>)`.
  - Added a panel button, "Test: voice without lip-sync". It stops the getUserMedia track, then starts voice, to test whether the lip-sync mic blocks recognition.
  - Simulated in node. Not tested on the iPad.
- **Next:** Get the voice log text from the iPad, with and without the lip-sync test. If voice only works with lip-sync off, the two need one mic between them (e.g. pause lip-sync while listening, or find another approach).

## 2026-10-16 - Voice button fix

- **Done:** The user reported that Voice on/off doesn't work on the deployed site. Found a bug: Safari doesn't always fire `onend` after a recognition error, so `rec` stayed set and every later start returned early, doing nothing. Added `dropRec()`, which detaches and aborts the old recogniser on stop, on fatal errors and before each start. The button label now shows the state (on/listening/restarting/error). A refused restart after voice had worked says "tap Voice to turn it back on" instead of pointing at Settings. Tested with a fake recogniser in node (error with no onend, then taps); not tested on the iPad.
- **Next:** On the iPad, tap Voice and report the button text and the panel's voice/heard lines. If it says `audio-capture`, the lip-sync mic may be blocking recognition. If it says `service-not-allowed`, Siri & Dictation is off, or the Home Screen app isn't allowed speech recognition.

## 2026-10-16 - Published to GitHub Pages, Commissioned faces only

- **Done:**
  - Removed the Existing style from face-config.js, manifest.js, README.html and preview.html. The "Switch faces" button hides itself when there's only one style.
  - `assets/faces/Existing/` is now in `.gitignore` (kept on disk, not published). It's still in the earlier commits' history.
  - Removed the joke channel videos (Smash 64, Rickroll, DVD logo, Bad Apple): `channels` is empty in manifest.js, the next-channel control is gone, `assets/channels/` is in `.gitignore`. The colour bars and static stay.
  - Added `index.html` (redirects to face.html) and `.nojekyll` for GitHub Pages.
  - Headless check: face.html, README.html and preview.html load with no script errors.
- **Next:** Turn on Pages in the repo settings (main branch, root). The repo must be public unless the account has GitHub Pro.

## 2026-10-13 - Session wrap-up: where things stand

- **Done:** Log saved at the end of the 2026-10-12 session. Nothing changed in the code since the entry below.
- **State:**
  - The face runs from a Home Screen icon on the iPad.
  - Two face styles: Commissioned (default) and Existing, swapped with F, RB/R1 or the panel.
  - Tuning panel: large touch controls, plus full-screen and Add to Home Screen helpers.
  - README.html is the wearer's guide. `node serve.mjs` serves the folder on the network for testing. `Tenna-Face.zip` is the packaged copy.
- **Confirmed by the user on the iPad:**
  - The face size and fit look right.
  - The panel responds to taps.
  - The bottom bar was gone when html/body were set to 100vh. After that fix was restored, along with the scroll snap-back and the bigger sliders, the user hasn't reported back yet.
- **Next:**
  1. On the iPad, confirm the bottom bar stays gone and the panel still responds with the latest version. If taps go off, the panel's "page scroll" should read 0/0.
  2. Retry the trigger words in Safari or the Home Screen app, turning voice on with the panel button, and report the panel's voice/heard lines. Earlier testing may have been in Firefox.
  3. The wearer picks Commissioned or Existing, and confirms the Commissioned frame order (closed → open) and the surprised/smug uses for the extra poses.
  4. Commit. Everything since 2658a0c is uncommitted.
- **Blocked/Open:**
  - The trigger words on the iPad aren't diagnosed yet.
  - Safari's full-screen ✕ and the iPadOS status bar, home indicator and multitasking dots can't be hidden by a web page. The Home Screen icon avoids the ✕ only.

## 2026-10-12 - README updated, project zipped

- **Done:**
  - README.html: added the panel's "page scroll" readout, finger-drag sliders, troubleshooting for panel taps not responding, a note on the test server's certificate, and Home Screen app notes.
  - Built `Tenna-Face.zip` in the repo root (212.5 MB, 65 files, all in a `Tenna-Face/` folder) and added `*.zip` to `.gitignore`. Left out `.git`, `.cert` (the test server's private key) and `TennaFaces.pptx` (170 MB; its contents are already in `assets/`).
  - Unzipped a copy and ran it from disk: the face starts, moods and the style swap work, README tables render, no errors.
- **Decided:** Kept the original channel .mov files in the zip, since the A/B option still uses them.
- **Next:** Nothing is committed yet: everything since 2658a0c is uncommitted, including the Existing faces move, Commissioned faces, README.html, serve.mjs and the icon. Commit when the user asks.

## 2026-10-12 - Add to Home Screen helper; home-screen mode fixes

- **Done:**
  - Added an "Add to Home Screen…" panel button. A page can't start Add to Home Screen itself (WebKit 255716), so the button leaves full screen, shows the 3 steps with a "Share button is up here ↗" pointer, and offers "Try the share sheet" (`navigator.share`). It is hidden when the face runs from the Home Screen. Added `assets/icon-180.png` (a crop of Commissioned happy/4) and an apple-mobile-web-app-title.
  - The user added the face to the Home Screen and reported a white bar at the bottom and a dead "Tap to start". Likely cause of the dead button: for about a minute a stray `else` from my edit broke the page script, and the server serves files live. Fixed.
  - Now, script errors show in red on the start screen, the start button shows "Starting…", and the mic gets a 15 s timeout with an explanation on failure.
  - White bar: a known iOS home-screen-app height bug (WebKit 237961/316008). In home-screen mode an `html.standalone` class sizes html/body and the face, TV, noise and start layers with `100vh`.
  - Headless tests pass: simulated home-screen mode with the mic denied, the full-screen and Add to Home Screen buttons, and trigger words. README.html troubleshooting has rows for both issues.
  - Follow-up: visuals were fixed, but the panel stopped responding to taps in home-screen mode. Probable cause: `height: 100vh` on html/body made the page about a status bar taller than the window, iOS scrolled it, and taps on fixed elements landed off target. Fix: only the fixed layers get 100vh; a scroll listener snaps the page back to 0,0; the panel respects the top safe area and scrolls internally if it's too tall. Simulated home-screen touch test: page not scrollable, panel buttons work.
  - Second follow-up: with only the layers at 100vh the panel worked but the bottom bar came back. So html/body 100vh is what removes the bar. Restored it (plus `overscroll-behavior: none`) and kept the scroll snap-back, now also on touchend and visualViewport scroll; the first time there was no snap-back. Added a "page scroll" readout to the panel (should stay 0/0). Panel sliders are now full-width, 44 px tall touch targets with 34 px thumbs; buttons are at least 44 px tall; panel width up to 460 px. Touch-drag test passes.
- **Next:** On the iPad, fully close and reopen the Home Screen face. Check the bottom bar is gone, start works and the panel responds. If taps go off again, read the panel's "page scroll" value. If the bar remains, re-add the icon.
- **Blocked/Open:** Not verified on a device yet.

## 2026-10-12 - Face fit fix and full-screen button

- **Done:**
  - Commissioned faces now use `fit: 'contain'` instead of `cover`. With Safari's toolbars the screen is wider than 4:3, so `cover` cropped the bottom lip (user report).
  - Added an "Enter/Exit full screen" button to the tuning panel. It uses the Fullscreen API, with a webkit fallback for older Safari, and the label follows the full-screen state.
  - Updated README.html (start steps, panel table, troubleshooting).
  - Headless test at 1180x740: whole mouth visible, toggle works, no errors.
  - Trigger words: the user reported they don't work. The code passes a fake-recogniser test (haha → happy, shut up → angry, oh no → sad in Existing), so the cause is on the iPad. Asked for the panel's voice/heard lines.
  - The user found full screen fails in Firefox on the iPad. My understanding (not verified on a device): every iPad browser runs on WebKit, and apps like Firefox don't turn on full screen for web pages, so it only works in Safari. The error text now says to use Safari or Add to Home Screen, and README.html says Safari is required.
  - The user wanted the full-screen ✕ and the "tray items" hidden. From searching: Safari's full-screen ✕ can't be hidden by a page (Apple declined; WebKit bugs 264216 and 272392 are open). The iPadOS status bar, home indicator and multitasking dots have no web API either. The full-screen button is now hidden when the face is opened from a Home Screen icon (`navigator.standalone` / display-mode standalone), where there's no Safari ✕. README.html recommends Add to Home Screen.
- **Next:** Check on the iPad, opening the face from its Home Screen icon, that it fills the screen and how visible the iPadOS edge items are. Get the voice status from the panel to diagnose the trigger words. Likely causes: voice is off by default, a controller button can't start recognition, Dictation is off, or the iPad won't share the mic between recognition and lip-sync.
- **Blocked/Open:** Trigger words on the iPad (waiting on the panel readout).

## 2026-10-12 - Commissioned face renders added, swappable with the existing frames; README.html and LAN test server

- **Done:**
  - The artist's renders ("USE THESE": Normal, Happy, Angry with 5 frames each, plus 2 extras) are now in `assets/faces/Commissioned/{normal,happy,angry,extras}/`, renamed `0.png` (closed) to `4.png` (most open). Extras: `o-mouth.png`, `smirk.png`. They are 2732x2048 (the 12.9" iPad Pro screen), fully opaque, with the screen backdrop baked in and identical in every frame.
  - The old PowerPoint mouths moved (with git mv) from `assets/mouths/` to `assets/faces/Existing/setN-*/`.
  - `face-config.js` now has `faceStyle` and `styles: { Commissioned, Existing }`, each with its own moods, defaultMood, fit (cover/contain) and background. Commissioned moods: neutral, happy, angry, plus surprised (O) and smug (smirk), which are single held poses. Existing keeps the old 5 moods.
  - `face.html` swaps style live with F, RB/R1 (button 5) or a panel button. The mood is kept if the other style has the same id. The pick is remembered in localStorage, and `?faces=` overrides it. `manifest.js` `mouths` became `faces`, with `style`/`dir` per set. `theme.css` has `--screen-bg` (Existing) and `--commissioned-bg` (#E1F5FD).
  - `preview.html` shows both styles.
  - Added `README.html`, a step-by-step guide for the wearer. Its mood and control tables are built from `face-config.js`.
  - Added `serve.mjs`: HTTPS on port 8443 (self-signed certificate in `.cert/`, gitignored; needed for the mic in Safari) and HTTP on 8080, with byte ranges for video.
  - Tested in headless Chrome: all moods in both styles, swap and remember, lip-sync frames, the README render. No errors.
- **Decided:** Frame order is a judgement from the art. Normal is 5,3,4,1,2. Happy is 2,3,1,5,4. Angry is base,2,3,5,4 (original Illustration57 numbers).
- **Next:** The wearer compares the styles on the iPad (`node serve.mjs`, then https://<LAN IP>:8443/face.html) and confirms the frame order and the uses for the extra poses. Not yet tested on a real iPad.
- **Blocked/Open:** Whether Windows Firewall lets the iPad reach the server (allow Node on private networks).

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
