import {
    MeshBasicMaterial,
    SphereGeometry,
    Mesh,
    Vector3,
    LineSegments,
    EdgesGeometry,
    LineBasicMaterial, Object3D, Light,
} from 'three';
import SceneObject from '@/three/objects/SceneObject.interface';

export default class OrbitingSphere implements SceneObject {
    private readonly obj: Object3D;
    private readonly geometry: SphereGeometry;
    private readonly mesh: Mesh<SphereGeometry, MeshBasicMaterial>;
    private readonly pivot: Object3D;

    constructor(
        radius: number,
        pivot: Vector3,
        private readonly offset: Vector3,
        private readonly rotation: Vector3,
        private readonly light?: Light,
    ) {
        this.obj = new Object3D();
        this.geometry = new SphereGeometry(radius, 32, 16);
        this.mesh = new Mesh(this.geometry, new MeshBasicMaterial({
            color: light ? light.color : 0x000000,
        }));

        this.pivot = new Object3D();
        this.pivot.position.copy(pivot);
        this.pivot.add(this.mesh);

        this.mesh.position.add(offset);

        if (light) {
            this.mesh.add(light);
        }

        this.pivot.add(this.mesh);

        this.addWireframe();
    }

    public getObject(): Object3D {
        return this.pivot;
    }

    public update(delta: number) {
        this.pivot.rotateX(this.rotation.x);
        this.pivot.rotateY(this.rotation.y);
        this.pivot.rotateZ(this.rotation.z);
    }

    public addWireframe() {
        const geo = new EdgesGeometry(this.mesh.geometry);
        const mat = new LineBasicMaterial({ color: 0xffffff });
        this.mesh.add(new LineSegments(geo, mat));
    }
}