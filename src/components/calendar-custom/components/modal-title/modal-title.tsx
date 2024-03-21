import { FC } from 'react';
import { ModalTitleProps } from '@components/calendar-custom/types/modal-title';
import { useAppSelector } from '@hooks/redux-hooks';
import { trainingSelector } from '@redux/selectors';

import { Title, TitleEdit } from './components';

export const ModalTitle: FC<ModalTitleProps> = ({ date, cellContent, closeModal }) => {
    const { isEditMode } = useAppSelector(trainingSelector);

    if (isEditMode) {
        return <TitleEdit cellContent={cellContent} />;
    }

    return <Title date={date} closeModal={closeModal} />;
};
