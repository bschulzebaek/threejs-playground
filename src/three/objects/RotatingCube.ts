import { BoxGeometry, DoubleSide, Mesh, MeshNormalMaterial, MeshStandardMaterial } from 'three';
import SceneObject from '@/three/objects/SceneObject.interface';

export default class RotatingCube implements SceneObject {
    private readonly geometry: BoxGeometry;
    private readonly mesh: Mesh<BoxGeometry, MeshNormalMaterial>;

    constructor(width: number, height: number, depth: number) {
        this.geometry = new BoxGeometry(width, height, depth);
        this.mesh = new Mesh(this.geometry, new MeshStandardMaterial( {
            color: 0xffffff,
            opacity: 1.0,
            side: DoubleSide,
            transparent: false,
        }));
    }

    public getObject(): Mesh<BoxGeometry, MeshNormalMaterial> {
        return this.mesh;
    }

    public update(delta: number) {
        this.mesh.rotation.x = delta / 2;
        this.mesh.rotation.y = delta;
    }
}