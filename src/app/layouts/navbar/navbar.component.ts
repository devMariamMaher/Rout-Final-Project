import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private _AuthenticationService = inject(AuthenticationService);
  private _Router = inject(Router);

  logout():void{
    sessionStorage.removeItem('token');
    this._AuthenticationService.userToken = null;
    this._Router.navigate(['/login']);
  }
}
