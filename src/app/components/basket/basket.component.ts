import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../services/basket-service.service';
import {
  BasketItem,
  ExchangeRateResponse,
  Ticker,
} from '../../interfaces/basketItem';
import { CommonModule } from '@angular/common';
import { MoneyConverterService } from '../../services/money-converter.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  public basketItems: BasketItem[] = [];
  public selectedOption: Ticker = 'USD';
  public basketTotalAmount: number = 0;
  public options: Ticker[] = ['USD', 'EUR', 'JPY', 'VND', 'CZK'];

  constructor(
    private basketService: BasketService,
    private exchangeRateService: MoneyConverterService
  ) {}

  public ngOnInit(): void {
    this.basketItems = structuredClone(this.basketService.getBasketItems());
    this.calculateTotalBasketAmount();
  }

  onSelectFromChange(event: Event): void {
    this.selectedOption = (event.target as HTMLSelectElement).value as Ticker;
    this.basketItems = structuredClone(this.basketService.getBasketItems());
    this.convertBasketCurrency(this.selectedOption);
  }

  private convertBasketCurrency(convertTo: Ticker): void {
    this.exchangeRateService.getExchangeRates(convertTo).subscribe({
      next: (exchangeRateData: ExchangeRateResponse) => {
        const convertRate = exchangeRateData.rates['USD'];
        this.basketItems.forEach((basketItem: BasketItem) => {
          basketItem.price /= convertRate;
        });
        this.calculateTotalBasketAmount();
      },
      error: (error) => {
        console.log('Error API failed: ', error);
      },
    });
  }

  public calculateTotalBasketAmount(): void {
    this.basketTotalAmount = this.basketItems.reduce(
      (previous, currentItem) => {
        return previous + currentItem.price;
      },
      0
    );
  }
}
