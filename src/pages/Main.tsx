import styled from "styled-components";
import { Box } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";

import { useAppSelector } from "../store";
import { selectAddress } from "../store/selectors";
import { useGetBalancesQuery } from "../store/bitqueryApi";

const MainBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Address = styled(Box)``;
const Balances = styled(Box)``;
const Balance = styled(Box)`
    display: flex;
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

function Main() {
    const address = useAppSelector(selectAddress);
    const { data, error, isLoading } = useGetBalancesQuery(address);
    const balances = data?.ethereum?.address[0]?.balances.filter((balance) => balance.value);

    return (
        <MainBox>
            <Address>Address: {address}</Address>
            {!!balances?.length && (
                <Balances>
                    {balances.map((balance) => {
                        const {
                            value,
                            currency: { name, symbol },
                        } = balance;
                        return (
                            <Balance>
                                <Name>{name}</Name>
                                <Symbol>{symbol}</Symbol>
                                <Value>{parseFloat(String(value)).toFixed(2)}</Value>
                            </Balance>
                        );
                    })}
                </Balances>
            )}
        </MainBox>
    );
}

export default Main;
