import { FC } from 'react';
import { Empty } from 'antd';

import styles from './empty-custom.module.less';

export const EmptyCustom: FC<{ description?: string | boolean }> = ({ description = false }) => (
    <Empty
        className={styles.empty}
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        imageStyle={{
            height: 32,
            width: 32,
        }}
        description={description}
    />
);
