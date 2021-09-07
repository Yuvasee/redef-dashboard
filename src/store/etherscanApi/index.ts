import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

type GetContractAbiResponse = {
    status: string;
    message: string;
    result: string;
};

export const etherscanApi = createApi({
    reducerPath: "etherscanApi",
    baseQuery: retry(
        fetchBaseQuery({
            baseUrl: `https://api.etherscan.io/api?apikey=${process.env.REACT_APP_ETHERSCAN_KEY!}`,
        }),
        { maxRetries: 3 }
    ),
    endpoints: (builder) => ({
        getContractAbi: builder.query<GetContractAbiResponse, string>({
            query: (address) => ({
                url: `&module=contract&action=getabi&address=${address}`,
                validateStatus: (response: Response, result: any) =>
                    response.status === 200 && result.result !== "Max rate limit reached",
            }),
        }),
    }),
});

export const { useGetContractAbiQuery } = etherscanApi;
