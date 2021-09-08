import { Typography } from "@material-ui/core";
import styled, { css } from "styled-components";

import { sm } from "src/styles/common";

export const SectionHeader = styled(Typography).attrs({
    variant: "h5",
})`
    margin-bottom: 0.4em;

    ${sm(css`
        font-size: 2.125rem;
        font-weight: 400;
        line-height: 1.235;
        letter-spacing: 0.00735em;
    `)}
`;
