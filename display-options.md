# Tenna Helmet — Face Display Options

Slot: 280.6 x 214.9 x 5.9 mm (iPad Pro 12.9" 3rd/4th-gen footprint, 4:3). Long axis = 280.6 mm.
Slot can be extended by a few mm. Driven by a Raspberry Pi 4 alongside a USB mic, a Pi camera (CSI),
and a second smaller display. 30 fps is acceptable on both displays.

Visible window in the printed face plate (added 2026-09-14): 254 mm wide x 191 mm tall (4:3). The panel's
ACTIVE area must cover this, so lit height >= 191 mm is the binding constraint:
- iPad Pro 12.9" 3rd/4th gen active 262.9 x 197.2 -> fits (4 mm spare each axis). Only panel that fits as printed.
- P130ZFA-BA1 active 274.75 x 183.17 -> 8 mm short on height. Either reprint the window at ~274 x 183 (3:2,
  slightly larger lit area than now) or accept ~4 mm black bars top and bottom.
- LP129QE1-SPA1 ~272 x 181 (10 mm short), LP123WQ1 259.78 x 173.19 (18 mm short), 12.5" FHD ~277 x 156 (35 mm short).
- A 3:2 panel needs >= 13.5" to reach 191 mm lit height (~285 x 190 lit, ~300 x 205 outline, estimated) which
  means widening the 280.6 mm slot by ~20 mm and no known driver board (Surface Laptop 13.5", MateBook X Pro 13.9").

## Option 1 — Innolux P130ZFA-BA1 (Huawei MateBook 13 panel)  ← current favourite

| Spec | Value |
|---|---|
| Size / aspect | 13.0", 3:2 |
| Outline | 280.75 x 196.82 mm |
| Active area | 274.75 x 183.17 mm |
| Thickness | <= 3.0 mm |
| Resolution | 2160 x 1440 @ 60 Hz |
| Interface | eDP 1.4, 4 lanes, 30-pin |
| Brightness | 330 nits, WLED |
| Price | $75 (laptopscreen.com) to $140 (Bliss Computers) new |

Fit in slot:
- Length 0.15 mm over → open slot ~1 mm for clearance.
- Short axis: 18 mm total gap (~9 mm per side).
- Printed bezel covers ~16 mm per side on the short axis, ~3 mm per side on the long axis
  (measured to the lit area).
- 30-pin connector on the back along one long edge; leave a ribbon channel.

Driver board:
- Cheap "30-pin eDP 1920x1080" RTD2556 boards will NOT work (2-lane 1080p firmware).
- Need a 4-lane 30-pin board flashed for this panel:
  - VSDISPLAY VS-RTD2556HM-V1 (~$43): 4-lane eDP to 2560x1600, 2x mini HDMI, 12 V / 2 A, 82 x 60 x 5 mm.
    Give the seller the panel model P130ZFA-BA1 at order time and get written confirmation.
  - Fallback: VSDISPLAY VS-RT2795T4K-V1 (universal 30/40-pin, to 4K, also flashed per panel).
- No vendor lists a board pre-configured for this panel; seller confirmation is mandatory.

Pi 4:
- 2160x1440 @ 60 Hz ≈ 233 MHz pixel clock, under the 300 MHz default → native res, no config changes.
- HDMI1 stays free at full capability for the second display.
- Board power (12 V / 2 A) must come from its own supply, not the Pi.

Sources:
- https://www.youritech.com/products/new-original-13-0-inch-2160x1440-resolution-full-viewing-angle-with-edp-30-pins-lcd-display-screen-for-laptop.html
- https://www.twscreen.com/en/lcdpanel/23400/cmo/p130zfa-ba1/13/2160x1440-Laptop-LCD-Panel
- https://www.laptopscreen.com/English/screen-part-number/P130ZFA-BA1/
- https://www.blisscomputers.net/p130zfa-ba1-2160x1440-13-0-glass-lcd-screendisplay-panel-new-443642/
- https://www.vslcd.com/D000079-30Pin-EDP-Micro-Lcd-Driver-Board.html
- https://www.vslcd.com/edp-lcd-controller-board.html

## Other candidates considered (ranked by gap on the 214.9 mm side)

| Panel | Aspect | Outline (mm) | Gap on 215 side | Notes |
|---|---|---|---|---|
| LG LP129QE1-SPA1 (Chromebook Pixel) | 3:2 | 283.3 x 195 x <=3.2 (verified) | 20 mm | 2560x1700, 40-pin 4-lane eDP; needs +3 mm slot mod; rare |
| LG LP123WQ1-SPA2 (Surface Pro 5/6) | 3:2 | 265.4 x 183.5 (verified) | 31 mm | 2736x1824, 60-pin eDP, few boards |
| 12.5" FHD B125HAN02.2 / N125HCE-GN1 | 16:9 | ~282 x 167 x 2.7 (est.) | ~48 mm | Cheapest, standard 2-lane 30-pin boards |
| 12.1" 4:3 industrial LED (AUO G121XN01) | 4:3 | ~279 x 209 x 8.6 (est.) | ~6 mm | Too thick for 5.9 mm slot unless deepened |
| 9.7" iPad 3/4 LP097QX1 | 4:3 | 197 x 149 | 66 mm | Proven M85 board, ~$60 total, large bezel |

Ruled out:
- iPad Pro 12.9" LCD (any gen): no HDMI/eDP driver board exists. 1st gen uses a proprietary flex;
  2nd gen and later are laminated assemblies. DIY iPad boards stop at iPad 3/4 and Air 1.

## Surface Pro 5/6 touch assembly (LP123WQ1) dimensions - checked 2026-09-14

- Bare LCD LP123WQ1-SPA2 (twscreen datasheet excerpt): outline 265.38 x 183.49 mm, active area 259.78 x 173.19 mm,
  eDP 4-lane, 440 nits, glossy. Thickness not published on any accessible source.
  Pin count is disputed: datasheet-style listings (twscreen, displaysscreen, panelook snippet, lpscreen SPC1) say
  60 pins; LCDOLED assembly listings on Amazon/Newegg say "EDP 40 pins". Unresolved without the LG datasheet or
  a photo of the FPC. Either way it needs a 4-lane board and none is listed for this panel.
- Full touch assembly (glass + digitizer + LCD, sold for Pro 5 1796 / Pro 6 1807 1809): no vendor (Amazon, iFixit,
  eBay, Bliss, Parts4Repair, lcd4laptop, Alibaba) lists its outline or thickness. The glass spans the whole front of
  the tablet, which is 292 x 201 x 8.5 mm, so the assembly is roughly 290 x 199 mm (estimate, unverified). That is
  about 10 mm longer than the 280.6 mm slot; the bare panel fits with 15 mm / 31 mm gaps.
- Conclusion: the assembly needs a caliper measurement or seller confirmation before it can be considered; the
  60-pin eDP board problem applies either way.

## Option 2 - Refurbished iPad Pro 12.9" (backup, perfect slot fit)

Hardware:
- Only the 3rd gen (2018, A1876/A2014/A1895/A1983) and 4th gen (2020, A2229/A2069/A2232/A2233)
  match the slot at 280.6 x 214.9 x 5.9 mm. 2021 and later models are 6.4 mm thick.
- 5th gen (2021) / 6th gen (2022): same 280.6 x 214.9 footprint, 6.4 mm thick, ~40 g heavier. Only change to the
  print is pocket depth 5.9 -> ~6.5 mm (one dimension in source CAD; boolean cut or slicer negative volume if STL only).
  May need no change at all if nothing holds the back flush. Without reprinting: leave it 0.5 mm proud at the back,
  or file/gasket the rear retaining lip or back plate by ~0.5-1 mm; avoid sanding the whole pocket floor or heat forming.
- 1st gen (2015, A1584/A1652) and 2nd gen (2017) use the older body: 305.7 x 220.6 x 6.9 mm, ~713 g. Same 12.9"
  4:3 lit area (~263 x 197 mm) so they cover the 254 x 191 window, but the slot would need +25 mm length,
  +6 mm width, +1 mm depth. Cheaper used. 1st gen runs iPadOS 16.7 (Web Audio, mic, wake lock all present);
  Lightning port, so Ethernet/charging needs the Lightning to USB 3 Camera Adapter. (checked 2026-09-14)
- Both have USB-C: charging from a power bank, a USB-C mic, and USB-C Ethernet to the Pi all work with plain adapters.
- The built-in mic sits right in front of the wearer's mouth, so no external mic is needed for lip sync.

Software (mouth open/close synced to the wearer's voice):
- A. iPad standalone (recommended): one HTML page in Safari using the Web Audio API.
  Reads mic RMS about 60x/s, smoothed with fast attack / slow release, hysteresis between open and
  close thresholds, noise floor learned at startup, 4 mouth states (closed/half/open/wide), idle blink.
  Voice-to-frame latency about 30-50 ms. No App Store, Xcode, Mac, or developer account.
  Test page: mouth-test.html in this folder. Double-tap to open the tuning panel; settings persist.
- B. Pi renders, iPad displays: Pi runs mic + voice activity detection + web server; iPad Safari
  loads the page and gets mouth state over a WebSocket (USB-C Ethernet or Pi hotspot). Only worth it
  if the Pi needs the same voice signal for something else (eye display, voice changer).
- C. Native Swift app: same result, needs a Mac; unsigned builds expire every 7 days without a
  $99/yr developer account. Not worth it for this animation.

iPad setup for the helmet:
- Serve the page over HTTPS (GitHub Pages is easiest). Safari refuses mic access on plain HTTP.
- Open it in a normal Safari tab, tap start, then enable Guided Access to lock it. Set Auto-Lock to
  Never, turn off True Tone and auto-brightness. The page also requests a screen wake lock (iOS 16.4+).
- Run it in a Safari tab rather than as a Home Screen web app; mic access in standalone mode is less reliable.

Where the Pi fits: only the camera and second display remain. If those are just eye animations, an ESP32
with SPI round LCDs does that with less weight and power, and the Pi becomes optional.

Cost: a refurbished 3rd gen 64 GB is the cheapest eligible unit; check the model number and thickness before buying.

## Inner display + camera: iPhone instead of the Pi? (checked 2026-09-14, corrected same day)

Idea: iPhone 17 Pro as the wearer-facing display, USB-C endoscope as the forward camera, powered USB-C hub inside.
- Charging while a USB device is attached: fine. Use a hub with a USB-C PD *input* (pass-through), not just a
  bus-powered hub.
- Camera: generic USB webcams (UVC) do NOT work on iPhone (Apple staff confirm the external-camera API is
  USB-C-iPad only; "USB Camera" / "UVC Camera to NDI" apps are iPad-only). BUT the user's own USB-C endoscope works
  on their iPhone through the vendor's app: made-for-iPhone accessory streaming over USB-C in its own protocol.
  So the plan is viable, with the camera visible only inside that app.
- To test before building around it: (1) the app still sees the camera through the PD hub while charging (some
  accessories want a direct connection; vendors sell Y-cables with a charge port if not); (2) field of view,
  lag and low-light are acceptable for walking, since endoscopes are made for close inspection.
- Upgrading the camera later means another accessory with its own iPhone app; a standard wide-angle webcam
  will not work on the iPhone. That is where a USB-C iPad mini (UVC native, iPadOS 17+) or the Pi still wins.
- Hub candidate (2026-09-14): Acer 10 Gbps USB-C hub, 4x USB-C 3.2 + 100W PD port, 15 cm cable, no video out.
  Suitable: PD port passes power to the phone; feed it from a 30-45 W USB-C PD power bank. No video out is
  irrelevant. USB-A devices would need an adapter. Watch iPhone heat while charging inside the closed helmet.
- Endoscope LEDs (2026-09-14): most iPhone USB-C scopes (Teslong Xscope models, DEPSTECH) set brightness with a
  thumb wheel on the cable; app does not control lights. Wheel minimum is normally off but listings only say
  "adjustable"; check the user's own unit in a dark room. Fallback: mask the LED ring with black tape/nail polish
  leaving the lens clear, or pick a scope whose app has a brightness slider. Keep LEDs off to avoid a glowing halo
  and lens glare through the face window.
- Whatever the inner display is, it sits a few cm from the eyes and needs a lens to be focusable.

## Remote control for swapping animations

- Use a Bluetooth remote that pairs as a keyboard (BLE HID). Both the iPad and the Pi receive plain
  keydown events in the page, so swapping animation sets is a small key handler: number keys pick a set,
  arrows cycle, a spare key toggles a special state.
- Safari on iOS has no Web Bluetooth, so a custom BLE protocol cannot talk to a page on the iPad.
- Off-the-shelf: presentation clickers (Page Up/Down + a few letters), 8BitDo Zero 2 in keyboard mode,
  mini BLE keypads. Avoid camera shutter remotes: they send Volume Up, which iOS swallows.
- Custom: an ESP32 running the BLE Keyboard library shows up as a keyboard. Works on iPad and Pi alike.
- iPad: Bluetooth keyboards keep working under Guided Access; the page has focus after the start tap.
- Pi extras: custom BLE via BlueZ, or a phone browser as the remote over the Pi's own hotspot (no pairing).
- Design: structure animations as named sets that share the same four mouth states, so a swap only
  changes which set is drawn and lip sync keeps running underneath.

## Self-hosting the page from the Pi (no external WiFi)

Wireless, no accessories needed. Pi 4 built-in WiFi as an access point (Raspberry Pi OS Bookworm):

    sudo nmcli device wifi hotspot ifname wlan0 ssid TennaFace password <your-password> band a

- `band a` = 5 GHz; 2.4 GHz is saturated at conventions.
- Page is at the Pi's hotspot IP or `<hostname>.local` (mDNS is built in; the hostname is set in Raspberry Pi Imager).

Wired alternative (more robust in a crowded hall), two accessories:
- USB-C hub for the iPad with Ethernet + power-delivery pass-through (iPad charges from the same bank).
- Short Ethernet cable straight into the Pi's port. No switch needed. Pi runs DHCP on eth0 or use static IPs.

Power accessories (the Pi needs its own clean 5 V / 3 A, separate from the display board):
- USB-C PD power bank with two outputs; a PD trigger cable gives 12 V for the display board.
- UPS HAT with 18650 cells (e.g. Geekworm X728) to swap banks without the Pi rebooting.

Do not use the Pi's USB-C port as a data link to the iPad: it is the Pi's power input, and the iPad
cannot supply enough current for a Pi 4 with camera and displays attached.

HTTPS catch: Safari only allows mic access over HTTPS, and a Pi-hosted page on a local address is HTTP.
- Preferred: let the Pi do the listening (USB mic + voice detection on the Pi, mouth state pushed to the
  iPad page over a WebSocket). The page never asks for the mic, so plain HTTP is fine. This is
  Architecture B above, and self-hosting is the reason to pick it. It also gives the Pi the same voice
  signal for the eye display or a voice changer.
- Alternative: keep the mic on the iPad and install a self-signed certificate. Generate with mkcert on
  the Pi, then trust its root CA on the iPad: Settings > General > About > Certificate Trust Settings.
