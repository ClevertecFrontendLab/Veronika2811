import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CatalogTrainingPalsResponse } from '@/types/catalogs';
import { InviteResponse } from '@/types/invite';

type TInitialState = {
    inviteList: InviteResponse[];
    acceptedUsersList: CatalogTrainingPalsResponse[];
};

const initialState: TInitialState = {
    inviteList: [],
    acceptedUsersList: [],
};

const inviteSlice = createSlice({
    name: 'CATALOGS_SLICE',
    initialState,
    reducers: {
        setInviteList: (state, action) => {
            state.inviteList = action.payload;
        },
        deleteInvite(state, { payload }: PayloadAction<string>) {
            state.inviteList = state.inviteList.filter((invite) => {
                const { _id: id } = invite;

                return id !== payload;
            });
        },
    },
});

const { actions, reducer: reducerInvite } = inviteSlice;

export const { setInviteList, deleteInvite } = actions;

export default reducerInvite;
