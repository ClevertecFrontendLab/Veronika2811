import { CloseOutlined } from '@ant-design/icons';
import { TRAINING_MODAL_WIDTH } from '@components/calendar-custom/constants/training-modal-width';
import { TrainingTestIds } from '@components/calendar-custom/constants/training-test-id';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { useBreakpoints } from '@hooks/use-breakpoints';
import { trainingSlice } from '@redux/selectors';
import { setDrawerVisible } from '@redux/slice/training-slice';
import { Button, Drawer } from 'antd';

import { DrawerFooter, DrawerForm, DrawerTitle } from './components';
import styles from './drawer-custom.module.less';

type DrawerCustomProps = {
    open: boolean;
    date: string;
};

export const DrawerCustom = ({ open, date }: DrawerCustomProps) => {
    const { editTraining } = useAppSelector(trainingSlice);
    const dispatch = useAppDispatch();

    const { isXs } = useBreakpoints();

    const onCloseDrawer = () => dispatch(setDrawerVisible(false));

    const isPastTraining = editTraining?.type === 'past-training';

    return (
        <Drawer
            data-test-id={TrainingTestIds.MODAL_DRAWER_RIGHT}
            placement={isXs ? 'bottom' : 'right'}
            onClose={onCloseDrawer}
            open={open}
            mask={false}
            width={isXs ? TRAINING_MODAL_WIDTH.drawer_mobile : TRAINING_MODAL_WIDTH.drawer}
            closable={false}
            destroyOnClose={true}
            className={styles.drawer}
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
