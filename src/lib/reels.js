/* ═══════════════════════════════════════════════════════════════
   Which reel plays right now.
   ───────────────────────────────────────────────────────────────
   Pure on purpose: the rule has several branches (hover, touch,
   rotation, no-observer fallback) and this is the only place they
   live, so it can be reasoned about and tested without a browser.

   Exactly one reel plays at a time, always muted.
═══════════════════════════════════════════════════════════════ */

/** A reel counts as "on screen" in the rail past this much visibility. */
export const VISIBLE_THRESHOLD = 0.6;

/** Indices at or above the threshold, left to right. */
export function visibleIndices(ratios) {
  return Object.entries(ratios)
    .filter(([, r]) => r >= VISIBLE_THRESHOLD)
    .map(([i]) => Number(i))
    .sort((a, b) => a - b);
}

/**
 * @param hovered       index under the pointer, or -1
 * @param ratios        { [index]: intersectionRatio } from the observer
 * @param onScreen      visibleIndices(ratios)
 * @param hoverCapable  true on pointer devices, false on touch
 * @param turn          rotation counter, advances as reels finish
 * @returns index to play, or -1 for none
 */
export function pickActiveReel({ hovered, ratios, onScreen, hoverCapable, turn }) {
  /* 1. The pointer always wins. */
  if (hovered >= 0) return hovered;

  const keys = Object.keys(ratios);

  /* 2. Nothing measured yet — or an environment where the observer
        never reports. Play the first reel rather than sit frozen. */
  if (keys.length === 0) return 0;

  if (onScreen.length > 0) {
    /* 3. Touch: whichever reel is most fully on screen. */
    if (!hoverCapable) {
      return onScreen.reduce(
        (best, i) => ((ratios[i] ?? 0) > (ratios[best] ?? 0) ? i : best),
        onScreen[0]
      );
    }
    /* 4. Pointer: rotate through the visible reels, one at a time. */
    return onScreen[turn % onScreen.length];
  }

  /* 5. Mid-swipe, or a screen too narrow for any reel to clear the
        threshold — keep the most visible one going. */
  const best = keys.reduce(
    (acc, k) => ((ratios[k] ?? 0) > (ratios[acc] ?? 0) ? k : acc),
    keys[0]
  );
  return (ratios[best] ?? 0) > 0 ? Number(best) : -1;
}
