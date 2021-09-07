import styled from "styled-components";
import { Box, CircularProgress, Paper } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";

import { SectionHeader } from "src/elements/SectionHeader";
import { useBalances } from "./useBalances";

const BalancesBox = styled(Box)``;
const Loader = styled(Box)`
    width: 100%;
    text-align: center;
    padding: 4rem 0;
    color: ${blueGrey[400]};
    font-size: 90%;
    svg {
        color: ${blueGrey[200]};
    }
`;
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
                    <Loader>
                        <CircularProgress />
                        <div>Loading data&#8230;</div>
                    </Loader>
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
