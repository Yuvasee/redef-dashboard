import styled from "styled-components";
import { Box } from "@material-ui/core";

import { useAppSelector } from "src/store";
import { useGetApprovalsQuery } from "src/store/bitqueryApi";
import { selectAddress } from "src/store/selectors";
import { SectionHeader } from "src/elements/SectionHeader";
import ApprovalsAddress from "./ApprovalsAddress";
import Loader from "src/elements/Loader";

const ApprovalsBox = styled(Box)``;

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
