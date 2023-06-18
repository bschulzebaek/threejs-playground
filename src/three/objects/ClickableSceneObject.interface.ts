import { Object3D } from 'three';

export default interface ClickableSceneObject {
    getObject(): Object3D;
    onClick(): void;
}