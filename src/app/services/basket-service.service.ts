import { Injectable } from '@angular/core';
import { BasketItem } from '../interfaces/basketItem';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private defaultBasketItems: BasketItem[] = [
    {
      basketItemName: 'USB hub',
      price: 10.5,
    },
    {
      basketItemName: 'Microphone',
      price: 5,
    },
    {
      basketItemName: 'Headphones',
      price: 14.99,
    },
    {
      basketItemName: 'Monitor',
      price: 300,
    },
    {
      basketItemName: 'notebook',
      price: 1000,
    },
  ];

  constructor() {}

  public getBasketItems(): BasketItem[] {
    return this.defaultBasketItems;
  }
}
