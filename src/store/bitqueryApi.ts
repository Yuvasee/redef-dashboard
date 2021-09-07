import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { gql } from "graphql-request";

type GetBalancesResponse = {
    ethereum: {
        address: {
            balances: {
                value: number;
                currency: {
                    name: string;
                    address: string;
                    symbol: string;
                    tokenId: string;
                    tokenType: string;
                    decimals: number;
                };
            }[];
        }[];
    };
};

const getBalancesQuery = (address: string) => ({
    document: gql`
        query GetBalances {
            ethereum(network: ethereum) {
                address(address: { is: "${address}" }) {
                    balances {
                        value
                        currency {
                            name
                            address
                            symbol
                            tokenId
                            tokenType
                            decimals
                        }
                    }
                }
            }
        }
    `,
});

export const bitqueryApi = createApi({
    reducerPath: "bitqueryApi",
    baseQuery: graphqlRequestBaseQuery({
        url: "https://graphql.bitquery.io/",
        requestHeaders: {
            "X-API-KEY": process.env.REACT_APP_BITQUERY_KEY!,
        },
    }),
    endpoints: (builder) => ({
        getBalances: builder.query<GetBalancesResponse, string>({
            query: getBalancesQuery,
        }),
    }),
});

export const { useGetBalancesQuery } = bitqueryApi;
