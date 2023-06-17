import { Camera, PerspectiveCamera } from 'three';

enum CAMERA_TYPES {
    PERSPECTIVE = 0
}

function createCamera(canvas: HTMLCanvasElement, type: CAMERA_TYPES): PerspectiveCamera {
    switch (type) {
        case CAMERA_TYPES.PERSPECTIVE:
            return createPerspectiveCamera(canvas);
        default:
            throw new Error('Unknown camera type!');
    }
}

function createPerspectiveCamera(canvas: HTMLCanvasElement): PerspectiveCamera {
    return new PerspectiveCamera(
        90,
        canvas.clientWidth / canvas.clientHeight,
        0.01,
        10
    );
}

export {
    CAMERA_TYPES,
    createCamera as default,
}