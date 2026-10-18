// Settings for face.html. Edit this file to rename moods, change trigger words or remap buttons.
// Screen colours are in assets/theme.css.
window.FACE_CONFIG = {
  // Face art style: 'Commissioned' (the artist's renders). Add more under `styles` to swap live with F,
  // RB/R1 on a controller, or the tuning panel button.
  faceStyle: 'Commissioned',

  // Each style has its own moods.
  //   defaultMood: mood shown at start, and the mood a voice trigger falls back to.
  //   fit:        'contain' shows the whole frame (bars of `background` where the screen shape differs),
  //               'cover' fills the screen but crops the edges (cut off the bottom lip in Safari with toolbars).
  //   background: page colour behind the frames (assets/theme.css).
  // Moods: `set` is a face set id in assets/manifest.js (folders in assets/faces/<style>/).
  //   key:     keyboard key (Bluetooth keyboard / clicker / 8BitDo in keyboard mode)
  //   button:  gamepad button index (standard layout: 0 = A/Cross, 1 = B/Circle, 2 = X/Square,
  //            3 = Y/Triangle, 4 = LB/L1, 5 = RB/R1). The tuning panel shows the index of the last press.
  //   triggers: words or phrases that switch to this mood when voice triggers are on. Lower case.
  styles: {
    Commissioned: {
      defaultMood: 'neutral', fit: 'contain', background: 'var(--commissioned-bg)',
      // 'surprised' and 'smug' use the single extra poses, so the mouth holds still while talking.
      // Speech recognition writes "okay" as "ok" and "oh my god" as "omg", so both spellings are listed.
      moods: [
        { id: 'neutral',   set: 'normal',  key: '1', button: 0,
          triggers: ['neutral', 'normal', 'okay', 'ok', 'alright', 'all right', 'anyway', 'calm down', 'moving on', 'never mind'] },
        { id: 'happy',     set: 'happy',   key: '2', button: 3,
          triggers: ['happy', 'haha', 'awesome', 'amazing', 'yay', 'fantastic', 'love it', 'ladies and gentlemen', 'aww', 'thank you', 'thanks', 'cute'] },
        { id: 'angry',     set: 'angry',   key: '3', button: 1,
          triggers: ['angry', 'shut up', 'i hate', 'annoying', 'ugh', 'what the'] },
        { id: 'sad',       set: 'sad',     key: '6', button: 10,
          triggers: ['sad', 'oh no', 'sorry', 'so sad', 'unfortunately', 'boo'] },
        { id: 'surprised', set: 'o-mouth', key: '4', button: 2,
          triggers: ['surprised', 'whoa', 'wow', 'oh my', 'omg', 'oh my god', 'no way'] },
        { id: 'smug',      set: 'smirk',   key: '5', button: 4,
          triggers: ['smug', 'obviously', 'of course', 'told you', 'heh'] },
      ],
    },
  },

  voice: {
    enabled: false,         // trigger words at start. Off: Safari speech recognition needs internet. Toggle: V / Select
    lang: 'en-US',
    moodSeconds: 10,        // how long a trigger word's mood lasts before going back; 0 = until changed
    // Words that switch the screen instead of the mood. Any mood's trigger word goes back to the face.
    colorBars: ['error', 'technical difficulties', 'please stand by'],
  },

  // Starting values for the tuning panel (changes made in the panel are saved on the iPad).
  lipSync: {
    open: 12,               // dB above the noise floor that opens the mouth
    close: 7,               // dB above the floor that closes it again (lower than open, stops flicker)
    wide: 22,               // dB above the floor for the most open frame
    release: 0.25,          // how fast the level falls after a sound (higher = snappier)
    minFrameMs: 70,         // shortest time a mouth frame stays up
  },

  // Briefly show a set's extra frame (e.g. a tongue pose) now and then while quiet.
  idleExtras: true,

  tv: {
    transitionMs: 600,      // static burst between face and channels
    sound: false,           // play channel/transition audio
    // Videos are downloaded into memory while the start screen is up, so they play without a connection.
    // Colour bars (11 MB) always are; channels (assets/manifest.js, none at the moment) too unless false.
    preloadChannels: true,
    // A/B test options (the tuning panel can switch them; URL ?videos=...&static=... also overrides):
    videos: 'small',        // channels: 'small' = re-compressed copies, 'original' = PowerPoint copies
    static: 'generated',    // 'generated' = drawn live (0 MB), 'video' = transitions/static.mov (15 MB)
  },

  // Other controls. Gamepad indices use the standard layout (12-15 = D-pad up/down/left/right).
  controls: {
    prevMood:   { keys: ['ArrowLeft', 'PageUp'],    button: 14 },
    nextMood:   { keys: ['ArrowRight', 'PageDown'], button: 15 },
    backToFace: { keys: ['ArrowDown', 'Escape', '0'], button: 13 },
    colorBars:  { keys: ['b'],                      button: 7 },   // RT / R2, toggles
    staticBurst:{ keys: ['s'],                      button: 6 },   // LT / L2
    faceStyle:  { keys: ['f'],                      button: 5 },   // RB / R1: next face style (only with more than one)
    toggleVoice:{ keys: ['v'],                      button: 8 },   // Select / View / Share
    debug:      { keys: ['d'],                      button: 9 },   // Start / Menu / Options
  },
};
