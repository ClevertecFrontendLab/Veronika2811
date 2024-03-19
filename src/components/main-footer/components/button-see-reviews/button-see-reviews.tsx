import { push } from 'redux-first-history';
import { useAppDispatch } from '@hooks/redux-hooks';
import { Paths } from '@routes/constants/paths';
import { Button } from 'antd';

import styles from './button-see-reviews.module.less';

export const ButtonSeeReviews = () => {
    const dispatch = useAppDispatch();

    const handleSeeReviewsClick = () => {
        dispatch(push(`${Paths.FEEDBACKS}`));
    };

    return (
        <Button
            type='link'
            size='large'
            className={styles['footer-button']}
            onClick={handleSeeReviewsClick}
            data-test-id='see-reviews'
        >
            Смотреть отзывы
        </Button>
    );
};
