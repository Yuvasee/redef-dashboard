import styled from "styled-components";
import { Box } from "@material-ui/core";

import { useAppSelector } from "src/store";
import { useGetApprovalsQuery } from "src/store/bitqueryApi";
import { selectAddress } from "src/store/selectors";
import { Address } from "src/elements/Address";
import { SectionHeader } from "src/elements/SectionHeader";

const ApprovalsBox = styled(Box)``;

function Approvals() {
    const address = useAppSelector(selectAddress);

    const { data: approvedAddresses, error, isLoading } = useGetApprovalsQuery(address);

    return (
        <ApprovalsBox>
            <SectionHeader>Approved contracts</SectionHeader>
            {approvedAddresses?.map((address) => (
                <Address address={address} />
            ))}
        </ApprovalsBox>
    );
}

export default Approvals;
