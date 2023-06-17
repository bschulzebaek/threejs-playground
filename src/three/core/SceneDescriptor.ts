import SceneContext from '@/three/core/SceneContext';
import { Camera, WebGLRenderer } from 'three';
import RenderContext from '@/three/core/RenderContext';

export default class SceneDescriptor {
    static getRenderer(canvas: HTMLCanvasElement): WebGLRenderer {
        throw new Error('Not implemented!');
    }

    static getCamera(canvas: HTMLCanvasElement): Camera {
        throw new Error('Not implemented!');
    }

    static getSceneContext(renderContext: RenderContext): SceneContext {
        throw new Error('Not implemented!');
    }
}