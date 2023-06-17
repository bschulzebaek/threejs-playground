import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SceneContext from '@/three/core/SceneContext';
import SceneDescriptor from '@/three/core/SceneDescriptor';
import RenderContext from '@/three/core/RenderContext';
import OrbitingSphere from '@/three/objects/OrbitingSphere';

export default class Simple extends SceneDescriptor {
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
        camera.position.set(250, 300, 500);
        return camera;
    }

    static async getSceneContext(renderContext: RenderContext): Promise<SceneContext> {
        const scene = new THREE.Scene();
        const context = new SceneContext(scene);

        scene.background = new THREE.Color(0xcccccc);
        scene.fog = new THREE.FogExp2(0xcccccc, 0.001);
        scene.add(new THREE.AxesHelper(500));

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
            new THREE.Vector3(-250, 100, 50),
            new THREE.Vector3(-50, 0, 0),
            new THREE.Vector3(0, 0.01, 0),
            new THREE.PointLight(0xff00000, 1, 500, 2),
        ));

        context.addDynamicObject(new OrbitingSphere(
           10,
            new THREE.Vector3(250, 60, -50),
            new THREE.Vector3(50, 0, 50),
            new THREE.Vector3(0, 0.005, 0),
            new THREE.PointLight(0x0000ff, 1, 500, 1),
        ));

        context.addDynamicObject(new OrbitingSphere(
           10,
            new THREE.Vector3(0, 60, 500),
            new THREE.Vector3(10, 0, 10),
            new THREE.Vector3(0, 0.005, 0),
            new THREE.PointLight(0x00ffff, 1, 500, 2),
        ));

        return context;
    }
}

function generateObjects(scene: THREE.Scene) {
    // const geometry = new THREE.CylinderGeometry(0, 10, 30, 4, 1);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        clearcoat: 1.0,
        clearcoatRoughness: 0
    });

    for (let i = 0; i < 500; i++) {
        const geometry = new THREE.SphereGeometry(
            Math.random() * 50 + 1,
            32,
            16
        );
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 1000 - 500;
        mesh.position.y = Math.random() * mesh.geometry.parameters.radius * 100 - mesh.geometry.parameters.radius * 50;
        mesh.position.z = Math.random() * 1000 - 500;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        scene.add(mesh);
    }
}