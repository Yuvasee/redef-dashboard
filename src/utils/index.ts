import config from "src/config";
import { Balance } from "src/store/bitqueryApi/getBalances";

export function toFixed(value: string | number, decPlaces = 2): string {
    const floatNum = parseFloat(String(value)).toFixed(decPlaces);
    const parts = floatNum.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export function balancesToAddresses(balances?: Balance[]): string[] {
    return (
        balances?.map((balance) => {
            const { address } = balance.currency;
            return address === "-" ? config.wethAddress : address;
        }) || []
    );
}
