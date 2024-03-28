import { setCatalogTariffList } from '@redux/slice/catalogs-slice';
import { setIsLoading } from '@redux/slice/main-slice';

import { ApiEndpoints } from './constants/api-endpoints';
import emptyApi from './empty-api';

import {
    CatalogTariffListResponse,
    CatalogTrainingListResponse,
} from '@/types/catalogs/catalogs-api-data-types';

export const catalogsApi = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        getCatalogTrainingList: build.query<CatalogTrainingListResponse[], void>({
            query: () => ApiEndpoints.CATALOGS_TRAINING_LIST,
        }),
        getCatalogsTariffList: build.query<CatalogTariffListResponse[], void>({
            query: () => '/catalogs/tariff-list',

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setCatalogTariffList(data));
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
        }),
    }),
});

export const { useLazyGetCatalogTrainingListQuery, useLazyGetCatalogsTariffListQuery } =
    catalogsApi;
