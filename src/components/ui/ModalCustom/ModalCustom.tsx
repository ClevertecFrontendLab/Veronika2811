import { ReactNode } from 'react';
import { Modal } from 'antd';

type ModalCustomProps = {
    open: boolean;
    closeIcon?: ReactNode;
    className?: string;
    children?: ReactNode;
    closable?: boolean;
    width?: number;
    testIds?: string;
    onCancel?: () => void;
};

export const ModalCustom = ({
    open,
    closable = false,
    children,
    width = 539,
    testIds,
    onCancel,
    closeIcon,
    className,
}: ModalCustomProps) => (
    <Modal
        centered
        width={width}
        open={open}
        footer={null}
        closable={closable}
        maskStyle={{ backdropFilter: 'blur(4px)', background: 'rgba(121, 156, 212, 0.5)' }}
        onCancel={onCancel}
        data-test-id={testIds}
        closeIcon={closeIcon}
        className={className}
    >
        {children}
    </Modal>
);
