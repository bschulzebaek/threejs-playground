import { Mesh } from 'three';

export default interface SceneObject {
    update(time: number): void;
    getMesh(): Mesh;
}