import { Mesh, Scene } from 'three';
import SceneObject from '@/three/objects/SceneObject.interface';

export default class SceneContext {
    private dynamicObjects: SceneObject[] = [];

    constructor(
        private readonly scene: Scene
    ) {
        // @ts-ignore
        globalThis.__sceneContext = this;
    }

    public getScene(): Scene {
        return this.scene;
    }

    public iterateObjects(callback: (object: SceneObject) => void): void {
        this.dynamicObjects.forEach(callback);
    }

    public addDynamicObject(object: SceneObject): void {
        this.dynamicObjects.push(object);

        if (object.getObject) {
            this.scene.add(object.getObject());
        }
    }
}