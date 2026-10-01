// Loaded with a <script> tag so pages also work when opened straight from disk (file://).
self.FACE_MANIFEST = {
  "note": "Extracted from TennaFaces.pptx (slides 1-5). Mood names are not confirmed yet, so the sets are named by how they look. In each set, frames are ordered closed -> most open. sourceLoop is the original video's pose order, one pose per 1/6 s.",
  "posesPerSecond": 6,
  "frameSize": [1440, 1080],
  "mouths": [
    {
      "id": "set1-blush",
      "slide": 1,
      "looks": "wavy mouth with // blush marks",
      "frames": ["0.png", "1.png"],
      "extras": { "tongue": "extra-tongue.png" },
      "sourceLoop": ["extra-tongue.png", "0.png", "1.png", "0.png"]
    },
    {
      "id": "set2-grin",
      "slide": 2,
      "looks": "big lopsided grin, tongue",
      "frames": ["0.png", "1.png", "2.png"],
      "sourceLoop": ["1.png", "0.png", "2.png", "0.png"]
    },
    {
      "id": "set3-small",
      "slide": 3,
      "looks": "small sideways mouth",
      "frames": ["0.png", "1.png", "2.png", "3.png"],
      "sourceLoop": ["2.png", "0.png", "1.png", "0.png", "3.png", "0.png", "1.png", "0.png"]
    },
    {
      "id": "set4-fangs",
      "slide": 4,
      "looks": "wide fanged mouth (clenched / open)",
      "frames": ["0.png", "1.png"],
      "sourceLoop": ["1.png", "0.png"]
    },
    {
      "id": "set5-round",
      "slide": 5,
      "looks": "round talking mouth (flat, O, open)",
      "frames": ["0.png", "1.png", "2.png", "3.png", "4.png"],
      "sourceLoop": ["3.png", "0.png", "2.png", "1.png", "4.png", "1.png", "2.png", "0.png"]
    }
  ],
  "transitions": [
    { "file": "transitions/color-bars-glitch.mov", "slide": 6, "seconds": 17.8, "size": [1280, 720] },
    { "file": "transitions/static.mov", "slide": 8, "seconds": 15.7, "size": [1280, 720] }
  ],
  "channels": [
    { "file": "channels/smash64.mov", "slide": 9, "seconds": 385.4, "size": [960, 720] },
    { "file": "channels/rickroll-deltarune.mov", "slide": 10, "seconds": 78.2, "size": [960, 720], "warning": "profanity on screen" },
    { "file": "channels/dvd-logo.mov", "slide": 11, "seconds": 63.6, "size": [600, 480] },
    { "file": "channels/bad-apple.mov", "slide": 12, "seconds": 219.7, "size": [1920, 1080] }
  ]
}
;
