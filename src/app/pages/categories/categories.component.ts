import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { error } from 'console';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categoriesData:ICategory[] | null = null;

  private _CategoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res)=>{
        this.categoriesData = res.data
      }
    })
  }
}
