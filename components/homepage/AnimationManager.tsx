type Callback = (ts: number) => void;
const subscribers = new Set<Callback>();
let rafId: number | null = null;
let frameCount = 0;

function tick(ts: number) {
  frameCount++;
  if (frameCount % 3 === 0) {
    subscribers.forEach((cb) => cb(ts));
  }
  rafId = requestAnimationFrame(tick);
}

export function subscribe(cb: Callback) {
  subscribers.add(cb);
  if (subscribers.size === 1) {
    rafId = requestAnimationFrame(tick);
  }
  return () => {
    subscribers.delete(cb);
    if (subscribers.size === 0 && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

export function pauseAll() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

export function resumeAll() {
  if (rafId === null && subscribers.size > 0) {
    rafId = requestAnimationFrame(tick);
  }
}
