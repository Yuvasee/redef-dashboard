import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";

import { makeGetApprovalsEndpoint } from "./getApprovals";
import { makeGetBalancesEndpoint } from "./getBalances";
import { makeGetQuotesEndpoint } from "./getQuotes";

export const bitqueryApi = createApi({
    reducerPath: "bitqueryApi",
    baseQuery: graphqlRequestBaseQuery({
        url: "https://graphql.bitquery.io/",
        requestHeaders: {
            "X-API-KEY": process.env.REACT_APP_BITQUERY_KEY!,
        },
    }),
    endpoints: (builder) => ({
        getBalances: makeGetBalancesEndpoint(builder),
        getQuotes: makeGetQuotesEndpoint(builder),
        getApprovals: makeGetApprovalsEndpoint(builder),
    }),
});

export const { useGetBalancesQuery, useGetQuotesQuery, useGetApprovalsQuery } = bitqueryApi;
