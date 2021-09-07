import styled from "styled-components";
import { TextField, Box, Button, Typography } from "@material-ui/core";
import { ChangeEventHandler, SyntheticEvent } from "react";

import { useAppDispatch, useAppSelector } from "../store";
import { setValue, submit } from "../store/addressSlice";
import { selectAddress, selectAddressShowError } from "../store/selectors";

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
    const dispatch = useAppDispatch();
    const address = useAppSelector(selectAddress);
    const showError = useAppSelector(selectAddressShowError);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch(setValue(e.target.value));
    };

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        dispatch(submit());
    };

    console.log(address);

    return (
        <form onSubmit={handleSubmit}>
            <WelcomeBox>
                <Header variant="h3">Enter an&nbsp;Ethereum address to&nbsp;explore…</Header>
                <Input
                    id="outlined-basic"
                    label="Ethereum address"
                    placeholder="0x…"
                    variant="outlined"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    error={showError}
                    helperText={showError ? "Submitted value is not a valid Ethereum address" : " "}
                />
                <Start variant="contained" color="primary" type="submit">
                    Start
                </Start>
            </WelcomeBox>
        </form>
    );
}

export default Welcome;
