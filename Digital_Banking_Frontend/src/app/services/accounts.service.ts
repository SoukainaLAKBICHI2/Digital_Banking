import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AccountDetails, Account } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:8084';
  constructor(private http: HttpClient) { }

  public getAccountsByCustomerId(customerId: number): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl+"/accounts").pipe(
      map(accounts => accounts.filter(account => account.customerDTO.id === customerId))
    );
  }

  public getAccount(accountId: string, page: number, size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(this.baseUrl + "/accounts/" + accountId+"/history?page="+page+"&size="+size);
  }

  public debit(accountId: string, amount: number, description: string) {
    let data = { accountId, amount, description };
    return this.http.post(this.baseUrl+"/accounts/debit", data);
  }

  public credit(accountId: string, amount: number, description: string) {
    let data = { accountId, amount, description };
    return this.http.post(this.baseUrl+"/accounts/credit", data);
  }

  public transfer(accountSource: string, accountDestination: string, amount: number, description: string) {
    let data = { accountSource, accountDestination, amount, description };
    return this.http.post(this.baseUrl+"/accounts/transfer", data);
  }
}
