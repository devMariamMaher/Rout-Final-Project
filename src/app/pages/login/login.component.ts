import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage!:string;
  isLoading:boolean = false;

  private _AuthenticationService = inject(AuthenticationService);
  private _Router = inject(Router);

  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, [Validators.required]),
  })

  login(){
    if(this.loginForm.valid){
      this.isLoading = true;

      this._AuthenticationService.signin(this.loginForm.value).subscribe({
        next: (res)=>{
          sessionStorage.setItem('token', res.token);
          this._AuthenticationService.decodeToken();
          this.isLoading = false;
          this._Router.navigate(['/home']);
          console.log(this._AuthenticationService.userToken);
        },
        error: (err)=>{
          this.errorMessage = err.error.message;
          this.isLoading = false;
        }
      })
    } else{
      this.loginForm.markAllAsTouched();
    }
  }
}
