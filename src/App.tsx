import styled from "styled-components";
import { Box } from "@material-ui/core";

import Main from "./pages/Main";
import Welcome from "./pages/Welcome";
import { useAppSelector } from "./store";
import { selectAddressIsValid } from "./store/selectors";

const AppBox = styled(Box)`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
`;

function App() {
    const hasValidAddress = useAppSelector(selectAddressIsValid);

    return <AppBox>{hasValidAddress ? <Main /> : <Welcome />}</AppBox>;
}

export default App;
