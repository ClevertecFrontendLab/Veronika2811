import { ReactNode } from 'react';
import { Modal } from 'antd';

type ModalCustomProps = {
    open: boolean;
    children: ReactNode;
};

export const ModalCustom = ({ open, children }: ModalCustomProps) => (
    <Modal
        centered
        width={539}
        open={open}
        footer={null}
        closable={false}
        maskStyle={{ backdropFilter: 'blur(4px)', background: 'rgba(121, 156, 212, 0.5)' }}
    >
        {children}
    </Modal>
);
