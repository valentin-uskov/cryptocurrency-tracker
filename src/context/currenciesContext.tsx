import React, { FC, useContext, useEffect, useMemo, useState } from 'react'
import { Currencies, CURRENCIES } from '../models'

interface CurrenciesContext {
  currencies: Currencies
}

const CurrenciesContext = React.createContext<CurrenciesContext>({} as CurrenciesContext)

interface Props {
  children: React.ReactNode
}

const initialCurrencies: Currencies = Object.keys(CURRENCIES).reduce(
  (acc: any, symbol: string) => ({ ...acc, [symbol]: { name: CURRENCIES[symbol as keyof typeof CURRENCIES] } }),
  {},
)

export const CurrenciesProvider: FC<Props> = ({ children }) => {
  const [currencies, setCurrencies] = useState<Currencies>(initialCurrencies)
  const currenciesProviderValue = useMemo(() => ({ currencies }), [currencies])

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws')

    const msg: any = {
      method: 'SUBSCRIBE',
      params: Object.keys(CURRENCIES).map((symbol) => `${symbol.toLowerCase()}usdt@ticker`),
      id: 1,
    }

    socket.onopen = () => {
      socket.send(JSON.stringify(msg))
    }

    socket.onmessage = (event) => {
      const value = JSON.parse(event.data)
      if (value.result === null) return

      const symbol = value.s.replace('USDT', '')
      setCurrencies((prevState) => ({
        ...prevState,
        [symbol]: { name: CURRENCIES[symbol as keyof typeof CURRENCIES], price: +value.c, percentChange: +value.P },
      }))
    }

    return () => {
      socket.close()
    }
  }, [])

  return <CurrenciesContext.Provider value={currenciesProviderValue}>{children}</CurrenciesContext.Provider>
}

export const useCurrencies = () => {
  const { currencies } = useContext(CurrenciesContext)
  return {
    currencies,
  }
}
