import { useAppSelector } from '@hooks/redux-hooks';
import { trainingSlice } from '@redux/selectors';
import type { Moment } from 'moment';

import { Content, ContentEdit } from './components';

type ModalContentProps = {
    date: Moment;
};

export const ModalContent = ({ date }: ModalContentProps) => {
    const { isEditMode } = useAppSelector(trainingSlice);

    if (isEditMode) {
        return <ContentEdit />;
    }

    return <Content date={date} />;
};
