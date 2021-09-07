import { Box, CircularProgress } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import styled from "styled-components";

type LoaderProps = {
    text: string;
};

const LoaderBox = styled(Box)`
    width: 100%;
    text-align: center;
    padding: 4rem 0;
    color: ${blueGrey[400]};
    font-size: 90%;
    svg {
        color: ${blueGrey[200]};
    }
`;

function Loader({ text }: LoaderProps) {
    return (
        <LoaderBox>
            <CircularProgress />
            <div>{text}&#8230;</div>
        </LoaderBox>
    );
}

export default Loader;
