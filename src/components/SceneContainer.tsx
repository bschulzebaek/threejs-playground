'use client';

import styles from '../styles/components/scene-container.module.scss';
import { useRef, useEffect, MutableRefObject } from 'react';
import initScene, { DEFAULT_SCENE } from '@/three/core/init-scene';
import { useSearchParams } from 'next/navigation';

export default function SceneContainer() {
    const canvasRef: MutableRefObject<null | HTMLCanvasElement> = useRef(null);
    const sceneName = useSearchParams().get('scene') ?? DEFAULT_SCENE;

    useEffect(() => {
        initScene(canvasRef.current as HTMLCanvasElement, sceneName);
    });

    return (
        <div className={styles.sceneContainer}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}