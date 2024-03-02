import { Button } from 'antd';
import { push } from 'redux-first-history';

import { useAppDispatch } from '@hooks/reduxHooks';
import { Paths } from '@routes/constants/Paths';

import styles from './ButtonSeeReviews.module.scss';

export const ButtonSeeReviews = () => {
    const dispatch = useAppDispatch();

    const handleSeeReviewsClick = () => {
        dispatch(push(`${Paths.FEEDBACKS}`));
    };

    return (
        <Button
            type='text'
            className={styles['footer-button']}
            onClick={handleSeeReviewsClick}
            data-test-id='see-reviews'
        >
            Смотреть отзывы
        </Button>
    );
};
