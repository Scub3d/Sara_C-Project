// Settings for face.html. Edit this file to rename moods, change trigger words or remap buttons.
// The screen colour is in assets/theme.css (--screen-bg).
window.FACE_CONFIG = {
  // Mood shown at start, and the mood a voice trigger falls back to.
  defaultMood: 'neutral',

  // Moods. `set` is a folder in assets/mouths/. Mood names are best guesses until the friend confirms them.
  //   key:     keyboard key (Bluetooth keyboard / clicker / 8BitDo in keyboard mode)
  //   button:  gamepad button index (standard layout: 0 = A/Cross, 1 = B/Circle, 2 = X/Square,
  //            3 = Y/Triangle, 4 = LB/L1, 5 = RB/R1). The tuning panel shows the index of the last press.
  //   triggers: words or phrases that switch to this mood when voice triggers are on. Lower case.
  moods: [
    { id: 'neutral',   set: 'set5-round', key: '1', button: 0,
      triggers: ['okay', 'alright', 'anyway', 'calm down', 'moving on'] },
    { id: 'angry',     set: 'set4-fangs', key: '2', button: 1,
      triggers: ['angry', 'shut up', 'i hate', 'annoying', 'ugh', 'what the'] },
    { id: 'sad',       set: 'set3-small', key: '3', button: 2,
      triggers: ['sad', 'sorry', 'oh no', 'i miss', 'unfortunately', 'aw man'] },
    { id: 'happy',     set: 'set2-grin',  key: '4', button: 3,
      triggers: ['haha', 'awesome', 'amazing', 'yay', 'fantastic', 'love it', 'ladies and gentlemen'] },
    { id: 'flustered', set: 'set1-blush', key: '5', button: 4,
      triggers: ['aww', 'thank you', 'cute', 'stop it', 'oh my', 'embarrassing'] },
  ],

  voice: {
    enabled: false,         // trigger words at start. Off: Safari speech recognition needs internet. Toggle: V / Select
    lang: 'en-US',
    moodSeconds: 10,        // how long a trigger word's mood lasts before going back; 0 = until changed
  },

  // Starting values for the tuning panel (changes made in the panel are saved on the iPad).
  lipSync: {
    open: 12,               // dB above the noise floor that opens the mouth
    close: 7,               // dB above the floor that closes it again (lower than open, stops flicker)
    wide: 22,               // dB above the floor for the most open frame
    release: 0.25,          // how fast the level falls after a sound (higher = snappier)
    minFrameMs: 70,         // shortest time a mouth frame stays up
  },

  // Briefly show a set's extra frame (e.g. set1's tongue) now and then while quiet.
  idleExtras: true,

  tv: {
    transitionMs: 600,      // static burst between face and channels
    sound: false,           // play channel/transition audio
    // Videos are downloaded into memory while the start screen is up, so they play without a connection.
    // Colour bars (11 MB) always are; channels add ~46 MB (small) or ~134 MB (original). If false, channels stream.
    preloadChannels: true,
    // A/B test options (the tuning panel can switch them; URL ?videos=...&static=... also overrides):
    videos: 'small',        // 'small' = re-compressed channels (~46 MB), 'original' = PowerPoint copies (~134 MB)
    static: 'generated',    // 'generated' = drawn live (0 MB), 'video' = transitions/static.mov (15 MB)
  },

  // Other controls. Gamepad indices use the standard layout (12-15 = D-pad up/down/left/right).
  controls: {
    prevMood:   { keys: ['ArrowLeft', 'PageUp'],    button: 14 },
    nextMood:   { keys: ['ArrowRight', 'PageDown'], button: 15 },
    nextChannel:{ keys: ['ArrowUp', 'c'],           button: 12 },
    backToFace: { keys: ['ArrowDown', 'Escape', '0'], button: 13 },
    colorBars:  { keys: ['b'],                      button: 7 },   // RT / R2, toggles
    staticBurst:{ keys: ['s'],                      button: 6 },   // LT / L2
    toggleVoice:{ keys: ['v'],                      button: 8 },   // Select / View / Share
    debug:      { keys: ['d'],                      button: 9 },   // Start / Menu / Options
  },
};
