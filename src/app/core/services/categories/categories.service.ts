import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _HttpClient = inject(HttpClient);

  constructor() { }

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }
}
