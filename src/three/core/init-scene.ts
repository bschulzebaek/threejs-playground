import Loop from '@/three/core/Loop';
import flushAnimations from '@/three/utility/flush-animations';
import RenderContext from '@/three/core/RenderContext';
import SceneDescriptor from '@/three/core/SceneDescriptor';
import setResizeListener from '@/three/utility/resize-listener';
import setPageVisibilityListener from '@/three/utility/page-visibility-listener';

const DEFAULT_SCENE = 'Default';
export const VALID_SCENES = [
    'Default',
    'GlbModel',
    'GltfModel',
    'GltfScene'
];


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

async function initScene(canvas: HTMLCanvasElement, sceneName: string, immediate: boolean = false): Promise<void> {
    flushAnimations();

    if (!VALID_SCENES.includes(sceneName)) {
        return;
    }

    const descriptor: typeof SceneDescriptor = (await import(`../scenes/${sceneName}.ts`)).default;
    const loop = await _initScene(canvas, descriptor);

    if (immediate) {
        loop.start();
    } else {
        loop.frame();
    }
}

export {
    DEFAULT_SCENE,
    initScene as default
}