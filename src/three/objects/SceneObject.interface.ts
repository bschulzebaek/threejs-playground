import { Object3D } from 'three';

export default interface SceneObject {
    update(delta: number): void;
    getObject?(): Object3D;
}