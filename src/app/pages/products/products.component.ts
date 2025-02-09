import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../core/interfaces/procducts/iproduct';
import { ProductsService } from '../../core/services/products/products.service';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms'
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [SearchPipe, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsArr!:IProduct[];
  productsArrSub!:Subscription;
  searchKey:string = '';

  private _ProductsService = inject(ProductsService);

  ngOnInit(): void {
    this.productsArrSub = this._ProductsService.getAllProducts().subscribe({
      next: (res)=>{
        this.productsArr = res.data;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.productsArrSub.unsubscribe();
  }
}
