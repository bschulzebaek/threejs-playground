/**
 * Necessary workaround to prevent broken memory references
 * caused by the NextJS "Fast Refresh" re-creating the canvas rendering context,
 * while animations are still running.
 */
export default function flushAnimations() {
    // @ts-ignore
    cancelAnimationFrame(globalThis.__loop);
}