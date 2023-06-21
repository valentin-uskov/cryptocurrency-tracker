import React, { FC, useState } from 'react'
import { Web3 } from 'web3'

import css from './BalanceChecker.module.scss'

const BalanceChecker: FC = () => {
  const [address, setAddress] = useState<string>('')
  const [balance, setBalance] = useState<string>('')
  const [isAddressValid, setIsAddressValid] = useState<boolean>(true)

  const checkBalance = () => {
    const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`)

    const isValidAddress = Web3.utils.isAddress(address.trim())

    if (isValidAddress) {
      setIsAddressValid(true)
      web3.eth.getBalance(address.trim()).then((value) => {
        const etherBalance = web3.utils.fromWei(value, 'ether')
        const formattedBalance = parseFloat(etherBalance).toLocaleString('en', { minimumFractionDigits: 9 })
        setBalance(formattedBalance)
      })
    } else {
      setIsAddressValid(false)
    }
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAddressValid(true)
    setBalance('')
    setAddress(event.target.value)
  }

  return (
    <div>
      <h4>Check ETH balance</h4>
      <input
        className={!isAddressValid ? css.hasError : ''}
        type="text"
        placeholder="Address"
        value={address}
        onChange={handleChangeInput}
      />
      {!!balance && (
        <span className={css.balance}>
          Balance: <b>{balance}</b> ETH
        </span>
      )}
      {!isAddressValid && <span className={css.error}>Address is not valid</span>}
      <button className={css.button} type="submit" onClick={checkBalance}>
        Check balance
      </button>
    </div>
  )
}

export default BalanceChecker
