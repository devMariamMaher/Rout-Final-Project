import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  isLoading:boolean = false;

  private _AuthenticationService = inject(AuthenticationService);
  private _Router = inject(Router);

  resetPasswordForm:FormGroup = new FormGroup({
    email:new FormControl(null, [Validators.required, Validators.email]),
    newPassword:new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  })

  resetPassword(){
    if(this.resetPasswordForm.valid){
      this.isLoading = true;

      this._AuthenticationService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res)=>{
          sessionStorage.setItem('token', res.token);
          this._AuthenticationService.decodeToken();
          this.isLoading = false;
          this._Router.navigate(['/login']);
        },
        error: (err)=>{
          this.isLoading = false;
        }
      })
    } else{
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}
