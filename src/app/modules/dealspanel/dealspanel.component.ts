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
  public role = localStorage.getItem('role');
  mass = [];
  public selected = null;

  public value;
  selectedBox: Box;

  constructor(
    private restService: RestService) { }

  ngOnInit() {
    if (this.role === 'admin') {
      this.showAllDeals();
      this.mass = [
        {id: '1', name: 'Создать сделку'},
        {id: '2', name: 'Расторгнуть сделку'},
        {id: '3', name: 'Показать все сделки'}
      ];
    } else {
      this.showMyActive();
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
          break;
      }
    }
  }

  showMyActive() {
    this.restService.call('deal/show/my/active', null, 'GET')
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
          return res;
        },
        error => {
          localStorage.clear();
          window.alert('Ошибка получения сделок: \n' + error);
        });
  }

  creatDeal() {
    const params = {

    };
    this.restService.call('deal/create', params, 'POST')
      .subscribe((res: any) => {
          console.log(res);
          if (res === true) {
            if (this.role === 'client') {
                this.showMyActive();
            } else {
              this.showAllDeals();
            }
          } else {
            window.alert('Ошибка создания сделки.');
          }
          return res;
        },
        error => {
          window.alert('Ошибка создания сделки: \n' + error);
        });
  }

  disabledDeal() {
    const params = {

    };
    this.restService.call('deal/disable', params, 'POST')
      .subscribe((res: any) => {
          console.log(res);
          if (res === true) {
            if (this.role === 'client') {
              this.showMyDisabled();
            } else {
              this.showAllDeals();
            }
          } else {
            window.alert('Ошибка расторжения сделки.');
          }
          return res;
        },
        error => {
          window.alert('Ошибка расторжения сделки: \n' + error);
        });
  }

}
