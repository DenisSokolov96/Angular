import { Component, OnInit } from '@angular/core';
import {Role} from '../../beans/role';
import {RestService} from '../../services/rest.service';
import {Account} from '../../beans/account';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  public dataAcc: Array<Account> = new Array<Account>();
  public selected = null;
  public newRole = null;
  public login = null;
  public newRoleChange: Role;
  mass = [
    {id: '1', name: 'просмотреть список аккаунтов' },
    {id: '2', name: 'сменить роль' }];

  massRole = [
    {id: '1', name: 'Администратор' },
    {id: '2', name: 'Клиент' }];


  constructor(private restService: RestService) { }

  ngOnInit() {
    this.listAccount();
  }

  getData( select: string, log: string, newR: string) {
    switch (select) {
      case '1' :
          this.listAccount();
          break;
      case '2' :
          if (newR === '1' ) {
            this.changeRole(log, 'admin');
          } else {
            this.changeRole(log, 'client');
          }
          break;
    }
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

  changeRole(log: string, newR: string) {

    const params = {
      login: log,
      newRole: newR
    };
    this.restService.call('roles/change', params, 'POST')
      .subscribe((res: any) => {
          console.log(res);
          if (res === true) {
            this.listAccount();
          } else {
           window.alert('Ошибка смены роли.');
          }
          return res;
        },
        error => {
          window.alert('Ошибка изменения данных: \n' + error);
        });
  }

}
