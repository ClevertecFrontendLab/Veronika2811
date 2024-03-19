import { ModalTitleProps } from '@components/calendar-custom/types/modal-title';
import { useAppSelector } from '@hooks/redux-hooks';
import { isEditModeSelector } from '@redux/selectors';

import { Title, TitleEdit } from './components';

export const ModalTitle = ({ date, cellContent, closeModal }: ModalTitleProps) => {
    const isEditMode = useAppSelector(isEditModeSelector);

    if (isEditMode) {
        return <TitleEdit cellContent={cellContent} />;
    }

    return <Title date={date} closeModal={closeModal} />;
};
