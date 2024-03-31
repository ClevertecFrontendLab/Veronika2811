import { FC } from 'react';
import { APP_TARIFFS } from '@components/settings-content/constants/app-tariffs';
import { SETTINGS_TEST_IDS } from '@components/settings-content/constants/settings-test-ids';
import { useAppSelector } from '@hooks/redux-hooks';
import { useBreakpoints } from '@hooks/use-breakpoints';
import { profileSelector } from '@redux/selectors';
import { Button, Card, Space } from 'antd';

import { CardContent } from './components/card-content';
import { CardCover } from './components/card-cover';
import styles from './tariff-cards.module.less';

export const TariffCards: FC<{ toogleDrawerVisible: () => void }> = ({ toogleDrawerVisible }) => {
    const { isXs } = useBreakpoints();

    const { currentUserInfo } = useAppSelector(profileSelector);

    const isUserPro = !!currentUserInfo.tariff;

    return (
        <Space className={styles.cards} size={isXs ? 11 : 25}>
            {APP_TARIFFS.map((el) => (
                <Card
                    key={el.key}
                    className={styles.card}
                    title={el.title}
                    extra={
                        <Button type='link' onClick={toogleDrawerVisible}>
                            {el.extra}
                        </Button>
                    }
                    bordered={false}
                    data-test-id={el.dataTestId ? SETTINGS_TEST_IDS.tariffproCard : null}
                    cover={
                        <div>
                            <CardCover isUserPro={isUserPro} card={el} />
                        </div>
                    }
                >
                    <CardContent tariff={el.key} toogleDrawerVisible={toogleDrawerVisible} />
                </Card>
            ))}
        </Space>
    );
};
