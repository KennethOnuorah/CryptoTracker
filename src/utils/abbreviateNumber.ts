export const abbreviateNumber = (num: number, decimalPlaces: number): string => {
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: decimalPlaces
  }).format(num);
}