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
  ATOM = 'Cosmos',
  ICP = 'Internet Computer',
  XMR = 'Monero',
  AAVE = 'Aave',
  RPL = 'Rocket Pool',
}

export type Currency = {
  name: string
  price: number
  percentChange: number
}

export type Currencies = Record<keyof typeof CURRENCIES, Currency>
