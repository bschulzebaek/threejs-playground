import SceneContext from '@/three/core/SceneContext';
import { Camera, WebGLRenderer } from 'three';
import Loop from '@/three/core/Loop';
import SceneDescriptor from '@/three/core/SceneDescriptor';

export default class RenderContext {
    private readonly renderer: WebGLRenderer;

    private camera: Camera | null = null;
    private sceneContext: SceneContext | null = null;
    private loop: Loop | null = null;

    constructor(
        private readonly canvas: HTMLCanvasElement,
        descriptor: typeof SceneDescriptor,
    ) {
        this.renderer = descriptor.getRenderer(canvas);
        this.setCamera(descriptor.getCamera(canvas));

        // @ts-ignore
        globalThis.__renderContext = this;
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public getRenderer(): WebGLRenderer {
        return this.renderer;
    }

    public setSceneContext(sceneContext: SceneContext): void {
        this.sceneContext = sceneContext;
    }

    public getSceneContext(): SceneContext {
        if (!this.sceneContext) {
            throw new Error('sceneContext not set!');
        }

        return this.sceneContext;
    }

    public setLoop(loop: Loop): void {
        this.loop = loop;
    }

    public getLoop(): Loop {
        if (!this.loop) {
            throw new Error('loop not set!');
        }

        return this.loop;
    }

    public setCamera(camera: Camera): void {
        this.camera = camera;
    }


    public getCamera(): Camera {
        if (!this.camera) {
            throw new Error('camera not set!');
        }

        return this.camera;
    }
}