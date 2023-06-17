import SceneDescriptor from '@/three/core/SceneDescriptor';
import * as THREE from 'three';
import RenderContext from '@/three/core/RenderContext';
import SceneContext from '@/three/core/SceneContext';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class GlbScene implements SceneDescriptor {
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
            1,
        );
        camera.position.set(250, 100, 200);
        return camera;
    }

    static async getSceneContext(renderContext: RenderContext): Promise<SceneContext> {
        const scene = new THREE.Scene();
        const context = new SceneContext(scene);

        scene.background = new THREE.Color(0x87ceeb);
        scene.fog = new THREE.FogExp2(0xcccccc, 0.001);
        const controls = new OrbitControls(renderContext.getCamera(), renderContext.getRenderer().domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 0;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
        controls.maxPolarAngle = Math.PI / 2;
        context.addDynamicObject(controls);

        const loader = new GLTFLoader().setPath('/assets/');
        const [parrotGltf, storkGltf, flamingoGltf] = await Promise.all([
            loader.loadAsync('Parrot.glb'),
            loader.loadAsync('Stork.glb'),
            loader.loadAsync('Flamingo.glb'),
        ]);

        const parrot = parrotGltf.scene.children[0];
        parrot.position.set(-100, 20, 50);

        const stork = storkGltf.scene.children[0];
        stork.position.set(100, -20, 0);

        const flamingo = flamingoGltf.scene.children[0];
        flamingo.position.set(0, 50, -100);

        const light = new THREE.PointLight(0xffffff, 1);
        light.position.set(0, 100, 0);

        scene.add(parrot, stork, flamingo, light, new THREE.AmbientLight(0xcccccc, 0.1));

        return context;
    }
}