import { Injectable } from '@angular/core';
import { LOAN_DATA } from './model/mock-loans';
import { Observable, of } from 'rxjs';
import { Loan } from './model/Loan';
import { Pageable } from '../core/model/page/Pageable';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor() { }

  /* getLoans(idGame?:number, idCustomer?:number, selectedDate?:Date):Observable<Loan[]>{
    return of(LOAN_DATA);
  } */
  getLoans(idGame?: number, idCustomer?: number, selectedDate?: Date, pageable?:Pageable): Observable<Loan[]> {
    return of(LOAN_DATA);
  }

  saveLoan(loan: Loan): Observable<Loan> {
    return of(null);

  }

  deleteLoan(idLoan: number): Observable<any> {
    return of(null);
  }
}
