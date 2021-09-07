import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { gql } from "graphql-request";

import config from "src/config";

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

type GetQuotesResponse = {
    ethereum: {
        [key: `q${number}`]: {
            baseCurrency: { symbol: string };
            quoteCurrency: { symbol: string };
            quotePrice: number;
            exchange: { fullName: string };
            transaction: { index: number };
            block: { height: number };
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

const getQuotesQuery = (currencies: string[]) => ({
    document: gql`
        query GetQuotes {
            ethereum(network: ethereum) {
                ${currencies
                    .map(
                        (currency, i) => `
                        q${i}: dexTrades(
                            quoteCurrency: { is: "${config.usdtAddress}" }
                            baseCurrency: { is: "${currency}" }
                            options: { desc: ["block.height", "transaction.index"], limit: 1 }
                        ) {
                            baseCurrency {
                                symbol
                            }
                            quoteCurrency {
                                symbol
                            }
                            quotePrice
                            exchange {
                                fullName
                            }
                            transaction {
                                index
                            }
                            block {
                                height
                            }
                        }
                    `
                    )
                    .join()}
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
        getQuotes: builder.query<GetQuotesResponse, string[]>({
            query: getQuotesQuery,
        }),
    }),
});

export const { useGetBalancesQuery, useGetQuotesQuery } = bitqueryApi;
