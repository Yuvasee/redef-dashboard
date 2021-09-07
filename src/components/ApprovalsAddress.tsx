import { Box } from "@material-ui/core";
import styled from "styled-components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { Address } from "src/elements/Address";
import { useGetContractAbiQuery } from "src/store/etherscanApi";

type ApprovalsAddressProps = {
    address: string;
};

const ApprovalsAddressBox = styled(Box)`
    display: flex;

    & > svg {
        color: #00c9a7;
        width: 0.5em;
        position: relative;
        top: -0.1em;
        margin-left: 0.3em;
    }
`;

function ApprovalsAddress({ address }: ApprovalsAddressProps) {
    const { data } = useGetContractAbiQuery(address);
    const approved = data?.status === "1";
    return (
        <ApprovalsAddressBox>
            <Address address={address} />
            {approved && <CheckCircleIcon titleAccess="Contract code verified" />}
        </ApprovalsAddressBox>
    );
}

export default ApprovalsAddress;
