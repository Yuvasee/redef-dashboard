import styled, { css } from "styled-components";
import { Container } from "@material-ui/core";

import Main from "./pages/Main";
import Welcome from "./pages/Welcome";
import { useAppSelector } from "./store";
import { selectAddressIsValid } from "./store/selectors";
import { sm } from "src/styles/common";

const AppBox = styled(Container)`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 0 2rem 1rem;

    ${sm(css`
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 140%;
    `)}
`;

function App() {
    const hasValidAddress = useAppSelector(selectAddressIsValid);

    return <AppBox>{hasValidAddress ? <Main /> : <Welcome />}</AppBox>;
}

export default App;
