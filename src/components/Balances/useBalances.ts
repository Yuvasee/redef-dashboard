import { useMemo } from "react";
import { useTable, useFlexLayout, HeaderPropGetter, CellPropGetter } from "react-table";

import { useAppSelector } from "src/store";
import { selectAddress } from "src/store/selectors";
import { useGetBalancesQuery, useGetQuotesQuery } from "src/store/bitqueryApi";
import { balancesToAddresses, toFixed } from "src/utils";
import { useSmWidth } from "src/styles/common";

type BalancesTableData = Record<string, string | number | undefined>;

export function useBalances() {
    const address = useAppSelector(selectAddress);
    const { data: balances, isLoading: balancesIsLoading } = useGetBalancesQuery(address);

    const currencyAddresses = balancesToAddresses(balances);
    const { data: quotes, isLoading: quotesIsLoading } = useGetQuotesQuery(currencyAddresses, {
        skip: !currencyAddresses.length,
    });

    const smWidth = useSmWidth();

    const columns = useMemo(
        () => [
            {
                accessor: "asset",
                Header: "Asset",
            },
            ...(smWidth
                ? []
                : [
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
                  ]),
            {
                accessor: "value",
                Header: "Value",
                Cell: ({ value }: any) => (value ? `$${toFixed(value, 0)}` : "-"),
                width: 100,
            },
        ],
        [smWidth]
    );

    const data = useMemo<BalancesTableData[]>(() => {
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

    const getStyles = (columnId: string) =>
        columnId === "value" ? { justifyContent: "flex-end", display: "flex" } : {};

    const headerProps: HeaderPropGetter<BalancesTableData> = (props, { column }) => [
        props,
        { style: getStyles(column.id) },
    ];

    const cellProps: CellPropGetter<BalancesTableData> = (props, { cell }) => [
        props,
        { style: getStyles(cell.column.id) },
    ];

    return {
        showLoader: balancesIsLoading || quotesIsLoading,
        headerProps,
        cellProps,
        ...tableInstance,
    };
}
