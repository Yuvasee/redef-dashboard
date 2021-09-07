import styled from "styled-components";
import { Box } from "@material-ui/core";

import { useAppSelector } from "src/store";
import { useGetApprovalsQuery } from "src/store/bitqueryApi";
import { selectAddress } from "src/store/selectors";
import { SectionHeader } from "src/elements/SectionHeader";
import ApprovalsAddress from "./ApprovalsAddress";

const ApprovalsBox = styled(Box)``;

function Approvals() {
    const address = useAppSelector(selectAddress);

    const { data: approvedAddresses, error, isLoading } = useGetApprovalsQuery(address);

    return (
        <ApprovalsBox>
            <SectionHeader>Approved contracts</SectionHeader>
            {approvedAddresses?.map((address) => (
                <ApprovalsAddress address={address} />
            ))}
        </ApprovalsBox>
    );
}

export default Approvals;
