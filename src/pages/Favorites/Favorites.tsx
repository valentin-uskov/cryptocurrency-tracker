import React, { FC } from 'react'
import { useCurrencies } from '../../context/currenciesContext'
import CurrenciesTable from '../../components/CurrenciesTable'
import { isCurrencyInStorage } from '../../utils/isCurrencyInStorage'
import { Currencies, CURRENCIES } from '../../models'

const Favorites: FC = () => {
  const { currencies } = useCurrencies()

  const favoriteCurrencies: Currencies = Object.keys(currencies).reduce(
    (acc, symbol) =>
      isCurrencyInStorage(symbol as keyof typeof CURRENCIES)
        ? {
            ...acc,
            [symbol]: currencies[symbol as keyof typeof CURRENCIES],
          }
        : acc,
    {} as Currencies,
  )

  return <CurrenciesTable currencies={favoriteCurrencies} />
}

export default Favorites
