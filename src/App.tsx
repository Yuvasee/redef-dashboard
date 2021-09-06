import styled from "styled-components";
import { Box } from "@material-ui/core";

import Welcome from "./pages/Welcome";

const AppBox = styled(Box)`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
`;

function App() {
    return (
        <AppBox>
            <Welcome />
        </AppBox>
    );
}

export default App;
