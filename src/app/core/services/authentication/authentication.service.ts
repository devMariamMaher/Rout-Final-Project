import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../shared/enviroment/environment';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userToken:any;

  private _HttpClient = inject(HttpClient);

  constructor() { }

  signup(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  signin(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  decodeToken():void{
    if(sessionStorage.getItem('token')){
      this.userToken = jwtDecode(sessionStorage.getItem('token')!);
    }
  }
}
