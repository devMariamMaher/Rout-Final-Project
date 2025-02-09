import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  // {path: '', redirectTo: 'home', pathMatch:'full'},
  // {path: 'home', component: HomeComponent, title: 'Home'},
  // {path: 'products', component: ProductsComponent, title: 'Products'},
  // {path: 'categories', component: CategoriesComponent, title: 'Categories'},
  // {path: 'brands', component: BrandsComponent, title: 'Brands'},
  // {path: 'cart', component: CartComponent, title: 'Cart'},
  // {path: 'login', component: LoginComponent, title: 'Login'},
  // {path: 'register', component: RegisterComponent, title: 'Register'},
  // {path: '**', component: NotFoundComponent, title: 'Error 404'},

  {path: '', component: AuthLayoutComponent, children: [
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'register', component: RegisterComponent, title: 'Register'},
  ]},

  {path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'products', loadComponent: ()=> import('./pages/products/products.component').then((c)=> c.ProductsComponent), title: 'Products'},
    {path: 'product-details/:p_id', loadComponent: ()=> import('./pages/product-details/product-details.component').then((c)=> c.ProductDetailsComponent)},
    {path: 'categories', loadComponent: ()=> import('./pages/categories/categories.component').then((c)=> c.CategoriesComponent), title: 'Categories'},
    {path: 'brands', loadComponent: ()=> import('./pages/brands/brands.component').then((c)=> c.BrandsComponent), title: 'Brands'},
    {path: 'cart', loadComponent: ()=> import('./pages/cart/cart.component').then((c)=> c.CartComponent), title: 'Cart'},
    {path: '**', component: NotFoundComponent, title: 'Error 404'},
  ]},
];
