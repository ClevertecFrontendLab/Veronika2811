import { Button, Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { TRAINING_MODAL_WIDTH } from '@components/CalendarCustom/constants/trainingModalWidth';
import { TrainingTestIds } from '@components/CalendarCustom/constants/trainingTestId';

import { DrawerFooter, DrawerForm, DrawerTitle } from './components';

import { editTrainingSelector } from '@redux/selectors';
import { setDrawerVisible } from '@redux/slice/trainingSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { useBreakpoints } from '@hooks/useBreakpoints';

import styles from './DrawerCustom.module.less';

type DrawerCustomProps = {
    open: boolean;
    date: string;
};

export const DrawerCustom = ({ open, date }: DrawerCustomProps) => {
    const editTraining = useAppSelector(editTrainingSelector);
    const dispatch = useAppDispatch();

    const { isXs } = useBreakpoints();

    const onCloseDrawer = () => dispatch(setDrawerVisible(false));

    const isPastTraining = editTraining?.type === 'past-training';

    return (
        <Drawer
            data-test-id={TrainingTestIds.MODAL_DRAWER_RIGHT}
            placement={!isXs ? 'right' : 'bottom'}
            onClose={onCloseDrawer}
            open={open}
            mask={false}
            width={!isXs ? TRAINING_MODAL_WIDTH.drawer : TRAINING_MODAL_WIDTH.drawer_mobile}
            closable={false}
            destroyOnClose
            className={styles['drawer']}
            height=''
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
                    data-test-id={TrainingTestIds.MODAL_DRAWER_RIGHT_BUTTON_CLOSE}
                />
            }
        >
            <DrawerForm onCloseDrawer={onCloseDrawer} />
        </Drawer>
    );
};
