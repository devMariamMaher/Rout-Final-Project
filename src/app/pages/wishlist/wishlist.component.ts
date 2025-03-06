import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../core/interfaces/wishlist/iwishlist';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  wishlistData:IWishlist | null = null

  private _WishlistService = inject(WishlistService);
  private _CartService = inject(CartService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res)=>{
        this.wishlistData = res
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
      }
    })
  }

  removeFromWishlist(pId:string){
    this._WishlistService.removeProductFormWishlist(pId).subscribe({
      next: (res)=>{
        this._WishlistService.getLoggedUserWishlist().subscribe({
          next: (res)=>{
            this.wishlistData = res
          }
        })

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
