import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../shared/enviroment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCount:BehaviorSubject<number> = new BehaviorSubject(0);
  productQuantity:WritableSignal<number> = signal(1)

  private _HttpClient = inject(HttpClient);

  constructor() { }

  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }

  addProductToCart(pId:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, { "productId": pId})
  }

  removeSpecificCartItem(pId:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${pId}`)
  }

  updateCartProductQuantity(pId:string, count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${pId}`, {"count": count})
  }

  clearUserCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }
}
