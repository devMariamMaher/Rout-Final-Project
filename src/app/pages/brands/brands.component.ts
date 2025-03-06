import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../core/interfaces/brands/ibrand';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  brandsData:IBrand[] | null = null;

  private _BrandsService = inject(BrandsService);

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res)=>{
        this.brandsData = res.data;
      }
    })
  }
}
