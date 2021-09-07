import { useMemo } from "react";
import { useTable, useFlexLayout } from "react-table";

import { useAppSelector } from "src/store";
import { selectAddress } from "src/store/selectors";
import { useGetBalancesQuery, useGetQuotesQuery } from "src/store/bitqueryApi";
import { balancesToAddresses, toFixed } from "src/utils";

export function useBalances() {
    const address = useAppSelector(selectAddress);
    const { data: balances, isLoading: balancesIsLoading } = useGetBalancesQuery(address);

    const currencyAddresses = balancesToAddresses(balances);
    const { data: quotes, isLoading: quotesIsLoading } = useGetQuotesQuery(currencyAddresses, {
        skip: !currencyAddresses.length,
    });

    const columns = useMemo(
        () => [
            {
                accessor: "asset",
                Header: "Asset",
            },
            {
                accessor: "price",
                Header: "Price",
                Cell: ({ value }: any) => (value ? `$${toFixed(value)}` : "-"),
            },
            {
                accessor: "balance",
                Header: "Balance",
                Cell: ({ value }: any) => toFixed(value, 4),
            },
            {
                accessor: "value",
                Header: "Value",
                Cell: ({ value }: any) => (value ? `$${toFixed(value, 0)}` : "-"),
            },
        ],
        []
    );

    const data = useMemo<Record<string, string | number | undefined>[]>(() => {
        if (!balances) return [];
        return balances
            .map((balance, i) => {
                const {
                    value,
                    currency: { name, symbol },
                } = balance;

                const price = quotes?.[i]?.quotePrice;

                return {
                    asset: symbol || name,
                    price,
                    balance: value,
                    value: price !== undefined ? value * price : undefined,
                };
            })
            .filter((item) => item.asset !== "-")
            .sort((a, z) => (z.value || 0) - (a.value || 0));
    }, [balances, quotes]);

    const tableInstance = useTable({ columns, data }, useFlexLayout);

    return {
        showLoader: balancesIsLoading || quotesIsLoading,
        ...tableInstance,
    };
}
