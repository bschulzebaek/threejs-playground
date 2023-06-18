import { Camera, Raycaster, Vector2 } from 'three';
import RenderContext from '@/three/core/RenderContext';
import SceneContext from '@/three/core/SceneContext';


let _sceneContext: SceneContext | null = null;
let camera: Camera | null = null;
const rayCaster = new Raycaster();
const mouse = new Vector2();

export default function setObjectClickListener(renderContext: RenderContext, sceneContext: SceneContext) {
    camera = renderContext.getCamera();
    _sceneContext = sceneContext;

    window.addEventListener('click', detectIntersections);
}

const detectIntersections = (event: MouseEvent) => {
    if (!camera || !_sceneContext) {
        return;
    }

    const objects = _sceneContext.getClickableObjects();

    if (!objects.length) {
        return;
    }

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    rayCaster.setFromCamera(mouse, camera);

    objects.forEach((object) => {
        const intersects = rayCaster.intersectObjects([object.getObject()], false);

        if (!intersects.length) {
            return;
        }

        object.onClick();
    });
}