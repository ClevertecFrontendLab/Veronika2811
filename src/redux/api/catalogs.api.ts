import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './constants/baseUrl';
import prepareHeaders from './utils/prepareHeaders';

import { CatalogTrainingList } from '@/types/catalogs/catalogsApiDataTypes';

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
