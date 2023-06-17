import { BoxGeometry, Mesh, MeshNormalMaterial } from 'three';
import SceneObject from '@/three/objects/SceneObject.interface';

export default class RotatingCube implements SceneObject {
    private readonly geometry: BoxGeometry;
    private readonly mesh: Mesh<BoxGeometry, MeshNormalMaterial>;

    constructor(width: number, height: number, depth: number) {
        this.geometry = new BoxGeometry(width, height, depth);
        this.mesh = new Mesh(this.geometry, new MeshNormalMaterial());
    }

    public getMesh(): Mesh<BoxGeometry, MeshNormalMaterial> {
        return this.mesh;
    }

    public update(time: number) {
        this.mesh.rotation.x = time / 2000;
        this.mesh.rotation.y = time / 1000;
    }
}