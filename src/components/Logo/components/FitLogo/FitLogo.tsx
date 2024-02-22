import classNames from 'classnames/bind';

import { LogoSizeType } from '@components/Logo/types/types';

import styles from './FitLogo.module.scss';

const cx = classNames.bind(styles);

export const FitLogo = ({ size = 'sm' }: { size?: LogoSizeType }) => {
    const logoClass = cx({
        fit: true,
        [`fit-${size}`]: true,
    });

    return (
        <svg
            className={logoClass}
            viewBox='0 0 35 31'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M29.7528 8.2545H33.9956V12.8163H29.7528V21.5332C29.7528 24.5 29.9369 24.4912 30.3052 24.8388C30.6734 25.1863 31.4099 25.3601 32.5147 25.3601C32.8829 25.4036 33.2051 25.3601 33.5734 25.3167C33.8956 25.3167 34.3408 25.0706 34.571 24.8388V29.6178C33.9956 29.8631 33.3432 30.1392 32.6988 30.1392C32.0083 30.1826 31.3639 30.1826 30.7194 30.1826C30.6763 30.1826 29.9475 30.1826 29.6406 30.1392C28.893 30.0333 27.7813 29.6395 27.0909 29.2485C26.7073 29.0313 25.7099 28.0538 25.5949 27.6193C25.2496 27.0762 25.0576 26.0118 25.0576 24.8822V12.8163H20.9917V8.2545H25.0576V0.651489H29.7528V8.2545Z'
                fill='#10239E'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0.737793 12.8163H3.96V29.6613H9.11556V12.8163H12.9362L12.9362 8.2545H9.11554L9.11556 7.86349C9.11556 6.95113 9.29969 6.08472 9.66794 5.69371C10.0362 5.3027 10.6806 5.08547 11.6013 5.08547C12.4298 5.08547 13.2124 5.12891 13.9949 5.2158V0.651495L12.2457 0.651489L10.5195 0.651495C8.33298 0.651495 6.6068 1.70393 5.5711 2.71517C4.23618 4.01854 3.96 5.51742 3.96 7.47248L3.95997 8.2545H0.73777L0.737793 12.8163ZM19.6107 14.7714H14.5933V29.6613H19.6107V14.7714Z'
                fill='#10239E'
            />
            <path
                d='M19.6107 10.5789C19.6107 11.9023 18.5175 12.9751 17.1941 12.9751C15.8706 12.9751 14.7774 11.9023 14.7774 10.5789C14.7774 9.25545 15.8706 8.18261 17.1941 8.18261C18.5175 8.18261 19.6107 9.25546 19.6107 10.5789Z'
                fill='#40A9FF'
            />
        </svg>
    );
};
