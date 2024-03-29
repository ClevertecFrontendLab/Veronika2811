import { push } from 'redux-first-history';
import { Button } from 'antd';

import { useAppDispatch } from '@hooks/reduxHooks';
import { Paths } from '@routes/constants/Paths';

import styles from './ButtonSeeReviews.module.less';

export const ButtonSeeReviews = () => {
    const dispatch = useAppDispatch();

    const handleSeeReviewsClick = () => {
        dispatch(push(`${Paths.FEEDBACKS}`));
    };

    return (
        <Button
            type='link'
            className={styles['footer-button']}
            onClick={handleSeeReviewsClick}
            data-test-id='see-reviews'
        >
            Смотреть отзывы
        </Button>
    );
};
