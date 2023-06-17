import SceneContext from '@/three/core/SceneContext';
import { Camera, Scene, WebGLRenderer } from 'three';

export default class Loop {
    private paused = true;
    private readonly scene: Scene;

    constructor(
        private readonly sceneContext: SceneContext,
        private readonly camera: Camera,
        private readonly renderer: WebGLRenderer,
    ) {
        this.scene = sceneContext.getScene();
    }

    public start() {
        if (!this.paused) {
            return;
        }

        this.paused = false;

        // @ts-ignore
        globalThis.__loop = requestAnimationFrame((newTime) => this.loop(0, 0));
    }

    public stop() {
        if (this.paused) {
            return;
        }

        this.paused = true;
    }

    public frame() {
        this.innerLoop(0);
    }

    private loop(time: number, lastTime: number) {
        if (this.paused) {
            return;
        }

        // @ts-ignore
        globalThis.__loop = requestAnimationFrame((newTime) => this.loop(newTime, time));

        this.innerLoop(time);
    }

    private innerLoop = (time: number) => {
        this.sceneContext.iterateObjects((object) => {
            object.update(time);
        });

        this.renderer.render(this.scene, this.camera);
    };

    private getDelta(time: number, lastTime: number): number {
        return Math.min(time - lastTime, 100) / 1000;
    }
}