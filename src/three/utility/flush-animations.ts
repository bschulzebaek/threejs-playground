import SceneContext from '@/three/core/SceneContext';

/**
 * Used to allow PageVisibility API to pause/resume the rendering loop.
 *
 * Additionally, it's a necessary workaround to prevent broken memory references
 * caused by the NextJS "Fast Refresh" re-creating the canvas rendering context,
 * while scenes are still running.
 */
export default function flushAnimations() {
    // @ts-ignore
    const context = globalThis.__sceneContext as SceneContext;

    if (!context) {
        return;
    }

    cancelAnimationFrame(context.getCurrentLoop());
}