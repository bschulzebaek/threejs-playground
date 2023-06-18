import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SceneContext from '@/three/core/SceneContext';
import SceneDescriptor from '@/three/core/SceneDescriptor';
import RenderContext from '@/three/core/RenderContext';
import OrbitingSphere from '@/three/objects/OrbitingSphere';

export default class LandingDescriptor extends SceneDescriptor {
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
        camera.position.set(-20, 100, -1000);
        return camera;
    }

    static async getSceneContext(renderContext: RenderContext): Promise<SceneContext> {
        const scene = new THREE.Scene();
        const context = new SceneContext(scene);

        // scene.background = new THREE.Color(0x094782);
        // scene.fog = new THREE.FogExp2(0x094782, 0.001);

        const controls = new OrbitControls(renderContext.getCamera(), renderContext.getRenderer().domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 200;
        controls.maxDistance = 5000;
        controls.autoRotate = true;
        controls.autoRotateSpeed = -0.3;
        controls.maxPolarAngle = Math.PI / 2;
        context.addDynamicObject(controls);

        generateObjects(scene);

        context.addDynamicObject(new OrbitingSphere(
            15,
            new THREE.Vector3(-500, 200, 0),
            new THREE.Vector3(200, 0, 0),
            new THREE.Vector3(0, 0.01, 0),
            new THREE.PointLight(0xcd4c46, 0.7, 2000, 2),
        ));

        context.addDynamicObject(new OrbitingSphere(
           10,
            new THREE.Vector3(0, -200, -500),
            new THREE.Vector3(200, 0, 0),
            new THREE.Vector3(0, 0.008, 0),
            new THREE.PointLight(0x0b31a5, 1, 1000, 1),
        ));

        context.addDynamicObject(new OrbitingSphere(
           10,
            new THREE.Vector3(500, 100, -500),
            new THREE.Vector3(0, 0, 200),
            new THREE.Vector3(0, 0.002, 0),
            new THREE.PointLight(0x478f48, 1, 1500, 1),
        ));

        context.addDynamicObject(new OrbitingSphere(
           20,
            new THREE.Vector3(-500, 100, 500),
            new THREE.Vector3(0, 0, 200),
            new THREE.Vector3(0, 0.005, 0),
            new THREE.PointLight(0xecc846, 0.8, 1500, 2),
        ));

        scene.add(new THREE.AmbientLight(0xffffff, 0.05));

        return context;
    }
}

function generateObjects(scene: THREE.Scene) {
    for (let i = 0; i < 1000; i++) {
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x404040,
            clearcoat: Math.random(),
            clearcoatRoughness: Math.random()
        });

        const geometry = new THREE.SphereGeometry(
            Math.random() * 50 + 1,
            32,
            16
        );
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 3000 - 1500;
        mesh.position.y = Math.random() * mesh.geometry.parameters.radius * 50 - mesh.geometry.parameters.radius * 25
        mesh.position.z = Math.random() * 3000 - 1500;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;

        scene.add(mesh);
    }
}