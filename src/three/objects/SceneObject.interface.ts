import { Object3D } from 'three';

export default interface SceneObject {
    update(time: number): void;
    getObject?(): Object3D;
}