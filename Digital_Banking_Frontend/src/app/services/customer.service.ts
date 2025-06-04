import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:8084';

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl+"/customers");
  }

  public searchCustomers(keyword : string):Observable<Array<Customer>>{
    console.log(localStorage.getItem('token'));
    return this.http.get<Array<Customer>>(this.baseUrl+"/customers/search?keyword="+keyword)
  }
  public getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl+"/customers/"+id);
  }

  public updateCustomer(id: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.baseUrl+"/customers/"+id, customer);
  }
  public deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl+"/customers/"+id);
  }
  public addCustomer(customer: any): Observable<any> {
    return this.http.post(this.baseUrl+ '/customers', customer);
  }

}
