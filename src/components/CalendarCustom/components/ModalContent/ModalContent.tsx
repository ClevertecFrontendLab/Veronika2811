import type { Moment } from 'moment';

import { Content, ContentEdit } from './components';

import { isEditModeSelector } from '@redux/selectors';
import { useAppSelector } from '@hooks/reduxHooks';

type ModalContentProps = {
    date: Moment;
};

export const ModalContent = ({ date }: ModalContentProps) => {
    const isEditMode = useAppSelector(isEditModeSelector);

    if (isEditMode) {
        return <ContentEdit />;
    }

    return <Content date={date} />;
};
