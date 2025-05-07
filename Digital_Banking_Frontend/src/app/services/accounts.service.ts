import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AccountDetails, AccountOperation} from '../model/account.model'; // adapte le chemin

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:8084';

  constructor(private http: HttpClient) {
  }

  public getOperations(accountId: string, page: number, size: number): Observable<AccountOperation[]> {
    return this.http.get<AccountOperation[]>(this.baseUrl + "/accounts/" + accountId + "/operations?page=" + page + "&size=" + size);

  }

  public getAccountDetails(accountId: string): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(this.baseUrl + "/accounts/" + accountId);
  }

  public debit(accountId: string, amount: number, description: string) {
    let data = {accountId: accountId, amount: amount, description: description}
    return this.http.post(this.baseUrl + "/accounts/debit", data);
  }

  public credit(accountId: string, amount: number, description: string) {
    let data = {accountId: accountId, amount: amount, description: description}
    return this.http.post(this.baseUrl + "/accounts/credit", data);
  }

  public transfer(accountSource: string, accountDestination: string, amount: number, description: string) {
    let data = {accountSource, accountDestination, amount, description}
    return this.http.post(this.baseUrl + "/accounts/transfer", data);
  }
}
