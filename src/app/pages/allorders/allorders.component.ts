import { IAllOrders } from './../../core/interfaces/allorders/iall-orders';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/order/payment.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  allOrdersData:IAllOrders[] | null = null;

  private _PaymentService = inject(PaymentService);

  ngOnInit(): void {
    this._PaymentService.getUserOrders().subscribe({
      next: (res)=>{
        this.allOrdersData = res;
      }
    })
  }
}
