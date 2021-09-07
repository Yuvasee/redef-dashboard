import config from "src/config";
import { Balance } from "src/store/bitqueryApi/getBalances";

export function toFixed(value: string | number, decPlaces = 2): string {
    return parseFloat(String(value)).toFixed(decPlaces);
}

export function balancesToAddresses(balances?: Balance[]): string[] {
    return (
        balances?.map((balance) => {
            const { address } = balance.currency;
            return address === "-" ? config.wethAddress : address;
        }) || []
    );
}
