import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email:new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, Validators.pattern(/^\w{6,}$/)),
    rePassword:new FormControl(null, Validators.required),
    phone:new FormControl(null, Validators.pattern(/^01[0125][0-9]{8}$/)),
  }, this.comparePass)

  sendData():void{
    console.log(this.registerForm);
  }

  comparePass(group:AbstractControl){
    if(group.get('password')?.value === group.get('rePassword')?.value){
      return null;
    } else{
      return {doNotMatch: true}
    }
  }
}
