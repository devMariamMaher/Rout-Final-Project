import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private _HttpClient = inject(HttpClient);

  constructor() { }

  getAllBrands():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`)
  }
}
