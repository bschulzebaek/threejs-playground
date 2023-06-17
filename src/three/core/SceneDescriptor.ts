import SceneContext from '@/three/core/SceneContext';
import { Camera } from 'three';

export default class SceneDescriptor {
    static getCamera(canvas: HTMLCanvasElement): Camera {
        throw new Error('Not implemented!');
    }

    static getScene(): SceneContext {
        throw new Error('Not implemented!');
    }
}