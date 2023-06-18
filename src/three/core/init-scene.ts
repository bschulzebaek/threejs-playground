import Loop from '@/three/core/Loop';
import flushAnimations from '@/three/utility/flush-animations';
import RenderContext from '@/three/core/RenderContext';
import SceneDescriptor from '@/three/core/SceneDescriptor';
import setResizeListener from '@/three/utility/resize-listener';
import setPageVisibilityListener from '@/three/utility/page-visibility-listener';
import SceneInitializedEvent from '@/three/events/SceneInitializedEvent';

async function _initScene(canvas: HTMLCanvasElement, descriptor: typeof SceneDescriptor): Promise<Loop> {
    const renderContext = new RenderContext(canvas, descriptor);
    const sceneContext = await descriptor.getSceneContext(renderContext);
    renderContext.setSceneContext(sceneContext);

    const loop = new Loop(sceneContext, renderContext.getCamera(), renderContext.getRenderer());
    renderContext.setLoop(loop);

    setResizeListener(renderContext);
    setPageVisibilityListener(renderContext);

    return loop;
}

export default async function initScene(canvas: HTMLCanvasElement, descriptor: typeof SceneDescriptor): Promise<void> {
    flushAnimations();

    const loop = await _initScene(canvas, descriptor);

    globalThis.dispatchEvent(new SceneInitializedEvent(loop));
}