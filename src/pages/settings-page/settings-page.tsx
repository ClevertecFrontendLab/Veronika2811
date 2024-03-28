import { useEffect } from 'react';
import { SettingsHeader } from '@components/page-headers/settings-header';
import { SettingsContent } from '@components/settings-content';
import { useLazyGetCatalogsTariffListQuery } from '@redux/api/catalogs.api';

import styles from './settings-page.module.less';

export const SettingsPage = () => {
    const [getCatalogsTariffList] = useLazyGetCatalogsTariffListQuery();

    useEffect(() => {
        getCatalogsTariffList();
    }, [getCatalogsTariffList]);

    return (
        <div className={styles['settings-page']}>
            <SettingsHeader />
            <div className={styles['settings-background']}>
                <SettingsContent />
            </div>
        </div>
    );
};
