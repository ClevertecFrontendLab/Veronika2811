import { ResultCustom } from '@components/ResultCustom';

import { ModalCustom } from '../ModalCustom';

type ModalServerErrorProps = {
    open: boolean;
    testIds: string;
    statusCode: string;
    onClickCloseModal: () => void;
};

export const ModalServerError = ({
    open,
    testIds,
    statusCode,
    onClickCloseModal,
}: ModalServerErrorProps) => (
    <ModalCustom open={open} testIds={testIds}>
        <ResultCustom statusCode={statusCode} onClick={onClickCloseModal} />
    </ModalCustom>
);
