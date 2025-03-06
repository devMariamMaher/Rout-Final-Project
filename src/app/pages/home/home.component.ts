import { Spinner } from './../../../../node_modules/ngx-spinner/lib/ngx-spinner.enum.d';
import { Component, ElementRef, inject, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/procducts/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService} from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { IWishlist } from '../../core/interfaces/wishlist/iwishlist';

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
  allWishlistData!:IWishlist;
  // addedToWishlist:boolean = false;

  // @ViewChild('wishlistIcon') wishlistIcon!:ElementRef;
  // @ViewChild('redWishlistIcon') redWishlistIcon!:ElementRef;
  // @ViewChildren('wishlistIcon') wishlistIcons!:QueryList<ElementRef>;
  // @ViewChildren('redWishlistIcon') redWishlistIcons!:QueryList<ElementRef>;

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
        this.allCategories = res.data
      }
    })

    this.allProductsSerb = this._ProductsService.getAllProducts().subscribe({
      next: (res)=>{
        this.allProducts = res.data
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
        console.log('api res', res.numOfCartItems);
        console.log(this._CartService.cartCount);
      }
    })
  }

  // toggleWishlistUI(existsInWishlist:boolean){
  //   if(existsInWishlist){
  //     this.wishlistIcon.nativeElement.classList.add('hidden')
  //     this.redWishlistIcon.nativeElement.classList.remove('hidden')
  //     this.redWishlistIcon.nativeElement.classList.add('flex')
  //   } else{
  //     this.wishlistIcon.nativeElement.classList.remove('hidden')
  //     this.wishlistIcon.nativeElement.classList.add('flex')
  //     this.redWishlistIcon.nativeElement.classList.add('hidden')
  //   }
  // }

  // Working one:======================>

  // toggleWishlistUI(pId: string, existsInWishlist: boolean) {
  //   const index = this.allProducts?.findIndex(product => product._id === pId);
  //   if (index === undefined || index === -1) return; // Ensure product exists

  //   const wishlistIcon = this.wishlistIcons.toArray()[index]?.nativeElement;
  //   const redWishlistIcon = this.redWishlistIcons.toArray()[index]?.nativeElement;

  //   if (!wishlistIcon || !redWishlistIcon) return; // Prevent errors if elements don't exist

  //   if (existsInWishlist) {
  //     wishlistIcon.classList.add('hidden');
  //     redWishlistIcon.classList.remove('hidden');
  //     redWishlistIcon.classList.add('flex');
  //   } else {
  //     wishlistIcon.classList.remove('hidden');
  //     wishlistIcon.classList.add('flex');
  //     redWishlistIcon.classList.add('hidden');
  //   }
  // }


  // isInWishlist(pId:string){
  //   this._WishlistService.getLoggedUserWishlist().subscribe({
  //     next: (res)=>{
  //       this.allWishlistData = res
  //       let productExist = this.allWishlistData.data.some((item)=> item._id == pId)

  //       if(!productExist){
  //         this.addToWishlist(pId);
  //       } else{
  //         this.toggleWishlistUI(true);
  //       }
  //     }
  //   })
  // }


  // Working one:======================>

  // isInWishlist(pId: string) {
  //   this._WishlistService.getLoggedUserWishlist().subscribe({
  //     next: (res) => {
  //       this.allWishlistData = res;
  //       let productExist = this.allWishlistData.data.some(item => item._id === pId);

  //       if (!productExist) {
  //         this.addToWishlist(pId);
  //       } else {
  //         this.toggleWishlistUI(pId, true);
  //       }
  //     }
  //   });
  // }

  addToWishlist(pId:string){
    this._WishlistService.addProductToWishlist(pId).subscribe({
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
        // this.toggleWishlistUI(pId, true);
      }
    })
  }


  // toggleWishlist(pId:string){
  //   this.wishlistIcon.nativeElement.classList.add('hidden')
  //   this.redWishlistIcon.nativeElement.classList.remove('hidden')
  //   this.redWishlistIcon.nativeElement.classList.add('flex')
  //   console.log(pId);
  //   console.log(this.addedToWishlist);
  // }

  ngOnDestroy(): void {
    this.allProductsSerb?.unsubscribe();
    this.allCategoriesSub?.unsubscribe();
  }
}
