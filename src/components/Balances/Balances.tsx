import styled, { css } from "styled-components";
import { Box, Paper } from "@material-ui/core";
import { blueGrey, indigo } from "@material-ui/core/colors";

import { SectionHeader } from "src/elements/SectionHeader";
import { useBalances } from "./useBalances";
import Loader from "src/elements/Loader";
import { sm } from "src/styles/common";

const BalancesBox = styled(Box)`
    flex-grow: 1;
    max-width: 40rem;
`;

const Table = styled(Paper)`
    ${sm(css`
        border-radius: 0;
        margin-left: -1rem;
        margin-right: -1rem;
    `)}
`;

const TableHeader = styled(Box)`
    font-weight: bold;
    border-bottom: 2px solid ${indigo[200]};
`;

const TableHeaderGroup = styled(Box)``;

const TableHeaderCell = styled(Box)`
    padding: 0.5rem 0.6rem 0;

    ${sm(css`
        padding-left: 1rem;
        padding-right: 1rem;
    `)}
`;

const TableBody = styled(Box)``;

const TableRow = styled(Box)`
    &:not(:last-child) {
        border-bottom: 1px solid ${blueGrey[100]};
    }
`;

const TableCell = styled(Box)`
    padding: 0.3rem 0.6rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    ${sm(css`
        padding-left: 1rem;
        padding-right: 1rem;
    `)}
`;

function Balances() {
    const {
        showLoader,
        headerProps,
        cellProps,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useBalances();

    return (
        <BalancesBox>
            <SectionHeader>Token balances</SectionHeader>

            <Table {...getTableProps()}>
                <TableHeader>
                    {headerGroups.map((headerGroup) => (
                        <TableHeaderGroup {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <TableHeaderCell {...column.getHeaderProps(headerProps)}>
                                    {column.render("Header")}
                                </TableHeaderCell>
                            ))}
                        </TableHeaderGroup>
                    ))}
                </TableHeader>

                {showLoader ? (
                    <Loader text="Loading token balances" />
                ) : (
                    <TableBody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);

                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <TableCell {...cell.getCellProps(cellProps)}>
                                            {cell.render("Cell")}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                )}
            </Table>
        </BalancesBox>
    );
}

export default Balances;
