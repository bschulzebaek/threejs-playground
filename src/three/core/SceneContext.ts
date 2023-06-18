import { Mesh, Scene } from 'three';
import SceneObject from '@/three/objects/SceneObject.interface';
import StaticSceneObject from '@/three/objects/StaticSceneObject.interface';
import ClickableSceneObject from '@/three/objects/ClickableSceneObject.interface';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class SceneContext {
    private dynamicObjects: SceneObject[] = [];
    private clickableObjects: ClickableSceneObject[] = [];
    private currentLoop: number = 0;
    private controls: OrbitControls | null = null;

    constructor(
        private readonly scene: Scene,
    ) {
        // @ts-ignore
        globalThis.__sceneContext = this;
    }

    public getScene(): Scene {
        return this.scene;
    }

    public setControls(controls: OrbitControls): void {
        this.controls = controls;
    }

    public getControls(): OrbitControls {
        if (!this.controls) {
            throw new Error('Controls not set!');
        }

        return this.controls;
    }

    public setCurrentLoop(loop: number): void {
        this.currentLoop = loop;
    }

    public getCurrentLoop(): number {
        return this.currentLoop;
    }

    public iterateObjects(callback: (object: SceneObject) => void): void {
        this.dynamicObjects.forEach(callback);
    }

    public addDynamicObject(...objects: SceneObject[]): void {
        objects.forEach((object) => {
            this.dynamicObjects.push(object);

            if (object.getObject) {
                this.scene.add(object.getObject());
            }
        });
    }

    public addStaticObject(...objects: StaticSceneObject[]): void {
        objects.forEach((object) => {
            if (object.getObject) {
                this.scene.add(object.getObject());
            }
        });
    }

    public addClickableObject(...objects: ClickableSceneObject[]): void {
        objects.forEach((object) => {
            this.clickableObjects.push(object);
        });
    }

    public getClickableObjects(): ClickableSceneObject[] {
        return this.clickableObjects;
    }
}