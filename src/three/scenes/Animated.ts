import SceneDescriptor from '@/three/core/SceneDescriptor';
import * as THREE from 'three';
import RenderContext from '@/three/core/RenderContext';
import SceneContext from '@/three/core/SceneContext';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

export default class Animated implements SceneDescriptor {
    static getRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas,
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.shadowMap.enabled = true

        return renderer;
    }

    static getCamera(canvas: HTMLCanvasElement): THREE.Camera {
        const camera = new THREE.PerspectiveCamera(
            90,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            10000,
        );
        camera.position.set(-10, 15, 35);
        return camera;
    }

    static async getSceneContext(renderContext: RenderContext): Promise<SceneContext> {
        const scene = new THREE.Scene();
        const context = new SceneContext(scene);
        scene.background = new THREE.Color(0x000000);

        const controls = new OrbitControls(renderContext.getCamera(), renderContext.getRenderer().domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 0;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        controls.maxPolarAngle = Math.PI / 2;
        context.addDynamicObject(controls);

        const gltfLoader = new GLTFLoader().setPath('/assets/terem/');
        const gltf = await gltfLoader.loadAsync('scene.gltf');

        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
        context.addDynamicObject(mixer);

        const redSign = new THREE.PointLight(0x7d0033, 1, 20, 3)
        redSign.castShadow = true;
        redSign.position.set(-10.5, 5, 3.5);

        const blueLamp1 = new THREE.PointLight(0x00fffd, 0.3, 50, 4);
        blueLamp1.castShadow = true;
        blueLamp1.position.set(3, 18, 2);

        const blueLamp2 = new THREE.PointLight(0x00fffd, 0.7, 80, 4);
        blueLamp2.castShadow = true;
        blueLamp2.position.set(1.5, 20, -3);

        const blueLamp3 = new THREE.PointLight(0x00fffd, 0.4, 65, 4);
        blueLamp3.castShadow = true;
        blueLamp3.position.set(2.6, 12, -3.6);

        gltf.scene.traverse((node) => {
            node.castShadow = true;
            node.receiveShadow = true;
        });

        scene.add(
            gltf.scene,
            redSign,
            blueLamp1,
            blueLamp2,
            blueLamp3,
        );

        return context;
    }
}