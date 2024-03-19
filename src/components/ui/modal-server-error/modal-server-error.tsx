import { ResultCustom } from '@components/result-custom';

import { ModalCustom } from '../modal-custom';

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
