import styles from '../styles/pages/index.module.scss';
import SceneContainer from '@/components/SceneContainer';
import PageMenu from '@/components/PageMenu';

export default function Home() {
    return (
        <main className={styles.pageIndex}>
            <PageMenu />
            <SceneContainer />
        </main>
    )
}
