import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './constants/base-url';
import prepareHeaders from './utils/prepare-headers';

import { CatalogTrainingList } from '@/types/catalogs/catalogs-api-data-types';

export const catalogsApi = createApi({
    reducerPath: 'CATALOGS_API',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/catalogs`,
        prepareHeaders,
    }),
    endpoints: (build) => ({
        getCatalogTrainingList: build.query<CatalogTrainingList, void>({
            query: () => '/training-list',
        }),
    }),
});

export const { useLazyGetCatalogTrainingListQuery } = catalogsApi;
