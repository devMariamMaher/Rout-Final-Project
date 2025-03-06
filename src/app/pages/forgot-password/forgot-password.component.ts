import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  isLoading:boolean = false;

  private _AuthenticationService = inject(AuthenticationService);
  private _Router = inject(Router);

  forgotPassForm:FormGroup = new FormGroup({
    email:new FormControl(null, [Validators.required, Validators.email]),
  })

  forgotPassword(){
    if(this.forgotPassForm.valid){
      this.isLoading = true;

      this._AuthenticationService.forgotPassword(this.forgotPassForm.value).subscribe({
        next: (res)=>{
          this.isLoading = false;
          this._Router.navigate(['/verifyCode']);
          console.log(res);
        },
        error: (err)=>{
          console.log(err);
          this.isLoading = false;
        }
      })
    } else{
      this.forgotPassForm.markAllAsTouched();
    }
  }
}
