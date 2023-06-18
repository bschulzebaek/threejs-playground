import * as THREE from 'three';
import SceneDescriptor from '@/three/core/SceneDescriptor';
import RenderContext from '@/three/core/RenderContext';
import SceneContext from '@/three/core/SceneContext';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Annotation from '@/three/objects/Annotation';

export default class FantasyDescriptor implements SceneDescriptor {
    static getRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas,
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.shadowMap.enabled = true;

        return renderer;
    }

    static getCamera(canvas: HTMLCanvasElement): THREE.Camera {
        const camera = new THREE.PerspectiveCamera(
            90,
            canvas.clientWidth / canvas.clientHeight,
            1,
        );
        camera.position.set(-49, 17, 56);
        camera.lookAt(new THREE.Vector3(-21, 12, -8));
        return camera;
    }

    static async getSceneContext(renderContext: RenderContext): Promise<SceneContext> {
        const scene = new THREE.Scene();
        const context = new SceneContext(scene);

        const controls = new OrbitControls(renderContext.getCamera(), renderContext.getRenderer().domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 0;
        controls.maxPolarAngle = Math.PI / 2;
        controls.autoRotate = false;
        context.addDynamicObject(controls);
        context.setControls(controls);

        const loader = new GLTFLoader().setPath('/assets/fantasy/');
        const gltf = await loader.loadAsync('scene.glb');

        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]);
        context.addDynamicObject(mixer);
        action.play();

        const mainLight = new THREE.PointLight(0x404040, 10, 500, 1);
        mainLight.position.set(25, 50, 25);
        mainLight.castShadow = true;

        const dirLight = new THREE.DirectionalLight(0x404040, 5);

        scene.background = new THREE.Color(0xb0ddf9);

        scene.add(
            gltf.scene,
            mainLight,
            dirLight,
        );

        const annotation1 = new Annotation(
            renderContext,
            context,
            '1',
            document.querySelector('#annotation-1') as HTMLElement,
            new THREE.Vector3(-49, 17, 56),
            new THREE.Vector3(-21, 12, -8),
        );
        const annotation2 = new Annotation(
            renderContext,
            context,
            '2',
            document.querySelector('#annotation-2') as HTMLElement,
            new THREE.Vector3(21, 9.5, 30),
        );
        const annotation3 = new Annotation(
            renderContext,
            context,
            '3',
            null,
            new THREE.Vector3(-0.5, 18.8, -25),
            new THREE.Vector3(-21, 12, -8),
        );

        annotation1.setPosition(-37, 1, 29);
        annotation1.setActive();
        annotation2.setPosition(6, 4.5, 23.5);
        annotation3.setPosition(-5.3, 11, -17);

        context.addDynamicObject(annotation1, annotation2);
        context.addStaticObject(annotation3);
        context.addClickableObject(annotation1, annotation2, annotation3);

        return context;
    }
}

function createAnnotation(renderContext: RenderContext, sceneContext: SceneContext, text: string) {




}