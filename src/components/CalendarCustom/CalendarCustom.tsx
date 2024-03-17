import { MouseEvent, useState } from 'react';
import type { Moment } from 'moment';
import moment from 'moment';
import { Calendar } from 'antd';

import { TrainingList, TrainingModal } from './components';
import { DATE_FORMAT_DAY } from './constants/dateFormat';
import { PICKER_LOCALE } from './constants/pickerLocale';
import { SelectedCellInfo } from './types/selectedCellInfo';
import { filterTrainingsByDate } from './utils/filterTrainingsByDate';

import { isModalVisibleSelector, userTrainingListSelector } from '@redux/selectors';
import { resetState, setModalVisible } from '@redux/slice/trainingSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { useBreakpoints } from '@hooks/useBreakpoints';
import { TrainingResponse } from '@/types/training/trainingApiDataTypes';

import styles from './CalendarCustom.module.less';

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

    const userTrainingListData = useAppSelector(userTrainingListSelector);
    const isModalVisible = useAppSelector(isModalVisibleSelector);
    const dispatch = useAppDispatch();

    const { isXs } = useBreakpoints();

    const onTrainingModalClose = () => dispatch(resetState());

    const handleCellClick = (event: MouseEvent, date: Moment, listWorkouts: TrainingResponse[]) => {
        onTrainingModalClose();

        const target = event.target;

        if (target instanceof HTMLElement) {
            setSelectedDate(date);

            const cellHTMLElement = target.closest('td');
            const bodyHTMLElement: HTMLDivElement | null = target.closest('.ant-picker-body');

            if (date.month() === selectedDate.month()) {
                if(!isXs && cellHTMLElement instanceof HTMLTableCellElement) {
                    setSelectedCellInfo({
                        cellHTMLElement: cellHTMLElement,
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
        const trainingList = filterTrainingsByDate(userTrainingListData, date);

        const isUserTraningInSelectedDay = trainingList.length > 0;
        const isUserTrainingAndNotMobile = isUserTraningInSelectedDay && !isXs;
        const formattedDate = date.format(DATE_FORMAT_DAY);

        const responsiveClassName = isUserTraningInSelectedDay && isXs ? 'mobile-date' : '';

        const onCellClick = (event: React.MouseEvent) => {
            if(!isXs) {
                event.stopPropagation();
            }

            handleCellClick(event, date, trainingList)
        };

        return (
            <div
                className={`ant-picker-cell-inner ant-picker-calendar-date ${responsiveClassName}`}
                onClick={onCellClick}
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

    const shouldShowTrainingModal =
        selectedCellInfo && userTrainingListData.length && isModalVisible;

    return (
        <>
            <Calendar
                locale={PICKER_LOCALE}
                dateFullCellRender={dateFullCellRender}
                className={styles.calendar}
                fullscreen={!isXs}
            />

            {shouldShowTrainingModal && (
                <TrainingModal
                    date={selectedDate}
                    selectedCellInfo={selectedCellInfo}
                    closeModal={onTrainingModalClose}
                    refetchUserTrainingList={refetchUserTrainingList}
                />
            )}
        </>
    );
};
