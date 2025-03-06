import { Component, inject, input, InputSignal, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  navCartCounter!:number;
  navCountUnSub!:Subscription;
  checkLogin:InputSignal<boolean> = input(false);

  private _AuthenticationService = inject(AuthenticationService);
  private _CartService = inject(CartService);
  private _Router = inject(Router);

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res)=>{
        this.navCartCounter = res.numOfCartItems;
      }
    })

    this.navCountUnSub = this._CartService.cartCount.subscribe({
      next: (value)=>{
        this.navCartCounter = value
      }
    });
  }

  logout():void{
    sessionStorage.removeItem('token');
    this._AuthenticationService.userToken = null;
    this._Router.navigate(['/login']);
    console.log(this._AuthenticationService.userToken);
  }
}
