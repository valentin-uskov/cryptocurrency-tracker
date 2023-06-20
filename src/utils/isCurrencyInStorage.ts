import { CURRENCIES } from '../models'

export const isCurrencyInStorage = (symbol: keyof typeof CURRENCIES): boolean => {
  const storedSymbols = localStorage.getItem('favorite_currencies')
  const storedSymbolsArr = storedSymbols ? JSON.parse(storedSymbols) : []
  return storedSymbolsArr.includes(symbol)
}
