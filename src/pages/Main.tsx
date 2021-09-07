import styled from "styled-components";
import { Box } from "@material-ui/core";

import CurrentAddress from "src/components/CurrentAddress";
import Balances from "src/components/Balances";
import Approvals from "src/components/Approvals";

const MainBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

const Section = styled(Box)`
    display: flex;
    margin: 1em;
`;

function Main() {
    return (
        <MainBox>
            <Section>
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
