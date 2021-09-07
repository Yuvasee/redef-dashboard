import { Box } from "@material-ui/core";
import styled from "styled-components";

import { Address } from "src/elements/Address";
import { useGetContractAbiQuery } from "src/store/etherscanApi";

type ApprovalsAddressProps = {
    address: string;
};

const ApprovalsAddressBox = styled(Box)`
    display: flex;
`;

function ApprovalsAddress({ address }: ApprovalsAddressProps) {
    const { data } = useGetContractAbiQuery(address);
    const approved = data?.status === "1";
    return (
        <ApprovalsAddressBox>
            <Address address={address} />
            {approved && " ✓"}
        </ApprovalsAddressBox>
    );
}

export default ApprovalsAddress;
