import type RenderContext from '@/three/core/RenderContext';
import { PerspectiveCamera } from 'three';

export default function setResizeListener(renderContext: RenderContext) {
    window.addEventListener('resize', () => {
        const camera = renderContext.getCamera() as PerspectiveCamera;
        const canvas = renderContext.getCanvas();

        canvas.style.width = `${canvas.parentElement!.clientWidth}px`;
        canvas.style.height = `${canvas.parentElement!.clientHeight}px`;

        renderContext.getRenderer().setSize(canvas.clientWidth, canvas.clientHeight);
        camera.aspect = 1;
        camera.updateMatrix();
    });
}