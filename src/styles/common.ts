import { css, FlattenSimpleInterpolation } from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const SM_WIDTH = "600px";

export function sm(styles: FlattenSimpleInterpolation | string) {
    return css`
        @media screen and (max-width: ${SM_WIDTH}) {
            ${styles}
        }
    `;
}

export function useSmWidth() {
    return useMediaQuery(`(max-width: ${SM_WIDTH})`);
}
