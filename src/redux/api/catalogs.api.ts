import {
    setCatalogTariffList,
    setCatalogTrainingList,
    setCatalogTrainingPals,
    setCatalogUserJoinTrainingList,
} from '@redux/slice/catalogs-slice';
import { setIsLoading } from '@redux/slice/main-slice';

import { ApiEndpoints } from './constants/api-endpoints';
import emptyApi from './empty-api';

import {
    CatalogTariffListResponse,
    CatalogTrainingListResponse,
    CatalogTrainingPalsResponse,
    JointTrainingParticipantsQuery,
} from '@/types/catalogs';

export const catalogsApi = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        getCatalogTrainingList: build.query<CatalogTrainingListResponse[], void>({
            query: () => ApiEndpoints.CATALOGS_TRAINING_LIST,

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setCatalogTrainingList(data));
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
        }),
        getCatalogsTariffList: build.query<CatalogTariffListResponse[], void>({
            query: () => ApiEndpoints.CATALOGS_TARIFF_LIST,

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
        getCatalogsUserJoinTrainingList: build.query<
            CatalogTrainingPalsResponse[],
            JointTrainingParticipantsQuery
        >({
            query: ({ trainingType, status }) => {
                const queryParams: Record<string, string | undefined> = {};

                if (trainingType) {
                    queryParams.trainingType = trainingType;
                }
                if (status !== null) {
                    queryParams.status = status;
                }

                return {
                    url: ApiEndpoints.CATALOGS_USER_JOIN_TRAAINING_LIST,
                    method: 'GET',
                    params: queryParams,
                };
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setCatalogUserJoinTrainingList(data));
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
        }),
        getCatalogsTrainingPals: build.query<CatalogTrainingPalsResponse[], void>({
            query: () => ApiEndpoints.CATALOGS_TRAINING_PALS,

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setCatalogTrainingPals(data));
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
        }),
    }),
});

export const {
    useLazyGetCatalogTrainingListQuery,
    useLazyGetCatalogsTariffListQuery,
    useLazyGetCatalogsTrainingPalsQuery,
    useGetCatalogsTrainingPalsQuery,
    useLazyGetCatalogsUserJoinTrainingListQuery,
} = catalogsApi;
