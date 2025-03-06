import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../shared/enviroment/environment';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userToken:any = null;

  private _HttpClient = inject(HttpClient);
  private _PLATFORM_ID = inject(PLATFORM_ID);

  constructor() {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this.decodeToken();
    }
  }

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

  forgotPassword(email:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, email);
  }

  verifyResetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, resetCode)
  }

  resetPassword(resetData:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, resetData)
  }
}
