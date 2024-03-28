import { FC, ReactNode } from 'react';
import { useBreakpoints } from '@hooks/use-breakpoints';
import { Drawer } from 'antd';

type DrawerCustomProps = {
    testIds: string;
    children: ReactNode;
    onClose: () => void;
    open: boolean;
    closable: boolean;
    title: ReactNode;
    footer: ReactNode;
    extra: ReactNode;
    className: string;
};

export const DrawerCustom: FC<DrawerCustomProps> = ({
    testIds,
    children,
    onClose,
    open,
    closable,
    title,
    footer,
    extra,
    className,
}) => {
    const { isXs } = useBreakpoints();

    return (
        <Drawer
            data-test-id={testIds}
            placement={isXs ? 'bottom' : 'right'}
            onClose={onClose}
            open={open}
            mask={true}
            maskStyle={{ background: 'transparent' }}
            width={isXs ? '100%' : 408}
            closable={closable}
            destroyOnClose={true}
            height=''
            className={className}
            title={title}
            footer={footer}
            extra={extra}
        >
            {children}
        </Drawer>
    );
};
