import { Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../core/interfaces/cart/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartData:ICart | null = null;

  private _CartService = inject(CartService);

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res)=>{
        this.cartData = res.data
      }
    })
  }

  removeCartItem(pId:string){
    this._CartService.removeSpecificCartItem(pId).subscribe({
      next: (res)=>{
        this.cartData = res.data
        this._CartService.cartCount.next(res.numOfCartItems);
      }
    })
  }

  updateCount(pId:string, count:number){
    if(count > 0){
      this._CartService.updateCartProductQuantity(pId, count).subscribe({
        next: (res)=>{
          this.cartData = res.data
        }
      })
    }
  }

  clearCart(){
    this._CartService.clearUserCart().subscribe({
      next: (res)=>{
        this.cartData = res
        this._CartService.cartCount.next(0);
      }
    })
  }
}
