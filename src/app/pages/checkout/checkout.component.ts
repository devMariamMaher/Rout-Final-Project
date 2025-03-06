import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../core/services/order/payment.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  cartId!:string;
  @ViewChild('cash') cash!:ElementRef
  @ViewChild('creditCard') creditCard!:ElementRef

  private _ActivatedRoute = inject(ActivatedRoute);
  private _PaymentService = inject(PaymentService);
  private _CartService = inject(CartService);
  private _Router = inject(Router);

  detailsForm:FormGroup = new FormGroup({
    details:new FormControl(null, Validators.required),
    phone:new FormControl(null, Validators.required),
    city:new FormControl(null, Validators.required),
  })

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param)=>{
        this.cartId = param.get('cartId') !;
      }
    })
  }

  detailsSubmit(){
    if(this.detailsForm.valid){
      if(this.cash.nativeElement.checked){
        this._PaymentService.createCashOrder(this.cartId, this.detailsForm.value).subscribe({
          next: (res)=>{
            console.log(res);
            if(res.status == 'success'){
              this._Router.navigate(['/allorders']);

              this._CartService.getLoggedUserCart().subscribe({
                next: (res)=>{
                  this._CartService.cartCount.next(res.numOfCartItems);
                }
              })
            }
          }
        })
      } else{
        this._PaymentService.checkoutSession(this.cartId, this.detailsForm.value).subscribe({
          next: (res)=>{
            console.log(res);
            if(res.status == 'success'){
              window.open(res.session.url, '_self');
            }
          }
        })
      }
    } else{
      this.detailsForm.markAllAsTouched();
    }
  }
}
