import { RootState } from '@redux/store';

type PrepareHeaders = (
    headers: Headers,
    api: {
        getState: () => unknown;
        extra?: unknown;
        endpoint?: string;
        type?: 'query' | 'mutation';
        forced?: boolean | undefined;
    },
) => Headers | void;

const prepareHeaders: PrepareHeaders = (headers, { getState }) => {
    const state = getState() as RootState;

    const { accessToken } = state.authSlice;

    if (!accessToken) {
        throw new Error('Отсутствует токен доступа');
    }

    headers.set('Authorization', `Bearer ${accessToken}`);

    return headers;
};

export default prepareHeaders;
