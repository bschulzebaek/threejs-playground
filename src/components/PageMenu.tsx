'use client';
import styles from '../styles/components/page-menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PageMenu() {
    const [visible, setVisibleState] = useState(false);
    const params = useSearchParams();

    let classNames = [styles.pageMenu];

    if (visible) {
        classNames.push(styles.pageMenuActive);
    }

    const scene = params.get('scene') ?? 'Default';

    return (
        <div className={classNames.join(' ')}>
            <FontAwesomeIcon
                className={styles.pageMenuToggle}
                icon={visible ? faTimes : faBars}
                onClick={() => setVisibleState(!visible)}
            />

            <div className={styles.pageMenuBackdrop}></div>

            <div className={styles.pageMenuBody}>
                <h2>Scene Selection</h2>
                <ul>
                    <li>
                        <Link
                            href="/"
                            className={ scene === 'Default' ? 'active' : '' }
                        >
                            Default
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/?scene=GlbSimple"
                            className={ scene === 'GlbSimple' ? 'active' : '' }
                        >
                            GLB Loader
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}