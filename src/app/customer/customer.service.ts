import { Injectable } from '@angular/core';
//import { CUSTOMER_DATA } from './model/mock-customers';
import { Observable, of } from 'rxjs';
import { Customer } from './model/Customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:8080/customer';

  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseUrl);
  }

  getCustomer(name:string):Observable<Customer|null>{
    const url = `${this.baseUrl}/${name}`;
    return this.http.get<Customer|null>(url);
  }

  saveCustomer(customer:Customer):Observable<Customer>{
    const { id } = customer;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Customer>(url, customer);
  }

  deleteCustomer(idCustomer:number):Observable<any>{
    return this.http.delete<void>(`${this.baseUrl}/${idCustomer}`);
  }
}
