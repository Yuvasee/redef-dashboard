import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";

import config from "src/config";

export type Quote = {
    baseCurrency: {
        symbol: string;
    };
    quoteCurrency: {
        symbol: string;
    };
    quotePrice: number;
    exchange: {
        fullName: string;
    };
    transaction: {
        index: number;
    };
    block: {
        height: number;
    };
};

export type Quotes = (Quote | undefined)[];

type GetQuotesResponse = {
    ethereum: {
        [key: `q${number}`]: Quote[];
    };
};

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

export const makeGetQuotesEndpoint = (builder: EndpointBuilder<BaseQueryFn, never, string>) =>
    builder.query<Quotes, string[]>({
        query: getQuotesQuery,
        transformResponse: (response: GetQuotesResponse) =>
            Object.values(response?.ethereum || {}).map((element) => element[0]),
    });
