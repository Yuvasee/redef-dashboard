import styled from "styled-components";
import { Box } from "@material-ui/core";

import CurrentAddress from "src/components/CurrentAddress";
import Balances from "src/components/Balances";
import Approvals from "src/components/Approvals";

const MainBox = styled(Box)`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    max-width: 100%;
`;

const Section = styled(Box)`
    display: flex;
    justify-content: center;
    margin: 1rem 0;
`;

function Main() {
    return (
        <MainBox>
            <Section justifyContent="center">
                <CurrentAddress />
            </Section>
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
