import React, { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Currencies, CURRENCIES } from '../../models'
import { isCurrencyInStorage } from '../../utils/isCurrencyInStorage'
import FavoriteCheckbox from '../FavoriteCheckBox'
import { convertPriceToViewFormat, roundWithTwoDecimal } from './formatConverters'
import css from './CurrenciesTable.module.scss'

type Props = {
  currencies: Currencies
}

const CurrenciesTable: FC<Props> = ({ currencies }) => {
  const handleFavoriteChange = (symbol: keyof typeof CURRENCIES) => {
    const storedSymbols = localStorage.getItem('favorite_currencies')
    const storedSymbolsArr = storedSymbols ? JSON.parse(storedSymbols) : []

    localStorage.setItem(
      'favorite_currencies',
      JSON.stringify(
        storedSymbolsArr.includes(symbol)
          ? storedSymbolsArr.filter((item: keyof typeof CURRENCIES) => item !== symbol)
          : [...storedSymbolsArr, symbol],
      ),
    )
  }

  return Object.keys(currencies).length ? (
    <table className={css.table}>
      <thead>
        <tr>
          <th />
          <th>Currency</th>
          <th>Price</th>
          <th>24h change</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(currencies).map((symbol) => {
          const { name, price, percentChange } = currencies[symbol as keyof typeof CURRENCIES]

          return (
            <tr key={symbol}>
              <td>
                <FavoriteCheckbox
                  checked={isCurrencyInStorage(symbol as keyof typeof CURRENCIES)}
                  onChange={() => handleFavoriteChange(symbol as keyof typeof CURRENCIES)}
                />
              </td>
              <td>
                <div className={css.nameWrapper}>
                  <b>{name}</b>
                  <span>{symbol}</span>
                </div>
              </td>
              <td>{price ? <span>${convertPriceToViewFormat(price)}</span> : <Skeleton width={70} />}</td>
              <td>
                {percentChange ? (
                  <span className={percentChange > 0 ? css.up : css.down}>{roundWithTwoDecimal(percentChange)}%</span>
                ) : (
                  <Skeleton width={65} />
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  ) : (
    <h4 className={css.emptyMessage}>No currencies added yet</h4>
  )
}

export default CurrenciesTable
