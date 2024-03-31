import React, { FC, useEffect, useState } from 'react';
import { TRAINING_MODAL_WIDTH } from '@components/calendar-custom/constants/training-modal-width';
import { TRAINING_TEST_IDS } from '@components/calendar-custom/constants/training-test-ids';
import { SelectedCellInfo } from '@components/calendar-custom/types/selected-cell-info';
import { DATE_FORMAT } from '@constants/date-format';
import { useAppSelector } from '@hooks/redux-hooks';
import { useBreakpoints } from '@hooks/use-breakpoints';
import { trainingSelector } from '@redux/selectors';
import { Modal } from 'antd';
import classNames from 'classnames';
import type { Moment } from 'moment';

import { DrawerCalendar } from '../drawer-calendar';
import { ModalContent } from '../modal-content';
import { ModalFooter } from '../modal-footer';
import { ModalTitle } from '../modal-title';

import styles from './training-modal.module.less';

type TrainingModalProps = {
    date: Moment;
    selectedCellInfo: SelectedCellInfo;
    closeModal: () => void;
    refetchUserTrainingList: () => void;
};

export const TrainingModal: FC<TrainingModalProps> = ({
    date,
    selectedCellInfo,
    closeModal,
    refetchUserTrainingList,
}) => {
    const [shouldAlignRight, setShouldAlignRight] = useState(false);

    const { currentTraining, isModalVisible, isDrawerVisible, isEditMode } =
        useAppSelector(trainingSelector);

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
        <React.Fragment>
            <Modal
                open={isModalVisible}
                mask={false}
                closable={false}
                getContainer={cellHTMLElement}
                width={isXs ? TRAINING_MODAL_WIDTH.mobile : TRAINING_MODAL_WIDTH.default}
                wrapClassName={modalStyles}
                destroyOnClose={true}
                title={<ModalTitle date={date} cellContent={cellContent} closeModal={closeModal} />}
                footer={
                    <ModalFooter
                        date={date}
                        cellContent={cellContent}
                        refetchUserTrainingList={refetchUserTrainingList}
                    />
                }
                data-test-id={
                    isEditMode
                        ? TRAINING_TEST_IDS.modalCreateExercise
                        : TRAINING_TEST_IDS.modalCreateTraining
                }
                onCancel={closeModal}
            >
                <ModalContent date={date} />
            </Modal>
            <DrawerCalendar open={isDrawerVisible} date={date.format(DATE_FORMAT)} />
        </React.Fragment>
    );
};
