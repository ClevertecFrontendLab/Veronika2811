import { ModalTitleProps } from '@components/CalendarCustom/types/modalTitle';

import { Title, TitleEdit } from './components';

import { isEditModeSelector } from '@redux/selectors';
import { useAppSelector } from '@hooks/reduxHooks';

export const ModalTitle = ({ date, cellContent, closeModal }: ModalTitleProps) => {
    const isEditMode = useAppSelector(isEditModeSelector);

    if (isEditMode) {
        return <TitleEdit cellContent={cellContent} />;
    }

    return <Title date={date} closeModal={closeModal} />;
};
