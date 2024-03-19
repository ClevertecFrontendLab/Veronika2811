import React, { MouseEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { useBreakpoints } from '@hooks/use-breakpoints';
import { trainingSlice } from '@redux/selectors';
import { resetState, setModalVisible } from '@redux/slice/training-slice';
import { Calendar } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';

import { DATE_FORMAT_DAY } from './constants/date-format';
import { PICKER_LOCALE } from './constants/picker-locale';
import { SelectedCellInfo } from './types/selected-cell-info';
import { filterTrainingsByDate } from './utils/filter-trainings-by-date';
import styles from './calendar-custom.module.less';
import { TrainingList, TrainingModal } from './components';

import { TrainingResponse } from '@/types/training/training-api-data-types';

moment.updateLocale('ru', {
    week: {
        dow: 1,
    },
});

type CalendarCustomProps = {
    refetchUserTrainingList: () => void;
};

export const CalendarCustom = ({ refetchUserTrainingList }: CalendarCustomProps) => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedCellInfo, setSelectedCellInfo] = useState<SelectedCellInfo | null>(null);

    const { userTrainingList, isModalVisible } = useAppSelector(trainingSlice);
    const dispatch = useAppDispatch();

    const { isXs } = useBreakpoints();

    const onTrainingModalClose = () => dispatch(resetState());

    const handleCellClick = (event: MouseEvent, date: Moment, listWorkouts: TrainingResponse[]) => {
        onTrainingModalClose();

        const { target } = event;

        if (target instanceof HTMLElement) {
            setSelectedDate(date);

            const cellHTMLElement = target.closest('td');
            const bodyHTMLElement: HTMLDivElement | null = target.closest('.ant-picker-body');

            if (date.month() === selectedDate.month()) {
                if (!isXs && cellHTMLElement instanceof HTMLTableCellElement) {
                    setSelectedCellInfo({
                        cellHTMLElement,
                        cellContent: listWorkouts,
                    });
                } else if (bodyHTMLElement instanceof HTMLDivElement) {
                    setSelectedCellInfo({
                        cellHTMLElement: bodyHTMLElement,
                        cellContent: listWorkouts,
                    });
                }
                dispatch(setModalVisible(true));
            }
        }
    };

    const dateFullCellRender = (date: Moment) => {
        const trainingList = filterTrainingsByDate(userTrainingList, date);

        const isUserTraningInSelectedDay = trainingList.length > 0;
        const isUserTrainingAndNotMobile = isUserTraningInSelectedDay && !isXs;
        const formattedDate = date.format(DATE_FORMAT_DAY);

        const responsiveClassName = isUserTraningInSelectedDay && isXs ? 'mobile-date' : '';

        const onCellClick = (event: React.MouseEvent) => {
            if (!isXs) {
                event.stopPropagation();
            }

            handleCellClick(event, date, trainingList);
        };

        return (
            <div
                className={`ant-picker-cell-inner ant-picker-calendar-date ${responsiveClassName}`}
                onClick={onCellClick}
                role='presentation'
            >
                <div className='ant-picker-calendar-date-value'>{formattedDate}</div>
                <div className='ant-picker-calendar-date-content'>
                    {isUserTrainingAndNotMobile && (
                        <TrainingList data={trainingList} className={styles['cell-render-list']} />
                    )}
                </div>
            </div>
        );
    };

    const shouldShowTrainingModal = selectedCellInfo && isModalVisible;

    return (
        <React.Fragment>
            <Calendar
                locale={PICKER_LOCALE}
                dateFullCellRender={dateFullCellRender}
                className={styles.calendar}
                fullscreen={!isXs}
                // onSelect={onTrainingModalClose}
            />

            {shouldShowTrainingModal && (
                <TrainingModal
                    date={selectedDate}
                    selectedCellInfo={selectedCellInfo}
                    closeModal={onTrainingModalClose}
                    refetchUserTrainingList={refetchUserTrainingList}
                />
            )}
        </React.Fragment>
    );
};
