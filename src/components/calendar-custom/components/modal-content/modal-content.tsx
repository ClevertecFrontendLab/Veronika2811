import { FC } from 'react';
import { useAppSelector } from '@hooks/redux-hooks';
import { trainingSelector } from '@redux/selectors';
import type { Moment } from 'moment';

import { Content, ContentEdit } from './components';

type ModalContentProps = {
    date: Moment;
};

export const ModalContent: FC<ModalContentProps> = ({ date }) => {
    const { isEditMode } = useAppSelector(trainingSelector);

    if (isEditMode) {
        return <ContentEdit />;
    }

    return <Content date={date} />;
};
