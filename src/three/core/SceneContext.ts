import { Scene } from 'three';
import SceneObject from '@/three/objects/SceneObject.interface';

export default class SceneContext {
    private objects: SceneObject[] = [];

    constructor(
        private readonly scene: Scene
    ) {

    }

    public getScene(): Scene {
        return this.scene;
    }

    public iterateObjects(callback: (object: SceneObject) => void): void {
        this.objects.forEach(callback);
    }

    public addObject(object: SceneObject): void {
        this.objects.push(object);
        this.scene.add(object.getMesh());
    }
}