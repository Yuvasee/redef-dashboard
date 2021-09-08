import styled from "styled-components";
import { Box } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { indigo } from "@material-ui/core/colors";

import { useAppSelector, useAppDispatch } from "../store";
import { selectAddress } from "../store/selectors";
import { Address } from "src/elements/Address";
import { clear } from "src/store/addressSlice";

const SpacerBox = styled(Box)`
    flex-grow: 1;
    height: 3rem;
    display: flex;
    justify-content: center;
`;

const CurrentAddressBox = styled(Box)`
    display: flex;
    position: fixed;
    align-items: center;
    background: ${indigo[600]};
    color: white;
    height: 3rem;
    border-radius: 1.5rem;
    padding: 0.2rem 1rem 0;
    margin: 0 0.5rem;
    max-width: calc(100% - 1rem);

    & > svg {
        width: 1em;
        color: white;
        margin-left: 1rem;
        cursor: pointer;
        position: relative;
        top: -0.1em;
    }

    a:first-child {
        color: white;

        &::before {
            border-color: white;
        }
    }
`;

function CurrentAddress() {
    const address = useAppSelector(selectAddress);
    const dispatch = useAppDispatch();

    const handleClearAddress = () => {
        dispatch(clear());
    };

    return (
        <SpacerBox>
            <CurrentAddressBox>
                <Address address={address} />
                <ClearIcon titleAccess="Explore another address" onClick={handleClearAddress} />
            </CurrentAddressBox>
        </SpacerBox>
    );
}

export default CurrentAddress;
