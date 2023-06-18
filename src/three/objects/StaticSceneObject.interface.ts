import { Object3D } from 'three';

export default interface StaticSceneObject {
    getObject?(): Object3D;
}