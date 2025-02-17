import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { authenticationGuard } from './core/guards/authrntication/authentication.guard';

export const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'register', component: RegisterComponent, title: 'Register'},
  ]},

  {path: '', component: MainLayoutComponent, canActivate:[authenticationGuard], children: [
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'products', loadComponent: ()=> import('./pages/products/products.component').then((c)=> c.ProductsComponent), title: 'Products'},
    {path: 'product-details/:p_id', loadComponent: ()=> import('./pages/product-details/product-details.component').then((c)=> c.ProductDetailsComponent)},
    {path: 'categories', loadComponent: ()=> import('./pages/categories/categories.component').then((c)=> c.CategoriesComponent), title: 'Categories'},
    {path: 'brands', loadComponent: ()=> import('./pages/brands/brands.component').then((c)=> c.BrandsComponent), title: 'Brands'},
    {path: 'cart', loadComponent: ()=> import('./pages/cart/cart.component').then((c)=> c.CartComponent), title: 'Cart'},
    {path: '**', component: NotFoundComponent, title: 'Error 404'},
  ]},
];
