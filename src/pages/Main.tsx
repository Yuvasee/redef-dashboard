import styled from "styled-components";
import { Box } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";

import { useAppSelector } from "../store";
import { selectAddress } from "../store/selectors";
import { useGetBalancesQuery, useGetQuotesQuery } from "../store/bitqueryApi";
import { balancesToAddresses, toFixed } from "src/utils";

const MainBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Address = styled(Box)``;
const Balances = styled(Box)``;
const Balance = styled(Box)`
    display: flex;
    align-items: center;
`;
const Name = styled(Box)``;

const Symbol = styled(Box)`
    margin: 0 1rem 0 0.4rem;
    color: ${blueGrey[200]};
`;

const Value = styled(Box)`
    flex-grow: 1;
    text-align: right;
`;

const UsdtValue = styled(Box)`
    flex-basis: 100px;
    padding-left: 0.4rem;
    font-size: 80%;
`;

function Main() {
    const address = useAppSelector(selectAddress);

    const {
        data: balances,
        error: balancesError,
        isLoading: balancesIsLoading,
    } = useGetBalancesQuery(address);

    const currencyAddresses = balancesToAddresses(balances);

    const {
        data: quotes,
        error: quotesError,
        isLoading: quotesIsLoading,
    } = useGetQuotesQuery(currencyAddresses, { skip: !currencyAddresses.length });

    return (
        <MainBox>
            <Address>Address: {address}</Address>

            {!!balances?.length && (
                <Balances>
                    {balances.map((balance, i) => {
                        const {
                            value,
                            currency: { name, symbol },
                        } = balance;

                        return (
                            <Balance key={symbol}>
                                <Name>{name}</Name>
                                <Symbol>{symbol}</Symbol>
                                <Value>{toFixed(value)}</Value>
                                <UsdtValue>
                                    {quotes?.[i] &&
                                        `${toFixed(quotes[i]!.quotePrice * value)} USDT`}
                                </UsdtValue>
                            </Balance>
                        );
                    })}
                </Balances>
            )}
        </MainBox>
    );
}

export default Main;
