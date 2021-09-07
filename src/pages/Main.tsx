import styled from "styled-components";
import { Box } from "@material-ui/core";

import { useAppSelector } from "../store";
import { selectAddress } from "../store/selectors";
import Balances from "src/components/Balances";
import Approvals from "src/components/Approvals";

const MainBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Section = styled(Box)`
    margin: 1em;
`;

const Address = styled(Box)``;

function Main() {
    const address = useAppSelector(selectAddress);

    return (
        <MainBox>
            <Address>Address: {address}</Address>
            <Section>
                <Balances />
            </Section>
            <Section>
                <Approvals />
            </Section>
        </MainBox>
    );
}

export default Main;
