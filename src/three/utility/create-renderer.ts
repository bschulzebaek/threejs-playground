import { WebGLRenderer } from 'three';

export default function(canvas: HTMLCanvasElement): WebGLRenderer {
    const renderer = new WebGLRenderer({
        antialias: true,
        canvas,
    });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    return renderer;
}