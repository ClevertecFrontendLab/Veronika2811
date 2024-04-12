import { TrainingInviteStatus } from '@constants/invite/training-invite-status';

import { Nullebel } from '../nullebel';
import { TrainingResponse } from '../training';

type InviteFrom = {
    _id: string;
    lastName: Nullebel<string>;
    imageSrc: Nullebel<string>;
    firstName?: string;
};

export type InviteResponse = {
    _id: string;
    from: InviteFrom;
    training: TrainingResponse;
    status: string;
    createdAt: string;
};

export type TrainingInviteResponse = InviteResponse & {
    to: InviteFrom;
};

export type InviteData = {
    to: string;
    trainingId: string;
};

export type InviteStatusData = {
    id: string;
    status: typeof TrainingInviteStatus.ACCEPTED | typeof TrainingInviteStatus.REJECTED;
};

export type InviteIdData = {
    inviteId: Nullebel<string>;
};
