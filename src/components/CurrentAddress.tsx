import styled from "styled-components";
import { Box } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { blueGrey } from "@material-ui/core/colors";

import { useAppSelector, useAppDispatch } from "../store";
import { selectAddress } from "../store/selectors";
import { Address } from "src/elements/Address";
import { clear } from "src/store/addressSlice";

const CurrentAddressBox = styled(Box)`
    display: flex;
    align-items: center;
    & > span {
        font-weight: bold;
        padding-right: 0.2rem;
    }
    & > svg {
        width: 1em;
        color: ${blueGrey[200]};
        margin-left: 1rem;
        cursor: pointer;
        position: relative;
        top: -0.1em;
    }
`;

function CurrentAddress() {
    const address = useAppSelector(selectAddress);
    const dispatch = useAppDispatch();

    const handleClearAddress = () => {
        dispatch(clear());
    };

    return (
        <CurrentAddressBox>
            <span>Current address: </span>
            <Address address={address} />
            <ClearIcon titleAccess="Explore another address" onClick={handleClearAddress} />
        </CurrentAddressBox>
    );
}

export default CurrentAddress;
