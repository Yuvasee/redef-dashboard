import styled from "styled-components";
import { blueGrey } from "@material-ui/core/colors";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

type AddressProps = {
    address: string;
};

const AddressBox = styled.div`
    overflow: hidden;

    a {
        display: flex;
        overflow: hidden;
        white-space: nowrap;
        color: ${blueGrey[300]};
        text-decoration: none;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            bottom: 0.4em;
            right: 0;
            left: 0;
            border-bottom: 1px solid ${blueGrey[300]};
        }

        & > svg {
            font-size: 100%;
            width: 0.8em;
            margin-left: 0.3em;
            position: relative;
            top: 0.1em;
        }
    }
`;

const Begin = styled.span`
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const End = styled.span`
    display: inline-block;
`;

export function Address({ address }: AddressProps) {
    const begin = address.slice(0, address.length - 3);
    const end = address.slice(-3);

    return (
        <AddressBox>
            <a
                href={`https://etherscan.io/address/${address}`}
                target="_blank"
                rel="noreferrer"
                title="Inspect on EtherScan"
            >
                <Begin>{begin}</Begin>
                <End>{end}</End>
                <OpenInNewIcon />
            </a>
        </AddressBox>
    );
}
