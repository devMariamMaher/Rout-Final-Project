import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
  isLoading:boolean = false;

  private _AuthenticationService = inject(AuthenticationService);
  private _Router = inject(Router);

  verifyCodeForm:FormGroup = new FormGroup({
    resetCode:new FormControl(null, Validators.required)
  })

  verifyCode(){
    if(this.verifyCodeForm.valid){
      this.isLoading = true;

      this._AuthenticationService.verifyResetCode(this.verifyCodeForm.value).subscribe({
        next: (res)=>{
          this.isLoading = false;
          this._Router.navigate(['/resetPassword']);
        },
        error: (err)=>{
          this.isLoading = false;
        }
      })
    } else{
      this.verifyCodeForm.markAllAsTouched();
    }
  }
}
