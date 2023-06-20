export const roundWithTwoDecimal = (num: number): number => Math.round((num + Number.EPSILON) * 100) / 100

export const convertPriceToViewFormat = (num: number): string =>
  num > 1
    ? roundWithTwoDecimal(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : num.toString()
