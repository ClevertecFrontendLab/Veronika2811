import emptyApi from './empty-api';

import { ErrorTypeResponse } from '@/types/error-types';

type NewTariffData = {
    tariffId: string;
    days: number;
};

export const trainingApi = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        addNewTariff: build.mutation<ErrorTypeResponse, NewTariffData>({
            query: (body) => ({
                url: '/tariff',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useAddNewTariffMutation } = trainingApi;
