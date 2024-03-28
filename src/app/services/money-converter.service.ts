import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExchangeRateResponse, Ticker } from '../interfaces/basketItem';

@Injectable({
  providedIn: 'root',
})
export class MoneyConverterService {
  private apiUrl = environment.moneyConverterUrl;

  constructor(private http: HttpClient) {}

  public getExchangeRates(
    baseCurrency: Ticker
  ): Observable<ExchangeRateResponse> {
    return this.http
      .get<ExchangeRateResponse>(`${this.apiUrl}?base=${baseCurrency}`)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
