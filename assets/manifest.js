// Loaded with a <script> tag so pages also work when opened straight from disk (file://).
self.FACE_MANIFEST = {
  "note": "Face sets come in two styles under faces/<style>/. Commissioned: the artist's renders (2732x2048, the 12.9in iPad Pro screen; opaque full frames with the screen backdrop baked in, identical in every frame). In each set, frames are ordered closed -> most open. Commissioned extras are single poses, used as one-frame sets.",
  "posesPerSecond": 6,
  "faces": [
    { "id": "normal", "style": "Commissioned", "dir": "faces/Commissioned/normal", "looks": "lopsided grin",
      "frames": ["0.png", "1.png", "2.png", "3.png", "4.png"] },
    { "id": "happy", "style": "Commissioned", "dir": "faces/Commissioned/happy", "looks": "curled grin with blush",
      "frames": ["0.png", "1.png", "2.png", "3.png", "4.png"] },
    { "id": "angry", "style": "Commissioned", "dir": "faces/Commissioned/angry", "looks": "square mouth, fangs",
      "frames": ["0.png", "1.png", "2.png", "3.png", "4.png"] },
    { "id": "sad", "style": "Commissioned", "dir": "faces/Commissioned/sad", "looks": "wobbly frown, one tear-curl",
      "frames": ["0.png", "1.png", "2.png", "3.png", "4.png"] },
    { "id": "o-mouth", "style": "Commissioned", "dir": "faces/Commissioned/extras", "looks": "small round O (extra pose)",
      "frames": ["o-mouth.png"] },
    { "id": "smirk", "style": "Commissioned", "dir": "faces/Commissioned/extras", "looks": "small sideways smirk (extra pose)",
      "frames": ["smirk.png"] }
  ],
  "transitions": [
    { "file": "transitions/color-bars-glitch.mov", "slide": 6, "seconds": 17.8, "size": [1280, 720] },
    { "file": "transitions/static.mov", "slide": 8, "seconds": 15.7, "size": [1280, 720] }
  ],
  "channels": []
}
;
