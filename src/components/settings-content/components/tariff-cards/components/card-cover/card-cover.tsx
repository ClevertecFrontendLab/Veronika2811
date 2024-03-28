import { FC } from 'react';
import { AppTariff } from '@components/settings-content/constants/app-tariffs';

import styles from './card-cover.module.less';

type CardCoverProps = {
    isUserPro: boolean;
    card: AppTariff;
};

export const CardCover: FC<CardCoverProps> = ({ isUserPro, card }) => {
    const { key, imgActive, img } = card;

    const coverImageSrc = key === 'pro' && isUserPro ? imgActive : img;

    return <img className={styles.cover} src={coverImageSrc} alt='tariff' />;
};
