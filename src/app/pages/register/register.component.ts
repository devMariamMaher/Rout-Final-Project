import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { doesNotMatch } from 'node:assert';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorMessage!:string;
  isLoading:boolean = false;

  private _AuthenticationService = inject(AuthenticationService);
  private _Router = inject(Router);

  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email:new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl(null, Validators.required),
    phone:new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, this.comparePass)

  register():void{
    if(this.registerForm.valid){
      this.isLoading = true;

      this._AuthenticationService.signup(this.registerForm.value).subscribe({
        next: (res)=>{
          console.log(res);
          this.isLoading = false;
          this._Router.navigate(['/login']);
        },
        error: (err)=>{
          this.errorMessage = err.error.message;
          console.log(err.error.message);
          this.isLoading = false;
        }
      })
      console.log(this.registerForm);
    } else{
      this.registerForm.markAllAsTouched();
    }
  }

  comparePass(group:AbstractControl){
    return group.get('password')?.value === group.get('rePassword')?.value ? null : {doesNotMatch: true};
  }
}
