// CRT static drawn live on a canvas: a 0 MB stand-in for transitions/static.mov.
// Tuned against that clip: grain about 1/256 of the screen width, brightness centred near 66/255
// with a cool blue tint, and a slow rolling dark band.
// Usage: const s = StaticNoise(canvas); s.start(); s.stop();
self.StaticNoise = function (canvas, { fps = 30, grain = 256 } = {}) {
  const g = canvas.getContext('2d', { alpha: false });
  let img = null, px = null, w = 0, h = 0, raf = 0, last = 0, seed = 0x9e3779b9;

  const rand = () => {          // xorshift32: much faster than Math.random for ~50k pixels a frame
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };

  function size() {
    const r = canvas.getBoundingClientRect();
    w = grain;
    h = Math.max(1, Math.round(grain * (r.height || 3) / (r.width || 4)));
    canvas.width = w; canvas.height = h;
    img = g.createImageData(w, h);
    px = new Uint32Array(img.data.buffer);
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (now - last < 1000 / fps) return;
    last = now;
    const roll = now / 2500;
    for (let y = 0, i = 0; y < h; y++) {
      const band = 12 * Math.sin(2 * Math.PI * (y / h * 1.5 + roll)) + (rand() - 0.5) * 8;
      for (let x = 0; x < w; x++, i++) {
        const L = 66 + band + ((rand() + rand()) / 2 - 0.5) * 360;
        const r = L - 10, gg = L, b = L + 12;
        px[i] = 0xff000000 |
                ((b < 0 ? 0 : b > 255 ? 255 : b) << 16) |
                ((gg < 0 ? 0 : gg > 255 ? 255 : gg) << 8) |
                (r < 0 ? 0 : r > 255 ? 255 : r);
      }
    }
    g.putImageData(img, 0, 0);
  }

  return {
    start() { if (raf) return; size(); canvas.style.display = 'block'; last = 0; raf = requestAnimationFrame(frame); },
    stop() { cancelAnimationFrame(raf); raf = 0; canvas.style.display = 'none'; },
  };
};
