import React, { FC, useState } from 'react'
import { Web3 } from 'web3'
import cn from 'classnames'

import css from './CurrencySender.module.scss'

const CurrencySender: FC = () => {
  const [amount, setAmount] = useState<string>('')
  const [addressSender, setAddressSender] = useState<string>('')
  const [addressReceiver, setAddressReceiver] = useState<string>('')
  const [isAddressSenderValid, setIsAddressSenderValid] = useState<boolean>(true)
  const [isAddressReceiverValid, setIsAddressReceiverValid] = useState<boolean>(true)
  const [isAmountValid, setIsAmountValid] = useState<boolean>(true)
  const [message, setMessage] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setMessage('')
    setIsError(false)
    setIsAddressSenderValid(true)
    setIsAddressReceiverValid(true)
    setIsAmountValid(true)

    const isValidAddressSender = Web3.utils.isAddress(addressSender.trim())
    const isValidAddressReceiver = Web3.utils.isAddress(addressReceiver.trim())

    if (!isValidAddressSender) {
      setIsAddressSenderValid(false)
      setMessage('Address is not valid')
      setIsError(true)
      return
    }

    if (!isValidAddressReceiver) {
      setIsAddressReceiverValid(false)
      setMessage('Address is not valid')
      setIsError(true)
      return
    }

    if (!amount.length || +amount <= 0) {
      setIsAmountValid(false)
      setMessage('Amount is not valid')
      setIsError(true)
      return
    }

    try {
      if (window.ethereum) {
        await window.ethereum.enable()
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()
        const account = accounts.find((address) => address === addressSender)

        const transaction = {
          from: account,
          to: addressReceiver,
          value: web3.utils.toWei(+amount, 'ether'),
          gas: '300000',
        }

        await web3.eth.sendTransaction(transaction)

        setAddressSender('')
        setAddressReceiver('')
        setAmount('')
        setMessage('Transaction sent successfully')
        setTimeout(() => setMessage(''), 5000)
      } else {
        setMessage("MetaMask not found. Make sure it's installed and connected")
        setIsError(true)
      }
    } catch (error) {
      console.error('Error sending transaction:', error)
      setMessage('Error sending transaction')
      setIsError(true)
    }
  }

  const handleChangeAddressSender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressSender(event.target.value)
  }

  const handleChangeAddressReceiver = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressReceiver(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <h4>Transfer ETH</h4>
      <span className={css.helper}>You need installed and connected MetaMask extension</span>

      <input
        className={!isAddressSenderValid ? css.hasError : ''}
        type="text"
        placeholder="Sender address"
        value={addressSender}
        onChange={handleChangeAddressSender}
      />
      <input
        className={!isAddressReceiverValid ? css.hasError : ''}
        type="text"
        placeholder="Receiver address"
        value={addressReceiver}
        onChange={handleChangeAddressReceiver}
      />

      <input
        className={cn(css.numberInput, !isAmountValid ? css.hasError : '')}
        type="number"
        step="0.001"
        placeholder="Amount"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />
      {!!message.length && <span className={isError ? css.error : css.sucess}>{message}</span>}
      <button className={css.button} type="submit">
        Send
      </button>
    </form>
  )
}

export default CurrencySender
