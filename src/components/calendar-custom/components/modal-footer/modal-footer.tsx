import { useAppSelector } from '@hooks/redux-hooks';
import { isEditModeSelector } from '@redux/selectors';
import type { Moment } from 'moment';

import { Footer, FooterEdit } from './components';

import { TrainingResponse } from '@/types/training/training-api-data-types';

type ModalFooterProps = {
    date: Moment;
    cellContent: TrainingResponse[];
    refetchUserTrainingList: () => void;
};

export const ModalFooter = ({ date, cellContent, refetchUserTrainingList }: ModalFooterProps) => {
    const isEditMode = useAppSelector(isEditModeSelector);

    if (isEditMode) {
        return <FooterEdit date={date} refetchUserTrainingList={refetchUserTrainingList} />;
    }

    return <Footer date={date} cellContent={cellContent} />;
};
