import React, { FC, useEffect } from 'react'
import { useCurrencies } from '../../context/currenciesContext'
import CurrenciesTable from '../../components/CurrenciesTable'
import { isCurrencyInStorage } from '../../utils/isCurrencyInStorage'
import { CURRENCIES } from '../../models'

const Favorites: FC = () => {
  const { currencies } = useCurrencies()

  const favoriteCurrencies: any = Object.keys(currencies).reduce(
    (acc: any, symbol: string) =>
      isCurrencyInStorage(symbol as keyof typeof CURRENCIES)
        ? {
            ...acc,
            [symbol]: currencies[symbol as keyof typeof CURRENCIES],
          }
        : acc,
    {},
  )

  return <CurrenciesTable currencies={favoriteCurrencies} />
}

export default Favorites
