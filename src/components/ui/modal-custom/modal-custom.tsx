import { CSSProperties, FC, ReactNode } from 'react';
import { Modal } from 'antd';

type ModalCustomProps = {
    open: boolean;
    closeIcon?: ReactNode;
    maskStyle?: CSSProperties;
    className?: string;
    children?: ReactNode;
    closable?: boolean;
    width?: number;
    testIds?: string;
    onCancel?: () => void;
};

export const ModalCustom: FC<ModalCustomProps> = ({
    open,
    closable = false,
    maskStyle,
    children,
    width = 539,
    testIds,
    onCancel,
    closeIcon,
    className,
}) => (
    <Modal
        centered={true}
        width={width}
        open={open}
        footer={null}
        closable={closable}
        maskStyle={
            maskStyle || { backdropFilter: 'blur(4px)', background: 'rgba(121, 156, 212, 0.5)' }
        }
        onCancel={onCancel}
        data-test-id={testIds}
        closeIcon={closeIcon}
        className={className}
    >
        {children}
    </Modal>
);
