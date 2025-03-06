import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/interfaces/procducts/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productID!:string;
  productDetails:IProduct | null = {} as IProduct;
  productQuantity!:number;

  @ViewChild('incBtn') incBtn!:ElementRef;
  @ViewChild('decBtn') decBtn!:ElementRef;

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private _ProductsService = inject(ProductsService);
  private _CartService = inject(CartService);
    private _WishlistService = inject(WishlistService);
  private toastr = inject(ToastrService)

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

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param)=>{
        this.productID = param.get('p_id')!;
      }
    })

    this.productQuantity = this._CartService.productQuantity()

    this._ProductsService.getSpecificProduct(this.productID).subscribe({
      next: (res)=>{
        this.productDetails = res.data
      },
      error: (err)=>{
      }
    })
  }

  increaseQuantity():void{
    this.productQuantity++;
  }

  decreaseQuantity():void{
    this.productQuantity--;
  }

  addToCart(){
    this._CartService.addProductToCart(this.productID).subscribe({
      next: (res)=>{
        this.toastr.success(res.message, '',
          {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',
            toastClass: 'toastStyle',
            positionClass: 'toastPosition'
          }
        )

        this._CartService.cartCount.next(res.numOfCartItems);

        this._CartService.updateCartProductQuantity(this.productID, this.productQuantity).subscribe({
          next: (res)=>{
          }
        })

        this.productQuantity = 1;
      }
    })
  }

  addToWishlist(){
    this._WishlistService.addProductToWishlist(this.productID).subscribe({
      next: (res)=>{
        this.toastr.success(res.message, '',
          {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',
            toastClass: 'toastStyle',
            positionClass: 'toastPosition'
          }
        )
      }
    })
  }
}
