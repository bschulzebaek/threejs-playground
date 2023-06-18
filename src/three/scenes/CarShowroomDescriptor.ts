import * as THREE from 'three';
import SceneDescriptor from '@/three/core/SceneDescriptor';
import RenderContext from '@/three/core/RenderContext';
import SceneContext from '@/three/core/SceneContext';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class CarShowroomDescriptor implements SceneDescriptor {
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
            0.1,
        );
        camera.position.set(-2.4, 0.8, -2);
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
        const gltfLoader = new GLTFLoader().setPath('/assets/roadster/');

        const [texture, gltf] = await Promise.all([
            textureLoader.loadAsync('/assets/roadster/background.png'),
            gltfLoader.loadAsync('scene.gltf'),
        ]);

        texture.mapping = THREE.EquirectangularRefractionMapping;
        scene.background = texture;
        scene.environment = texture;
        scene.backgroundBlurriness = 0.5;
        scene.backgroundIntensity = 0.5;

        scene.add(
            gltf.scene,
            new THREE.DirectionalLight(0x404040 , 3),
        );

        return context;
    }
}