import styled from "styled-components";
import { Box } from "@material-ui/core";

import { useAppSelector } from "../store";
import { selectAddress } from "../store/selectors";

const MainBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function Main() {
    const address = useAppSelector(selectAddress);

    return <MainBox>Address: {address}</MainBox>;
}

export default Main;
