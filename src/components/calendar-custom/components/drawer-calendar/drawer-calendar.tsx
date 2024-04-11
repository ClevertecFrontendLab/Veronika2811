import { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { TRAINING_TEST_IDS } from '@components/calendar-custom/constants/training-test-ids';
import { DrawerCustom } from '@components/ui/drawer-custom';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { setDrawerVisible } from '@redux/slice/training-slice';
import { checkIsPastTraining } from '@utils/check-is-past-training';
import { Button } from 'antd';

import { DrawerFooter, DrawerForm, DrawerTitle } from './components';
import styles from './drawer-calendar.module.less';

type DrawerCalendarProps = {
    open: boolean;
    date: string;
};

export const DrawerCalendar: FC<DrawerCalendarProps> = ({ open, date }) => {
    const { editTraining } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();

    const onCloseDrawer = () => dispatch(setDrawerVisible(false));

    const isPastTraining = checkIsPastTraining(editTraining?.type);

    return (
        <DrawerCustom
            testIds={TRAINING_TEST_IDS.modalDrawer}
            onClose={onCloseDrawer}
            open={open}
            closable={false}
            title={<DrawerTitle date={date} />}
            footer={isPastTraining ? <DrawerFooter /> : null}
            extra={
                <Button
                    key='submit-drawer-form'
                    htmlType='submit'
                    size='small'
                    type='text'
                    form='drawer-form'
                    icon={<CloseOutlined className='drawer-close-icon' />}
                    data-test-id={TRAINING_TEST_IDS.modalDrawerButtonClose}
                />
            }
            className={styles.drawer}
        >
            <DrawerForm onCloseDrawer={onCloseDrawer} />
        </DrawerCustom>
    );
};
