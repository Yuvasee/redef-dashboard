export function toFixed(value: string | number, decPlaces = 2): string {
    return parseFloat(String(value)).toFixed(decPlaces);
}
