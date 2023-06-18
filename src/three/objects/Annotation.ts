import RenderContext from '@/three/core/RenderContext';
import SceneObject from '@/three/objects/SceneObject.interface';
import { CanvasTexture, Mesh, Object3D, Sprite, SpriteMaterial, Vector3 } from 'three';
import SceneContext from '@/three/core/SceneContext';
import ClickableSceneObject from '@/three/objects/ClickableSceneObject.interface';
import * as TWEEN from '@tweenjs/tween.js' ;

const annotationRegistry: Annotation[] = [];

export default class Annotation implements SceneObject, ClickableSceneObject {

    static TWEEN_DURATION = 1000;

    private readonly sprite: Sprite;
    private active: boolean = false;

    constructor(
        private readonly renderContext: RenderContext,
        private readonly sceneContext: SceneContext,
        label: string,
        private element?: HTMLElement | null,
        private readonly cameraPosition?: Vector3 | null,
        private readonly cameraLookAt?: Vector3,
    ) {
        this.sprite = this.createSprite(label);
        annotationRegistry.push(this);
    }

    public update(delta: number): void {
        // this.updateOcclusion();

        if (this.element) {
            this.updateElementPosition();
        }
    }

    private updateOcclusion() {
        const camera = this.renderContext.getCamera();
        const scene = this.sceneContext.getScene();

        let spriteBehindObject = false;

        scene.traverse((obj) => {
            if (!(obj instanceof Mesh)) {
                return;
            }

            const meshDistance = camera.position.distanceTo(obj.position);
            const spriteDistance = camera.position.distanceTo(this.sprite.position);

            spriteBehindObject = spriteDistance > meshDistance;
        });

        this.sprite.material.opacity = spriteBehindObject ? 0.25 : 1;

        if (this.element) {
            this.element.style.opacity = spriteBehindObject ? '0.25' : '1';
        }
    }

    private updateElementPosition() {
        const camera = this.renderContext.getCamera();

        const vector = this.sprite.position.clone();
        const canvas = this.renderContext.getCanvas();

        vector.project(camera);

        vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
        vector.y = Math.round((0.47 - vector.y / 2) * (canvas.height / window.devicePixelRatio));

        const annotation = this.element!;
        annotation.style.top = `${vector.y}px`;
        annotation.style.left = `${vector.x}px`;
    }

    public getObject(): Object3D {
        return this.sprite;
    }

    public setPosition(x: number, y: number, z: number): void {
        this.sprite.position.set(x, y, z);
    }

    private createSprite(label: string) {
        const annotationCanvas = document.createElement('canvas');
        const ctx = annotationCanvas.getContext('2d')!;
        const x = 32;
        const y = 32;
        const radius = 30;
        const startAngle = 0;
        const endAngle = Math.PI * 2;

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.fill();

        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.stroke();

        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.font = '32px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y);

        const texture = new CanvasTexture(annotationCanvas);
        const spriteMaterial = new SpriteMaterial({
            map: texture,
            transparent: true,
            depthTest: false,
            depthWrite: false,
        });
        const sprite = new Sprite(spriteMaterial);
        sprite.scale.set(5, 5, 0);

        return sprite;
    }

    public onClick() {
        this.disableOtherAnnotations();
        this.active = !this.active;

        if (this.active) {
            TWEEN.removeAll();

            if (this.cameraPosition) {
                new TWEEN.Tween(this.renderContext.getCamera().position).to(this.cameraPosition, Annotation.TWEEN_DURATION).start();
            }

            new TWEEN.Tween(this.sceneContext.getControls().target).to(this.cameraLookAt ?? this.sprite.position, Annotation.TWEEN_DURATION).start();
        }

        if (this.element) {
            this.toggleElementVisibility();
        }
    }

    public setActive() {
        this.disableOtherAnnotations();
        this.active = !this.active;

        if (this.element) {
            this.toggleElementVisibility();
        }
    }

    private toggleElementVisibility = () => {
        this.element!.style.display = this.active ? 'block' : 'none';
    };

    private disableOtherAnnotations() {
        annotationRegistry.forEach((annotation) => {
            if (annotation !== this && annotation.active) {
                annotation.onClick();
            }
        });
    }
}