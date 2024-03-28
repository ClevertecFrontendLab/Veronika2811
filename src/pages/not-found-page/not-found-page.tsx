import React from 'react';
import { push } from 'redux-first-history';
import { useAppDispatch } from '@hooks/redux-hooks';
import { Paths } from '@routes/constants/router-paths';
import { Button, Result } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import styles from './not-found-page.module.less';

export const NotFoundPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const goToMainPage = () => dispatch(push(Paths.MAIN));

    return (
        <Content className={styles['not-found-page']}>
            <div className={styles['not-found-page-content']}>
                <Result
                    status='404'
                    title='Такой страницы нет'
                    subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
                    extra={
                        <Button type='primary' size='large' onClick={goToMainPage}>
                            На главную
                        </Button>
                    }
                />
            </div>
        </Content>
    );
};
