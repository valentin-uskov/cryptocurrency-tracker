import React, { FC } from 'react'
import { useCurrencies } from '../../context/currenciesContext'
import CurrenciesTable from '../../components/CurrenciesTable'

const Currencies: FC = () => {
  const { currencies } = useCurrencies()

  return <CurrenciesTable currencies={currencies} />
}

export default Currencies
