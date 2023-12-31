import RenderContext from '@/three/core/RenderContext';

export default function setPageVisibilityListener(renderContext: RenderContext) {
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            renderContext.getLoop().start();
        } else {
            renderContext.getLoop().stop();
        }
    });
}