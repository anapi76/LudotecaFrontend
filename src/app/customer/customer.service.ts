import { Injectable } from '@angular/core';
import { CUSTOMER_DATA } from './model/mock-customers';
import { Observable, of } from 'rxjs';
import { Customer } from './model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCustomers():Observable<Customer[]>{
    return of(CUSTOMER_DATA);
  }

  saveCustomer(customer:Customer):Observable<Customer>{
    return of(null);
  }

  deleteCustomer(idCustomer:number):Observable<any>{
    return of(null);
  }
}
