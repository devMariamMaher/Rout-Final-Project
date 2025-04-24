import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../core/interfaces/procducts/iproduct';
import { ProductsService } from '../../core/services/products/products.service';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms'
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [SearchPipe, CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsArr!:IProduct[] | null;
  productsArrSub!:Subscription;
  searchKey:string = '';

  private _ProductsService = inject(ProductsService);
  private _CartService = inject(CartService);
  private _WishlistService = inject(WishlistService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.productsArrSub = this._ProductsService.getAllProducts().subscribe({
      next: (res)=>{
        this.productsArr = res.data;

        this._WishlistService.getLoggedUserWishlist().subscribe({
          next: (wishlistRes)=>{
            const wishlistIds = new Set(wishlistRes.data.map((product:any)=> product._id));
            this.productsArr?.forEach(product => product.isInWishlist = wishlistIds.has(product._id));
          }
        })
      }
    })
  }

  addToCart(pId:string){
    this._CartService.addProductToCart(pId).subscribe({
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
      }
    })
  }

  toggleWishlist(product: IProduct){
    if(!product.isInWishlist){
      this._WishlistService.addProductToWishlist(product._id).subscribe({
        next: (res)=>{
          product.isInWishlist = true;
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
    } else{
      this._WishlistService.removeProductFormWishlist(product._id).subscribe({
        next: (res)=>{
          product.isInWishlist = false;
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

  ngOnDestroy(): void {
    this.productsArrSub.unsubscribe();
  }
}
