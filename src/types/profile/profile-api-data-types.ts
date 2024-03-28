import { UploadFile } from 'antd/lib/upload/interface';

export type UserAvatar = {
    file: UploadFile;
};

type CommonUserInfo = {
    email?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: string | UserAvatar;
    readyForJointTraining?: boolean;
    sendNotification?: boolean;
};

type UserCurrentTariff = {
    tariffId: string;
    expired: string;
};

export type UserInfoResponse = CommonUserInfo & {
    tariff: UserCurrentTariff;
};

export type UserInfoData = CommonUserInfo & {
    password?: string;
};
