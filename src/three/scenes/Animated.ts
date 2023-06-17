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

        return renderer;
    }

    static getCamera(canvas: HTMLCanvasElement): THREE.Camera {
        const camera = new THREE.PerspectiveCamera(
            90,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            10000,
        );
        camera.position.set(10, 35, 40);
        return camera;
    }

    static async getSceneContext(renderContext: RenderContext): Promise<SceneContext> {
        const scene = new THREE.Scene();
        const context = new SceneContext(scene);
        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.FogExp2(0x000000, 0.02);

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

        const moonLight = new THREE.PointLight(0xffffff, 0.5, 100, 6);
        moonLight.position.set(20, 100, -10);

        const redSign = new THREE.RectAreaLight(0x7d0033, 1, 7, 7);
        redSign.castShadow = true;
        redSign.rotateY(-0.8);
        redSign.position.set(-10.5, 5, 3.5);

        const redLamp1 = new THREE.PointLight(0x7d0033, 0.1, 5);
        redLamp1.position.set(0, 33, 0);

        const redLamp2 = new THREE.PointLight(0x7d0033, 0.1, 5);
        redLamp2.position.set(4, 38, -1);

        const redLamp3 = new THREE.PointLight(0x7d0033, 0.1, 5);
        redLamp3.position.set(4, 33, -4);

        const redLamp4 = new THREE.PointLight(0x7d0033, 0.1, 5);
        redLamp4.position.set(4, 33, -5);

        const blueLamp1 = new THREE.RectAreaLight(0x00fffd, 0.5, 0.2, 10);
        blueLamp1.position.set(0, 22, -0.5);

        const blueLamp2 = new THREE.RectAreaLight(0x00fffd, 0.5, 0.2, 10);
        blueLamp2.position.set(4.5, 19, -0.5);

        const blueLamp3 = new THREE.RectAreaLight(0x00fffd, 0.5, 0.2, 10);
        blueLamp3.position.set(3, 12, 0.5);

        const blueLamp4 = new THREE.RectAreaLight(0x00fffd, 0.5, 2, 3);
        blueLamp4.rotateY(-0.8);
        blueLamp4.position.set(-10.5, 3, 3.5);

        const blueLamp5 = new THREE.RectAreaLight(0x00fffd, 0.5, 0.2, 10);
        blueLamp5.position.set(-2, 18, -3.5);

        const blueLamp6 = new THREE.RectAreaLight(0x00fffd, 0.8, 2, 20);
        blueLamp6.position.set(1.5, 15, -2.5);

        const blueLamp7 = new THREE.RectAreaLight(0x00fffd, 0.5, 0.2, 10);
        blueLamp7.position.set(4, 20, -5.8);

        const blueLamp8 = new THREE.RectAreaLight(0x00fffd, 0.5, 2, 3);
        blueLamp8.lookAt(0, 2, 0);
        blueLamp8.position.set(5.7, 2, -14.3);

        const blueLamp9 = new THREE.RectAreaLight(0x00fffd, 0.5, 2, 3);
        blueLamp9.lookAt(0, 2, 0);
        blueLamp9.position.set(16.5, 1, 9);

        const bluePoint1 = new THREE.PointLight(0x00fffd, 0.05, 3);
        bluePoint1.position.set(27.8, 0.3, 5);

        const bluePoint2 = new THREE.PointLight(0x00fffd, 0.05, 3);
        bluePoint2.position.set(28.1, 0.3, 2.1);

        const bluePoint3 = new THREE.PointLight(0x00fffd, 0.05, 3);
        bluePoint3.position.set(24.8, 0.3, 1.5);

        const bluePoint4 = new THREE.PointLight(0x00fffd, 0.05, 3);
        bluePoint4.position.set(21.8, 0.3, 1.4);

        const bluePoint5 = new THREE.PointLight(0x00fffd, 0.05, 3);
        bluePoint5.position.set(19.7, 0.3, 1.4);

        const bluePoint6 = new THREE.PointLight(0x00fffd, 0.05, 3);
        bluePoint6.position.set(21.5, 0.3, -8);

        const bluePoint7 = new THREE.PointLight(0x00fffd, 0.05, 3);
        bluePoint7.position.set(17, 0.3, -8.4);

        const bluePoint8 = new THREE.PointLight(0x00fffd, 0.05, 3);
        bluePoint8.position.set(11.8, 0.3, -8.4);

        const bluePoint9 = new THREE.PointLight(0x00fffd, 0.05, 3);
        bluePoint9.position.set(7, 0.3, -8);

        const bluePoint10 = new THREE.PointLight(0x00fffd, 0.05, 3);
        bluePoint10.position.set(13.5, 0.3, 8.8);

        const bluePoint11 = new THREE.PointLight(0x00fffd, 0.05, 3);
        bluePoint11.position.set(13.5, 0.3, 15.8);

        const bluePoint12 = new THREE.PointLight(0x00fffd, 0.05, 3);
        bluePoint12.position.set(4.8, 0.3, 17.4);

        const bluePoint13 = new THREE.PointLight(0x00fffd, 0.05, 3);
        bluePoint13.position.set(-8.5, 0.3, 17.4);

        RectAreaLightUniformsLib.init();

        scene.add(
            gltf.scene,
            moonLight, redSign,
            redLamp1, redLamp2, redLamp3, redLamp4,
            blueLamp1, blueLamp2, blueLamp3, blueLamp4, blueLamp5,
            blueLamp6, blueLamp7, blueLamp8, blueLamp9,
            bluePoint1, bluePoint2, bluePoint3, bluePoint4, bluePoint5,
            bluePoint6, bluePoint7, bluePoint8, bluePoint9, bluePoint10,
            bluePoint11, bluePoint12, bluePoint13,
        );

        return context;
    }
}