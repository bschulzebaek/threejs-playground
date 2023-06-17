import SceneDescriptor from '@/three/core/SceneDescriptor';
import * as THREE from 'three';
import RenderContext from '@/three/core/RenderContext';
import SceneContext from '@/three/core/SceneContext';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Texture } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

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
            0.1,
        );
        camera.position.set(3, 1.5, 2);
        return camera;
    }

    static async getSceneContext(renderContext: RenderContext): Promise<SceneContext> {
        const scene = new THREE.Scene();
        const context = new SceneContext(scene);

        scene.background = new THREE.Color(0x111111);

        const controls = new OrbitControls(renderContext.getCamera(), renderContext.getRenderer().domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 0;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
        controls.maxPolarAngle = Math.PI / 2;
        context.addDynamicObject(controls);


        const textureLoader = new THREE.TextureLoader();
        const gltfLoader = new GLTFLoader().setPath('/assets/aston_martin_valkyrie/');

        const [texture, gltf] = await Promise.all([
            textureLoader.loadAsync('/assets/aston_martin_valkyrie/background.png'),
            gltfLoader.loadAsync('scene.gltf'),
        ]);

        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
        scene.backgroundBlurriness = 0.5;

        scene.add(gltf.scene.children[0], new THREE.AmbientLight(0xffffff, 0.8));

        return context;
    }
}