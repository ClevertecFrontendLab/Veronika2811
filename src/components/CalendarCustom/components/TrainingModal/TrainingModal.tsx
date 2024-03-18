import { useEffect, useState } from 'react';
import classNames from 'classnames';
import type { Moment } from 'moment';
import { Modal } from 'antd';

import { DATE_FORMAT } from '@components/CalendarCustom/constants/dateFormat';
import { TRAINING_MODAL_WIDTH } from '@components/CalendarCustom/constants/trainingModalWidth';
import { TrainingTestIds } from '@components/CalendarCustom/constants/trainingTestId';
import { SelectedCellInfo } from '@components/CalendarCustom/types/selectedCellInfo';

import { DrawerCustom } from '../DrawerCustom';
import { ModalContent } from '../ModalContent';
import { ModalFooter } from '../ModalFooter';
import { ModalTitle } from '../ModalTitle';

import {
    currentTrainingSelector,
    isDrawerVisibleSelector,
    isEditModeSelector,
    isModalVisibleSelector,
} from '@redux/selectors';
import { useAppSelector } from '@hooks/reduxHooks';
import { useBreakpoints } from '@hooks/useBreakpoints';

import styles from './TrainingModal.module.less';

type TrainingModalProps = {
    date: Moment;
    selectedCellInfo: SelectedCellInfo;
    closeModal: () => void;
    refetchUserTrainingList: () => void;
};

export const TrainingModal = ({
    date,
    selectedCellInfo,
    closeModal,
    refetchUserTrainingList,
}: TrainingModalProps) => {
    const [shouldAlignRight, setShouldAlignRight] = useState(false);

    const currentTraining = useAppSelector(currentTrainingSelector);
    const isModalVisible = useAppSelector(isModalVisibleSelector);
    const isDrawerVisible = useAppSelector(isDrawerVisibleSelector);
    const isEditMode = useAppSelector(isEditModeSelector);

    const { isXs } = useBreakpoints();

    const { cellHTMLElement, cellContent } = selectedCellInfo;

    useEffect(() => {
        if (!isXs) {
            const elementRect = cellHTMLElement.getBoundingClientRect();
            const elementRightOffset = window.innerWidth - elementRect.right;

            setShouldAlignRight(elementRightOffset < 300);
        }
    }, [cellHTMLElement, isXs]);

    const workoutCardModalStyle = cellContent.length > 0;

    const modalStyles = classNames({
        [styles.modal]: true,
        [styles['position-left']]: !shouldAlignRight && !isXs,
        [styles['position-right']]: shouldAlignRight && !isXs,
        [styles['position-bottom']]: isXs,
        [styles['workout-card-list']]: workoutCardModalStyle && !isEditMode,
        [styles['workout-card-empty']]: !workoutCardModalStyle && !isEditMode,
        [styles['workout-edit-list']]: currentTraining && isEditMode,
        [styles['workout-edit-empty']]: !currentTraining && isEditMode,
    });

    return (
        <>
            <Modal
                open={isModalVisible}
                mask={false}
                closable={false}
                getContainer={cellHTMLElement}
                width={isXs ? TRAINING_MODAL_WIDTH.mobile : TRAINING_MODAL_WIDTH.default}
                wrapClassName={modalStyles}
                destroyOnClose
                title={<ModalTitle date={date} cellContent={cellContent} closeModal={closeModal} />}
                footer={
                    <ModalFooter
                        date={date}
                        cellContent={cellContent}
                        refetchUserTrainingList={refetchUserTrainingList}
                    />
                }
                data-test-id={
                    !isEditMode
                        ? TrainingTestIds.MODAL_CREATE_TRAINING
                        : TrainingTestIds.MODAL_CREATE_EXERCISE
                }
                onCancel={closeModal}
            >
                <ModalContent date={date} />
            </Modal>
            <DrawerCustom open={isDrawerVisible} date={date.format(DATE_FORMAT)} />
        </>
    );
};
