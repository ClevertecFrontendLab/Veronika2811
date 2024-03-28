import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './utils/base-query';

const emptyApi = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: () => ({}),
});

export default emptyApi;
