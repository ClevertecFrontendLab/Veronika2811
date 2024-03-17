import type { Moment } from 'moment';

import { Footer, FooterEdit } from './components';

import { isEditModeSelector } from '@redux/selectors';
import { useAppSelector } from '@hooks/reduxHooks';
import { TrainingResponse } from '@/types/training/trainingApiDataTypes';

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
