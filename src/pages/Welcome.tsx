import styled from "styled-components";
import { TextField, Box, Button, Typography } from "@material-ui/core";

const WelcomeBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 30rem;
`;

const Header = styled(Typography)``;

const Input = styled(TextField)`
    width: 100%;
    margin: 2rem 0;
`;

const Start = styled(Button)`
    align-self: flex-end;
`;

function Welcome() {
    return (
        <WelcomeBox>
            <Header variant="h3">Enter an&nbsp;Ethereum address to&nbsp;explore…</Header>
            <Input
                id="outlined-basic"
                label="Ethereum address"
                placeholder="0x"
                variant="outlined"
            />
            <Start variant="contained" color="primary">
                Start
            </Start>
        </WelcomeBox>
    );
}

export default Welcome;
