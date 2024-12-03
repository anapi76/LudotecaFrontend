import { Injectable } from '@angular/core';
//import { LOAN_DATA } from './model/mock-loans';
import { Observable, of } from 'rxjs';
import { Loan } from './model/Loan';
import { Pageable } from '../core/model/page/Pageable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/loan';

  getLoans(gameId?: number, customerId?: number, selectedDate?: string): Observable<Loan[]> {

    return this.http.get<Loan[]>(this.composeFindUrl(gameId, customerId, selectedDate));
  }

  saveLoan(loan: Loan): Observable<Loan> {
    return of(null);

  }

  deleteLoan(idLoan: number): Observable<any> {
    return of(null);
  }

  private composeFindUrl(gameId?: number, customerId?: number, selectedDate?: string): string {
    const params = new URLSearchParams();
    if (gameId) {
      params.set('idGame', gameId.toString());
    }
    if (customerId) {
      params.set('idCustomer', customerId.toString());
    }
    if (selectedDate) {
      params.set('date', selectedDate)
    }
    const queryString = params.toString();

    return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
  }
}
