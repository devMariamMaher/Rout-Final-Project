import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authenticationGuard } from './core/guards/authrntication/authentication.guard';

export const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'register', loadComponent: ()=> import('./pages/register/register.component').then((c)=> c.RegisterComponent), title: 'Register'},
    {path: 'forgotPassword', loadComponent: ()=> import('./pages/forgot-password/forgot-password.component').then((c)=> c.ForgotPasswordComponent), title: 'Forgot Password'},
    {path: 'verifyCode', loadComponent: ()=> import('./pages/verify-code/verify-code.component').then((c)=> c.VerifyCodeComponent), title: 'Verify Code'},
    {path: 'resetPassword', loadComponent: ()=> import('./pages/reset-password/reset-password.component').then((c)=> c.ResetPasswordComponent), title: 'Reset Password'},
  ]},

  {path: '', component: MainLayoutComponent, canActivate:[authenticationGuard], children: [
    {path: '', redirectTo: 'home', pathMatch:'full'},
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'products', loadComponent: ()=> import('./pages/products/products.component').then((c)=> c.ProductsComponent), title: 'Products'},
    {path: 'product-details/:p_id', loadComponent: ()=> import('./pages/product-details/product-details.component').then((c)=> c.ProductDetailsComponent)},
    {path: 'categories', loadComponent: ()=> import('./pages/categories/categories.component').then((c)=> c.CategoriesComponent), title: 'Categories'},
    {path: 'brands', loadComponent: ()=> import('./pages/brands/brands.component').then((c)=> c.BrandsComponent), title: 'Brands'},
    {path: 'wishlist', loadComponent: ()=> import('./pages/wishlist/wishlist.component').then((c)=> c.WishlistComponent), title: 'Wishlist'},
    {path: 'cart', loadComponent: ()=> import('./pages/cart/cart.component').then((c)=> c.CartComponent), title: 'Cart'},
    {path: 'checkout/:cartId', loadComponent: ()=> import('./pages/checkout/checkout.component').then((c)=> c.CheckoutComponent), title: 'Checkout'},
    {path: 'allorders', loadComponent: ()=> import('./pages/allorders/allorders.component').then((c)=> c.AllordersComponent), title: 'Checkout'},
    {path: '**', component: NotFoundComponent, title: 'Error 404'},
  ]},
];
