import Lottie from 'lottie-react';
import animationData from './animations/animations.json';

import styles from './Loader.module.scss';

export const Loader = () => (
    <div className={styles['loader-container']} data-test-id='loader'>
        <Lottie animationData={animationData} loop={true} width='150px' height='150px' />
    </div>
);
