import styled from "styled-components";
import { blueGrey } from "@material-ui/core/colors";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

type AddressProps = {
    address: string;
};

const AddressBox = styled.div`
    a {
        display: inline-flex;
        color: ${blueGrey[300]};
        & > svg {
            width: 0.6em;
            margin-left: 0.2em;
            position: relative;
            top: -0.1em;
        }
    }
`;

export function Address({ address }: AddressProps) {
    return (
        <AddressBox>
            <a
                href={`https://etherscan.io/address/${address}`}
                target="_blank"
                rel="noreferrer"
                title="Inspect on EtherScan"
            >
                {address}
                <OpenInNewIcon />
            </a>
        </AddressBox>
    );
}
