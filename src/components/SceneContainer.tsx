'use client';

import styles from '../styles/components/scene-container.module.scss';
import { useRef, useEffect, MutableRefObject, useState, Component, ReactNode } from 'react';
import initScene from '@/three/core/init-scene';
import SceneDescriptor from '@/three/core/SceneDescriptor';
import { useRouter } from 'next/navigation';
import SceneInitializedEvent from '@/three/events/SceneInitializedEvent';
import Loader from '@/components/Loader';

export default function SceneContainer({ name, children }: { name: string, children?: ReactNode }) {
    const [sceneReady, setSceneReady] = useState(false);
    const canvasRef: MutableRefObject<null | HTMLCanvasElement> = useRef(null);
    const router = useRouter();

    async function _initScene() {
        let descriptor: typeof SceneDescriptor | null = null;

        try {
            descriptor = (await import(`../three/scenes/${name}.ts`)).default;
        } catch {
            router.push('/');
        }

        initScene(canvasRef.current as HTMLCanvasElement, descriptor!);
    }

    function onSceneInitialized(event: SceneInitializedEvent) {
        setSceneReady(true);

        event.getLoop().start();
    }

    useEffect(() => {
        // @ts-ignore
        globalThis.addEventListener(SceneInitializedEvent.EVENT_NAME, onSceneInitialized);

        _initScene();

        return () => {
            // @ts-ignore
            globalThis.removeEventListener(SceneInitializedEvent.EVENT_NAME, onSceneInitialized);
        }
    });

    let classNames = [styles.sceneContainer];

    if (!sceneReady) {
        classNames.push(styles.hidden);
    }

    return (
        <div className={classNames.join(' ')}>
            <div className={styles.sceneContainerLoading}>
                <Loader />
            </div>
            <canvas ref={canvasRef}></canvas>
            <div className={styles.sceneContainerAdditional}>{children}</div>
        </div>
    );
}