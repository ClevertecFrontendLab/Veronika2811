import { MainContent } from '@components/main-content';
import { MainFooter } from '@components/main-footer';
import { MainHeader } from '@components/main-header';

import styles from './main-page.module.less';

export const MainPage = () => (
    <div className={styles['main-page']}>
        <MainHeader />
        <MainContent />
        <MainFooter />
    </div>
);
