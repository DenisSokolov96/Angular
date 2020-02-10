import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Payment} from '../../beans/Payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public dataPays: Array<Payment> = new Array<Payment>();
  public selected = null;
  public role = localStorage.getItem('role');
  public summa = null;
  public balance = 0;
  mass = [];

  constructor(private restService: RestService) { }

  ngOnInit() {
    if (this.role === 'admin') {
      this.getAllPay();
      this.mass = [
        {id: '1', name: 'Показать полный список оплат' },
        {id: '2', name: 'Пополнить' }
      ];
    } else {
      this.getMyPay();
      this.mass = [
        {id: '1', name: 'Показать список оплат' },
        {id: '2', name: 'Пополнить' }
      ];
    }
  }

  selectData()  {

    if (this.role === 'admin') {
      switch (this.selected) {
        case '1':
          this.getAllPay();
          break;
        case '2':
          this.payIncome();
          break;
      }
    } else {
      switch (this.selected) {
        case '1':
          this.getMyPay();
          break;
        case '2':
          this.payIncome();
          break;
      }
    }
  }

  getMyPay() {
    this.restService.call('payment/show/my', null, 'GET')
      .subscribe((res: any) => {
          this.dataPays = [];
          this.dataPays = res;
          console.log(res);
          this.getBalance();
          return res;
        },
        error => {
          window.alert('Ошибка получения оплаты: \n' + error);
        });
  }

  getAllPay() {
    this.restService.call('payment/show/all', null, 'GET')
      .subscribe((res: any) => {
          this.dataPays = [];
          this.dataPays = res;
          console.log(res);
          return res;
        },
        error => {
          window.alert('Ошибка получения оплаты: \n' + error);
        });
  }

  payIncome() {

    // 2020-02-07T15:40:26.071+03:00[Europe/Moscow]
    const now = new Date();
    const params = {
      dateTime: now,
      description: 'Пополнение',
      money: this.summa * 100
    };
    this.restService.call('payment/income', params, 'POST')
      .subscribe((res: any) => {
          if (this.role === 'admin') {
            this.getAllPay();
          } else {
            this.getMyPay();
            this.getBalance();
          }
          return res;
        },
        error => {
          window.alert('Ошибка оплаты: \n' + error);
        });
  }

  getBalance() {

   let i: number;
   let s = 0;
   let sum: number;

   for ( i = 0; i < this.dataPays.length; i++) {
     if (this.dataPays[i].type === 'outcome') {
        sum = this.dataPays[i].money;
        s = s - sum;
     } else {
        sum = this.dataPays[i].money;
        s = s + sum;
      }
    }
   s = s / 100;
   this.balance = s;
   window.alert(s);
  }

}
