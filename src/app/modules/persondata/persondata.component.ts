import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import {PersonData} from '../../beans/personData';

@Component({
  selector: 'app-persondata',
  templateUrl: './persondata.component.html',
  styleUrls: ['./persondata.component.css']
})
export class PersondataComponent implements OnInit {

  public dataPerson: PersonData;
  public newName = null;
  public newSurname = null;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.restService.call('/persondata/show', null, 'GET')
      .subscribe((res: any) => {
          this.dataPerson = null;
          this.dataPerson = res;
          return res;
        },
        error => {
          window.alert('Ошибка получения данных об аккаунтах: \n' + error);
        });
  }

  changePersonData() {

    if (this.newName === null) {
      this.newName = this.dataPerson.name;
    }
    if (this.newSurname === null) {
      this.newSurname = this.dataPerson.surname;
    }
    const params = {
      newName: this.newName,
      newSurname: this.newSurname
    };
    this.restService.call('persondata/change', params, 'POST')
      .subscribe((res: any) => {
          console.log(res);
          if (res === true) {
            this.getData();
          } else {
            window.alert('Ошибка изменения данных.');
          }
          return res;
        },
        error => {
          window.alert('Ошибка изменения данных: \n' + error);
        });
  }

}
