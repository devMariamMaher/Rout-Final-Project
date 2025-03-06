import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/enviroment/environment';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  userId:any;

  private _HttpClient = inject(HttpClient);
  private _PLATFORM_ID = inject(PLATFORM_ID);
  private _AuthenticationService = inject(AuthenticationService)

  constructor() {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      if(this._AuthenticationService.userToken){
        this.userId = this._AuthenticationService.userToken.id
      }
    }
  }

  createCashOrder(cartId:string, data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${cartId}`, {'shippingAddress': data});
  }

  checkoutSession(cartId:string, data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=#/${environment.domain}`, {'shippingAddress': data})
  }

  getUserOrders():Observable<any>{
    if(this._AuthenticationService.userToken){
      this.userId = this._AuthenticationService.userToken.id
    }

    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${this.userId}`)
  }
}
