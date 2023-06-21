export enum CURRENCIES {
  BTC = 'Bitcoin',
  ETH = 'Ethereum',
  LTC = 'Litecoin',
  ADA = 'Cordano',
  DOGE = 'Dogecoin',
  BNB = 'BNB',
  SOL = 'Solana',
  MATIC = 'Polygon',
  TRX = 'Tron',
  SHIB = 'Shiba Inu',
}

export type Currency = {
  name: string
  price: number
  percentChange: number
}

export type Currencies = Record<keyof typeof CURRENCIES, Currency>
