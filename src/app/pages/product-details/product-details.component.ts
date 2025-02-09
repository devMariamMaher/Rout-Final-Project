import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/interfaces/procducts/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productID!:string;
  productDetails:IProduct = {} as IProduct;
  productQuantity:number = 1;

  @ViewChild('incBtn') incBtn!:ElementRef;
  @ViewChild('decBtn') decBtn!:ElementRef;

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private _ProductsService = inject(ProductsService);

  productImgs: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }

  increaseQuantity():void{
    this.productQuantity++;
  }

  decreaseQuantity():void{
    this.productQuantity--;
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param)=>{
        this.productID = param.get('p_id')!;
      }
    })

    this._ProductsService.getSpecificProduct(this.productID).subscribe({
      next: (res)=>{
        this.productDetails = res.data
        // console.log(this.productDetails);
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}
