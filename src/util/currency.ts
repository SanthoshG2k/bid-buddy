export function formatToRupees(paise: number) {
    return `${Math.floor(paise / 100).toFixed(2)}`;
}