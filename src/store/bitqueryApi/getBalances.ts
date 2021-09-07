import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";

export type Balance = {
    value: number;
    currency: {
        name: string;
        address: string;
        symbol: string;
        tokenId: string;
        tokenType: string;
        decimals: number;
    };
};

type GetBalancesResponse = {
    ethereum: {
        address: {
            balances: Balance[];
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

export const makeGetBalancesEndpoint = (builder: EndpointBuilder<BaseQueryFn, never, string>) =>
    builder.query<Balance[], string>({
        query: getBalancesQuery,
        transformResponse: (response: GetBalancesResponse) =>
            response?.ethereum?.address[0]?.balances.filter((balance) => balance.value) || [],
    });
