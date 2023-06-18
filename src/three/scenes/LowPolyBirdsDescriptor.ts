import SceneDescriptor from '@/three/core/SceneDescriptor';
import * as THREE from 'three';
import RenderContext from '@/three/core/RenderContext';
import SceneContext from '@/three/core/SceneContext';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class LowPolyBirdsDescriptor implements SceneDescriptor {
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
        camera.position.set(150, 95, 225);
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
        context.addDynamicObject(controls);

        const textureLoader = new THREE.TextureLoader();
        const loader = new GLTFLoader().setPath('/assets/birds/');
        const [texture, parrotGltf, storkGltf, flamingoGltf] = await Promise.all([
            textureLoader.loadAsync('/assets/birds/sky.png'),
            loader.loadAsync('Parrot.glb'),
            loader.loadAsync('Stork.glb'),
            loader.loadAsync('Flamingo.glb'),
        ]);

        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
        scene.backgroundBlurriness = 0.3;

        setupBird(parrotGltf, context, new THREE.Vector3(-100, 20, 50));
        setupBird(storkGltf, context, new THREE.Vector3(100, -20, 0));
        setupBird(flamingoGltf, context, new THREE.Vector3(0, 50, -100));

        const mainLight = new THREE.DirectionalLight('white', 0.5);
        mainLight.position.set(10, 10, 10);
        mainLight.castShadow = true;

        scene.add(
            mainLight,
            new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5),
        );

        return context;
    }
}

function setupBird(gltf: GLTF, context: SceneContext, position: THREE.Vector3) {
    const bird = gltf.scene.children[0];
    bird.position.copy(position)
    bird.castShadow = true;
    bird.receiveShadow = true;

    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[0]);

    action.play();

    // @ts-ignore
    globalThis.__animations = [ ...(globalThis.__animations || []), action];

    context.addDynamicObject(mixer);
    context.getScene().add(bird);
}