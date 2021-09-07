import styled from "styled-components";
import { Box, Paper } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";

import { SectionHeader } from "src/elements/SectionHeader";
import { useBalances } from "./useBalances";
import Loader from "src/elements/Loader";

const BalancesBox = styled(Box)``;
const Table = styled(Paper)``;
const TableHeader = styled(Box)`
    font-weight: bold;
    border-bottom: 2px solid ${blueGrey[200]};
`;
const TableHeaderGroup = styled(Box)``;
const TableHeaderCell = styled(Box)`
    padding: 0.5rem 0.5rem 0;
`;
const TableBody = styled(Box)``;
const TableRow = styled(Box)`
    &:not(:last-child) {
        border-bottom: 1px solid ${blueGrey[100]};
    }
`;
const TableCell = styled(Box)`
    padding: 0.3rem 0.5rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

function Balances() {
    const { showLoader, getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useBalances();

    return (
        <BalancesBox>
            <SectionHeader>Token balances</SectionHeader>

            <Table {...getTableProps()}>
                <TableHeader>
                    {headerGroups.map((headerGroup) => (
                        <TableHeaderGroup {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <TableHeaderCell {...column.getHeaderProps()}>
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
                                        <TableCell {...cell.getCellProps()}>
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
