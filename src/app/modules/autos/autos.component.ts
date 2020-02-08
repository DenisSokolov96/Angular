import { Component, OnInit } from '@angular/core';
import {Auto} from '../../beans/auto';
import {RestService} from '../../services/rest.service';
import {Account} from '../../beans/account';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {

  public dataAuto: Array<Auto> = new Array<Auto>();
  public selected = null;
  public nomer = null;
  public login = null;
  mass = [];
  public role = localStorage.getItem('role');
  public dataAcc: Array<Account> = new Array<Account>();

  constructor(private restService: RestService) { }

  ngOnInit() {
    if (this.role === 'admin') {
      this.getAllAuto();
      this.listAccount();
      this.mass = [
        {id: '1', name: 'Добавить автомобиль' },
        {id: '2', name: 'Показать все автомобили' }
      ];
    } else {
      this.getMyAuto();
      this.mass = [
        {id: '1', name: 'Добавить автомобиль' },
        {id: '2', name: 'Показать мои автомобили' }
      ];
    }
  }

  selectData(select: string) {
    if (this.role === 'admin') {
      switch (select) {
        case '1' :
          this.addToAuto();
          break;
        case '2' :
          this.getAllAuto();
          break;
      }
    } else {
      switch (select) {
        case '1' :
          this.addMyAuto()
          break;
        case '2' :
          this.getMyAuto();
          break;
      }
    }
  }

  getAllAuto() {
    this.restService.call('auto/show/all', null, 'GET')
      .subscribe((res: any) => {
          this.dataAuto = [];
          this.dataAuto = res;
          return res;
        },
        error => {
          localStorage.clear();
          window.alert('Ошибка получения всех автомобилей: \n' + error);
    });
  }

  addToAuto() {
    const params = {
      regNumber: this.nomer,
      login: this.login
    };
    this.restService.call('auto/add/to', params, 'POST')
      .subscribe((res: any) => {
          if (res === true) {
            this.getAllAuto();
          } else {
            window.alert('Ошибка добавления авто.');
          }
          return res;
        },
        error => {
          window.alert('Ошибка добавления автомобиля: \n' + error);
    });
  }

  getMyAuto() {
    this.restService.call('auto/show/my', null, 'GET')
      .subscribe((res: any) => {
          this.dataAuto = [];
          this.dataAuto = res;
          return res;
        },
        error => {
          localStorage.clear();
          window.alert('Ошибка получения автомобилей: \n' + error);
        });
  }

  addMyAuto() {
    const params = {
      regNumber: this.nomer
    };
    this.restService.call('auto/add/me', params, 'POST')
      .subscribe((res: any) => {
          if (res === true) {
            this.getMyAuto();
          } else {
            window.alert('Ошибка добавления авто.');
          }
          return res;
        },
        error => {
          window.alert('Ошибка добавления автомобиля: \n' + error);
        });
  }

  listAccount() {
    this.restService.call('/admin/accounts', null, 'GET')
      .subscribe((res: any) => {
          this.dataAcc = [];
          this.dataAcc = res;
          return res;
        },
        error => {
          window.alert('Ошибка получения данных об аккаунтах: \n' + error);
        });
  }

}
