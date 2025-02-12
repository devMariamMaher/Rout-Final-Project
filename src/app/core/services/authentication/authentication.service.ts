import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../shared/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _HttpClient = inject(HttpClient);

  constructor() { }

  signup(data:object){
    this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  signin(data:object){
    this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }
}
