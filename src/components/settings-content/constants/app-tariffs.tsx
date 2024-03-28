import imgFree from '@public/images/free.jpg';
import imgProAble from '@public/images/pro-able.jpg';
import imgProDisable from '@public/images/pro-disable.jpg';

export type AppTariff = {
    key: 'free' | 'pro';
    title: string;
    extra: string;
    img: string;
    imgActive?: string;
    dataTestId?: string;
};

export const APP_TARIFFS: AppTariff[] = [
    {
        key: 'free',
        title: 'FREE tarif',
        extra: 'Подробнее',
        img: imgFree,
    },
    {
        key: 'pro',
        title: 'PRO tarif',
        extra: 'Подробнее',
        img: imgProDisable,
        imgActive: imgProAble,
        dataTestId: 'pro-tariff-card',
    },
];
