import { FC } from 'react';
import { LogoSizeType } from '@components/ui/logo-app/types/types';
import classNames from 'classnames/bind';

import styles from './clever-logo.module.less';

const cx = classNames.bind(styles);

export const CleverLogo: FC<{ size?: LogoSizeType }> = ({ size = 'sm' }) => {
    const logoClass = cx({
        clever: true,
        [`clever-${size}`]: true,
    });

    return (
        <svg
            className={logoClass}
            viewBox='0 0 98 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M86.2627 7.14589H90.9234V10.1987H90.9924C91.1996 9.7217 91.5103 9.2447 91.9246 8.7995C92.3043 8.3543 92.7531 8.00449 93.271 7.68649C93.7543 7.36849 94.3067 7.14589 94.8936 6.95509C95.446 6.79608 96.0674 6.73248 96.6888 6.70068C96.9995 6.70068 97.3448 6.76428 97.7591 6.85968V11.0573C97.5174 11.0255 97.2412 10.9937 96.9305 10.9619C96.5853 10.9301 96.2745 10.8983 95.9984 10.8983C95.1007 10.8983 94.3412 11.0573 93.7198 11.3117C93.0984 11.5979 92.5805 11.9795 92.2008 12.4565C91.821 12.9335 91.5448 13.4741 91.4067 14.1101C91.2341 14.7461 91.165 15.4457 91.165 16.1771V23.6608H86.2627V7.14589Z'
                fill='#10239E'
            />
            <path
                d='M79.6615 13.6013C79.4198 12.4565 79.0055 11.5979 78.4186 10.9937C77.8317 10.4213 76.9341 10.1351 75.7603 10.1033C74.9663 10.1033 74.3103 10.2305 73.7925 10.4849C73.2746 10.7393 72.8603 11.0255 72.5496 11.3753C72.2389 11.7569 72.0318 12.1385 71.8937 12.5201C71.7556 12.9335 71.6865 13.2833 71.6865 13.6013H79.6615ZM71.6865 16.4634C71.7556 17.9262 72.1353 19.0074 72.8949 19.6434C73.6199 20.3112 74.6901 20.6292 76.071 20.6292C77.0377 20.6292 77.9008 20.4066 78.6258 19.9614C79.3162 19.5162 79.7651 19.0074 79.9377 18.4986H84.2531C83.5627 20.4702 82.4924 21.9012 81.077 22.728C79.627 23.5866 77.9008 24 75.8984 24C74.4829 24 73.2056 23.8092 72.1008 23.3958C70.9615 22.9824 69.9949 22.3782 69.2354 21.615C68.4413 20.8518 67.8199 19.9614 67.4056 18.8802C66.9913 17.8308 66.7842 16.6542 66.7842 15.3821C66.7842 14.1737 66.9913 13.0289 67.4401 11.9477C67.8544 10.8983 68.4758 9.97611 69.3044 9.2129C70.0984 8.4497 71.0651 7.81369 72.1699 7.36849C73.2746 6.92328 74.5175 6.70068 75.8984 6.70068C77.4175 6.70068 78.7293 6.98689 79.8686 7.52749C80.9734 8.06809 81.9055 8.7995 82.6305 9.68991C83.3555 10.6121 83.8734 11.6615 84.2186 12.8063C84.5293 13.9829 84.6329 15.1913 84.5638 16.4634H71.6865Z'
                fill='#10239E'
            />
            <path
                d='M60.7615 23.6608H55.3068L49.2275 7.14587H54.3716L58.1346 18.3714H58.2037L61.9667 7.14587H66.8346L60.7615 23.6608Z'
                fill='#10239E'
            />
            <path
                d='M44.3177 13.6013C44.0761 12.4565 43.6618 11.5979 43.0749 10.9937C42.488 10.4213 41.5904 10.1351 40.4166 10.1033C39.6225 10.1033 38.9666 10.2305 38.4487 10.4849C37.9309 10.7393 37.5166 11.0255 37.2059 11.3753C36.8952 11.7569 36.688 12.1385 36.5499 12.5201C36.4118 12.9335 36.3428 13.2833 36.3428 13.6013H44.3177ZM36.3428 16.4634C36.4118 17.9262 36.7916 19.0074 37.5511 19.6434C38.2761 20.3112 39.3463 20.6292 40.7273 20.6292C41.6939 20.6292 42.557 20.4066 43.282 19.9614C43.9725 19.5162 44.4213 19.0074 44.5939 18.4986H48.9094C48.2189 20.4702 47.1487 21.9012 45.7332 22.728C44.2832 23.5866 42.557 24 40.5547 24C39.1392 24 37.8618 23.8092 36.7571 23.3958C35.6178 22.9824 34.6511 22.3782 33.8916 21.615C33.0976 20.8518 32.4761 19.9614 32.0619 18.8802C31.6476 17.8308 31.4404 16.6542 31.4404 15.3821C31.4404 14.1737 31.6476 13.0289 32.0964 11.9477C32.5107 10.8983 33.1321 9.97611 33.9607 9.2129C34.7547 8.4497 35.7214 7.81369 36.8261 7.36849C37.9309 6.92328 39.1737 6.70068 40.5547 6.70068C42.0737 6.70068 43.3856 6.98689 44.5249 7.52749C45.6296 8.06809 46.5618 8.7995 47.2868 9.68991C48.0118 10.6121 48.5296 11.6615 48.8748 12.8063C49.1856 13.9829 49.2891 15.1913 49.2201 16.4634H36.3428Z'
                fill='#10239E'
            />
            <path d='M24.8569 0.128662H29.6902V23.6608H24.8569V0.128662Z' fill='#10239E' />
            <path
                d='M17.5473 8.22473C17.4435 7.65769 17.2358 7.15366 16.9243 6.68113C16.5782 6.20859 16.1975 5.79906 15.713 5.42104C15.2285 5.07451 14.6747 4.79099 14.0517 4.60198C13.4287 4.41296 12.8057 4.31846 12.1482 4.28695C10.9022 4.28695 9.86388 4.50747 9.03324 4.9485C8.16799 5.38953 7.47579 5.95657 6.95663 6.68113C6.40287 7.40568 6.02216 8.22473 5.77989 9.1383C5.53762 10.0834 5.43379 11.0284 5.43379 12.005C5.43379 12.9501 5.53762 13.8951 5.77989 14.7772C6.02216 15.6593 6.40287 16.4783 6.95663 17.1714C7.47579 17.8959 8.16799 18.463 9.03324 18.904C9.86388 19.345 10.9022 19.534 12.1482 19.534C13.8094 19.534 15.09 19.093 16.0245 18.1479C16.959 17.2344 17.5473 16.0058 17.755 14.4937H23.0157C22.8773 15.9113 22.4966 17.1714 21.9428 18.3054C21.3544 19.4395 20.593 20.4161 19.6585 21.2037C18.6895 22.0227 17.5819 22.6213 16.336 23.0308C15.0554 23.4718 13.671 23.6608 12.1482 23.6608C10.2446 23.6608 8.5487 23.3773 7.02585 22.7788C5.50301 22.1802 4.25704 21.3612 3.21874 20.2901C2.18044 19.2505 1.3844 18.0219 0.830643 16.6043C0.276881 15.1867 0 13.6431 0 12.005C0 10.3354 0.276881 8.79177 0.830643 7.34267C1.3844 5.89357 2.18044 4.63348 3.21874 3.5624C4.25704 2.52283 5.50301 1.67227 7.02585 1.04223C8.5487 0.443684 10.2446 0.160164 12.1482 0.128662C13.4979 0.128662 14.7785 0.317675 15.9899 0.664199C17.2012 1.04223 18.2741 1.54626 19.2432 2.23931C20.2123 2.93236 21.0083 3.75142 21.6313 4.75949C22.2543 5.76756 22.635 6.93314 22.8081 8.22473H17.5473Z'
                fill='#10239E'
            />
        </svg>
    );
};
