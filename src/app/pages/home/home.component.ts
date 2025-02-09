import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/procducts/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService} from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  allProducts!:IProduct[];
  allProductsSerb!:Subscription;
  private _ProductsService = inject(ProductsService);
  private _CategoriesService = inject(CategoriesService);
  allCategories!:ICategory[];
  allCategoriesSub!:Subscription;

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
        // console.log(this.allCategories);
      },
      error: (err)=>{
        console.log(err);
      }
    })

    this.allProductsSerb = this._ProductsService.getAllProducts().subscribe({
      next: (res)=>{
        this.allProducts = res.data
        // console.log(this.allProducts);
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.allProductsSerb?.unsubscribe();
    this.allCategoriesSub?.unsubscribe();
  }
}
