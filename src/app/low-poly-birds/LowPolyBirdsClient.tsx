'use client';
import SceneContainer from '@/components/SceneContainer';
import styles from '@/styles/pages/low-poly-birds.module.scss';
import { util } from 'zod';

function toggleAnimations() {
    // @ts-ignore
    (globalThis.__animations as THREE.AnimationAction[]).forEach((animation) => {
        animation.paused = !animation.paused;
    });
}

function setAnimationSpeed(timeScale: string) {
    // @ts-ignore
    if (!globalThis.__animations) {
        return;
    }

    let time = parseInt(timeScale);

    if (isNaN(time)) {
        time = 0;
    }

    // @ts-ignore
    (globalThis.__animations as THREE.AnimationAction[]).forEach((animation) => {
        animation.timeScale = time;
    });
}

export default function LowPolyBirdsClient() {
    const controls = (
        <ul className={styles.actions}>
            <li>
                <button onClick={toggleAnimations}>
                    Play/Pause Animations
                </button>
            </li>

            <li>
                <input
                    type="number"
                    placeholder="Animation Speed"
                    defaultValue={1}
                    onChange={(event) => setAnimationSpeed(event.target.value)}
                />
            </li>
        </ul>
    );

    return (
        <SceneContainer
            name={'LowPolyBirdsDescriptor'}
            children={controls}
        />
    );
}