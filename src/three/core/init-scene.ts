import Loop from '@/three/core/Loop';
import flushAnimations from '@/three/utility/flush-animations';
import RenderContext from '@/three/core/RenderContext';
import SceneDescriptor from '@/three/core/SceneDescriptor';

const DEFAULT_SCENE = 'Simple';
const VALID_SCENES = [
    'Simple',
];

async function initScene(canvas: HTMLCanvasElement, sceneName: string, immediate: boolean = false): Promise<void> {
    flushAnimations();

    if (!VALID_SCENES.includes(sceneName)) {
        return;
    }

    const renderContext = new RenderContext(canvas);
    const descriptor: typeof SceneDescriptor = (await import(`../scenes/${sceneName}.ts`)).default;
    const sceneContext = descriptor.getScene();

    renderContext.setCamera(descriptor.getCamera(canvas));
    renderContext.setSceneContext(sceneContext);

    const loop = new Loop(sceneContext, renderContext.getCamera(), renderContext.getRenderer());

    renderContext.setLoop(loop);
    loop.frame();

    if (immediate) {
        loop.start();
    }
}

export {
    DEFAULT_SCENE,
    initScene as default
}