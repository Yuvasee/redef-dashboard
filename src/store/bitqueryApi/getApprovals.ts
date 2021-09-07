import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { gql } from "graphql-request";

type GetApprovalsResponse = {
    ethereum: {
        smartContractCalls: {
            smartContract: {
                address: {
                    address: string;
                };
            };
        }[];
    };
};

const getApprovalsQuery = (address: string) => ({
    document: gql`
        query MyQuery {
            ethereum(network: ethereum) {
                smartContractCalls(
                    caller: { is: ${address} }
                    smartContractMethod: { is: "approve" }
                    options: { limit: 10 }
                ) {
                    smartContract {
                        address {
                            address
                        }
                    }
                }
            }
        }
    `,
});

export const makeGetApprovalsEndpoint = (builder: EndpointBuilder<BaseQueryFn, never, string>) =>
    builder.query<string[], string>({
        query: getApprovalsQuery,
        transformResponse: (response: GetApprovalsResponse) =>
            response?.ethereum?.smartContractCalls
                ?.map((contractCall) => contractCall?.smartContract?.address?.address)
                .filter(Boolean) || [],
    });
