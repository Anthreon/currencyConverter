export interface BasketItem {
  basketItemName: string;
  price: number;
}

export interface ExchangeRateResponse {
  result: string;
  base_code: string;
  rates: {
    [currencyCode: string]: number;
  };
}

export type Ticker = 'USD' | 'JPY' | 'EUR' | 'CZK' | 'VND';
