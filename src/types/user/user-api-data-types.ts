type CommonUserInfo = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
};

type UserCurrentTariff = {
    tariffId: string;
    expired: string;
};

export type UserInfoResponse = CommonUserInfo & {
    tariff: UserCurrentTariff;
};

export type UserInfoData = CommonUserInfo & {
    password: string;
};
