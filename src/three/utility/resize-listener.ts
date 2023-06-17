import type RenderContext from '@/three/core/RenderContext';

export default function setResizeListener(renderContext: RenderContext) {
    window.addEventListener('resize', () => {
        const camera = renderContext.getCamera();
        const canvas = renderContext.getCanvas();

        canvas.style.width = `${canvas.parentElement!.clientWidth}px`;
        canvas.style.height = `${canvas.parentElement!.clientHeight}px`

        camera.updateMatrix();
        renderContext.getRenderer().setSize(canvas.clientWidth, canvas.clientHeight);
    });
}