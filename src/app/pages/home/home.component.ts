import { IProduct } from './../../core/interfaces/procducts/iproduct';
import { Component, inject, OnDestroy, OnInit} from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService} from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  allProducts:IProduct[] | null = null;
  allProductsSerb!:Subscription;
  allCategories:ICategory[] | null = null;
  allCategoriesSub!:Subscription;

  private _ProductsService = inject(ProductsService);
  private _CategoriesService = inject(CategoriesService);
  private _CartService = inject(CartService);
  private _WishlistService = inject(WishlistService);
  private toastr = inject(ToastrService);

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    rewind: true,
    autoplay: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false,
  }

  catSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 15,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true,
  }


  ngOnInit(): void {
    this.allCategoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next: (res)=>{
        this.allCategories = res.data;
      }
    })

    this.allProductsSerb = this._ProductsService.getAllProducts().subscribe({
      next: (res)=>{
        this.allProducts = res.data;

        this._WishlistService.getLoggedUserWishlist().subscribe({
          next: (wishlistRes)=>{
            const wishlistIds = new Set(wishlistRes.data.map((product:any)=> product._id));
            this.allProducts?.forEach(product => product.isInWishlist = wishlistIds.has(product._id));
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
            toastClass: 'toastStyle',
            positionClass: 'toastPosition'
          }
        )

        this._CartService.cartCount.next(res.numOfCartItems)
      }
    })
  }

  toggleWishlist(product:IProduct){
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
    this.allProductsSerb?.unsubscribe();
    this.allCategoriesSub?.unsubscribe();
  }
}
