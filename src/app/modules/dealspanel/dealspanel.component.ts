import { Component, OnInit } from '@angular/core';
import {Deal} from '../../beans/deal';
import {Box} from '../../beans/box';
import {HeaderService} from '../../services/header.service';
import {RestService} from '../../services/rest.service';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-dealspanel',
  templateUrl: './dealspanel.component.html',
  styleUrls: ['./dealspanel.component.css']
})
export class DealspanelComponent implements OnInit {

  public deals: Array<Deal> = new Array<Deal>();
  public dealsActive: Array<Deal> = new Array<Deal>();
  public dealsActiveAll: Array<Deal> = new Array<Deal>();
  public role = localStorage.getItem('role');
  mass = [];
  public selected = null;
  public selectDis = null;
  public selectBox = null;
  public dataBox: Array<Box> = new Array<Box>();
  massID = [];

  public value;
  selectedBox: Box;

  constructor(
    private restService: RestService) { }

  ngOnInit() {
    if (this.role === 'admin') {
      this.showAllDeals();
      this.getFree();
      this.mass = [
        {id: '1', name: 'Создать сделку'},
        {id: '2', name: 'Расторгнуть сделку'},
        {id: '3', name: 'Показать все сделки'}
      ];
    } else {
      this.showMyActive();
      this.getFree();
      this.mass = [
        {id: '1', name: 'Создать сделку'},
        {id: '2', name: 'Расторгнуть сделку'},
        {id: '3', name: 'Активные сделки'},
        {id: '4', name: 'Расторгнутые сделки'}
      ];
    }
  }

  selectData() {
    if (this.role === 'client') {
      switch (this.selected) {
        case '1':
          this.creatDeal();
          break;
        case '2':
          this.disabledDeal();
          break;
        case '3':
          this.showMyActive();
          break;
        case '4':
          this.showMyDisabled();
          break;
      }
    } else {
      switch (this.selected) {
        case '1':
          this.creatDeal();
          break;
        case '2':
          this.disabledDeal();
          break;
        case '3':
          this.showAllDeals();
/*
          let num = 0;
          for (num = 0; num < this.dealsActiveAll.length; num++) {
            if (!this.dealsActiveAll[num].status) {
              console.log(' Я тут ' + this.dealsActiveAll.length + ' ' + this.deals.length);
              this.dealsActiveAll.splice(num, 1);
              console.log(' Я тут ' + this.dealsActiveAll.length + ' ' + this.deals.length);
            }
          }
*/
          break;
      }
    }
  }

  showMyActive() {
    this.restService.call('deal/show/my/active', null, 'GET')
      .subscribe((res: any) => {
          this.deals = [];
          this.deals = res;
          this.dealsActive = [];
          this.dealsActive = this.deals;
          return res;
        },
        error => {
          localStorage.clear();
          window.alert('Ошибка получения сделок: \n' + error);
        });
  }

  showMyDisabled() {
    this.restService.call('deal/show/my/disabled', null, 'GET')
      .subscribe((res: any) => {
          this.deals = [];
          this.deals = res;
          return res;
        },
        error => {
          localStorage.clear();
          window.alert('Ошибка получения сделок: \n' + error);
        });
  }

  showAllDeals() {
    this.restService.call('deal/show/all', null, 'GET')
      .subscribe((res: any) => {
          this.deals = [];
          this.deals = res;
          this.dealsActiveAll = [];
          this.dealsActiveAll = res;
          return res;
        },
        error => {
          localStorage.clear();
          window.alert('Ошибка получения сделок: \n' + error);
        });
  }

  creatDeal() {
    const params = {
     box_id: 26
    };
    this.restService.call('deal/create', params, 'POST')
      .subscribe((res: any) => {
          console.log(res);
          if (this.role === 'client') {
              this.showMyActive();
              this.getFree();
          } else {
            this.showAllDeals();
            this.getFree();
          }
          return res;
        },
        error => {
          window.alert('Ошибка создания сделки: \n' + error);
        });
  }

  disabledDeal() {
    const params = {
      deal_id: this.selectDis
    };
    this.restService.call('deal/disable', params, 'POST')
      .subscribe((res: any) => {
          console.log(res);
          if (this.role === 'client') {
            this.showMyActive();
          } else {
            this.showAllDeals();
          }
          return res;
        },
        error => {
          window.alert('Ошибка расторжения сделки: \n' + error);
        });
  }
  getFree() {
    this.restService.call('box/show/free', null, 'GET')
      .subscribe((res: any) => {
          this.dataBox = [];
          this.dataBox = res;
          return res;
        },
        error => {
          localStorage.clear();
          window.alert('Ошибка получения пустых боксов: \n' + error);
        });
  }

}
