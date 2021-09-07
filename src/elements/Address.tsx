import styled from "styled-components";
import { blueGrey } from "@material-ui/core/colors";

type AddressProps = {
    address: string;
};

const AddressBox = styled.div`
    a {
        color: ${blueGrey[300]};
    }
`;

export function Address({ address }: AddressProps) {
    return (
        <AddressBox>
            <a href={`https://etherscan.io/address/${address}`} target="_blank" rel="noreferrer">
                {address}
            </a>
        </AddressBox>
    );
}
