import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean=false;
  username:any;
  roles:any;
  accessToken!:any;

  private apiUrl = 'http://localhost:8084/auth';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<{ 'access-token': string }>(
      `${this.apiUrl}/login`,
      null,
      { headers, params }
    ).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response['access-token']);
      })
    );
  }


  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.username=undefined;
    this.roles=undefined;
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  public loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data["access-token"];
    console.log(this.accessToken);
    let decodeJwt:any=jwtDecode(this.accessToken);
    console.log(decodeJwt);
    this.roles = decodeJwt.scope;
    this.username = decodeJwt.sub;

  }
}
