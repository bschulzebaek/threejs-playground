import * as THREE from 'three';
import SceneDescriptor from '@/three/core/SceneDescriptor';
import RenderContext from '@/three/core/RenderContext';
import SceneContext from '@/three/core/SceneContext';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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
        camera.position.set(5.7, 16, 57);
        camera.rotation.set(-0.27, 0.15, 0.04);
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
        controls.autoRotate = true;
        controls.autoRotateSpeed = -0.2;
        context.addDynamicObject(controls);

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

        return context;
    }
}