import { Camera, Scene } from 'three';
import RotatingCube from '@/three/objects/RotatingCube';
import SceneContext from '@/three/core/SceneContext';
import createCamera, { CAMERA_TYPES } from '@/three/utility/create-camera';
import SceneDescriptor from '@/three/core/SceneDescriptor';

export default class Simple extends SceneDescriptor {
    static getCamera(canvas: HTMLCanvasElement): Camera {
        const camera = createCamera(canvas, CAMERA_TYPES.PERSPECTIVE);
        camera.position.z = 1;

        return camera;
    }

    static getScene(): SceneContext {
        const scene = new Scene();
        const context = new SceneContext(scene);

        context.addObject(new RotatingCube(0.2, 0.2, 0.2));

        return context;
    }
}