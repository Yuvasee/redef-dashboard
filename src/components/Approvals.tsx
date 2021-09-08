import styled, { css } from "styled-components";
import { Box } from "@material-ui/core";

import { useAppSelector } from "src/store";
import { useGetApprovalsQuery } from "src/store/bitqueryApi";
import { selectAddress } from "src/store/selectors";
import { SectionHeader } from "src/elements/SectionHeader";
import ApprovalsAddress from "./ApprovalsAddress";
import Loader from "src/elements/Loader";
import { sm } from "src/styles/common";

const ApprovalsBox = styled(Box)`
    flex-grow: 1;
    max-width: 40rem;
    overflow: hidden;

    ${sm(css`
        padding: 0 0.6rem;
    `)}
`;

function Approvals() {
    const address = useAppSelector(selectAddress);

    const { data: approvedAddresses, isLoading } = useGetApprovalsQuery(address);

    return (
        <ApprovalsBox>
            <SectionHeader>Approved contracts</SectionHeader>
            {isLoading ? (
                <Loader text="Loading approved contracts" />
            ) : (
                approvedAddresses?.map((address) => <ApprovalsAddress address={address} />)
            )}
        </ApprovalsBox>
    );
}

export default Approvals;
