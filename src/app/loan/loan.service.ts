import { Injectable } from '@angular/core';
//import { LOAN_DATA } from './model/mock-loans';
import { Observable, of } from 'rxjs';
import { Loan } from './model/Loan';
import { HttpClient } from '@angular/common/http';
import { LoanPage } from './model/LoanPage';
import { LoanSearchDto } from './model/LoanSearchDto';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/loan';

  getLoans(loanSearchDto: LoanSearchDto): Observable<LoanPage> {

    return this.http.post<LoanPage>(this.baseUrl, loanSearchDto);
  }

  saveLoan(loan: Loan): Observable<Loan> {

    return this.http.put<Loan>(this.baseUrl, loan);
  }

  deleteLoan(idLoan: number): Observable<void> {
    
    return this.http.delete<void>(`${this.baseUrl}/${idLoan}`);
  }

}
