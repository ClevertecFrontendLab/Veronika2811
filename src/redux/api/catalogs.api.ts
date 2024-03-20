import { ApiEndpoints } from './constants/api-endpoints';
import emptyApi from './empty-api';

import { CatalogTrainingListResponse } from '@/types/catalogs/catalogs-api-data-types';

export const catalogsApi = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        getCatalogTrainingList: build.query<CatalogTrainingListResponse[], void>({
            query: () => ApiEndpoints.CATALOGS_TRAINING_LIST,
        }),
    }),
});

export const { useLazyGetCatalogTrainingListQuery } = catalogsApi;
