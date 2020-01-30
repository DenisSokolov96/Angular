import { Component, OnInit } from '@angular/core';
import {Deal} from '../../beans/deal';
import {Role} from '../../beans/role';
import {NgModel} from '@angular/forms';
import {RestService} from '../../services/rest.service';
import {PersonData} from '../../beans/personData';
import {Auto} from '../../beans/auto';


@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {

  public roleList: Array<Role> = new Array<Role>();
  nameBox: string;
  surnameBox: string;
  roleBox: Role;
  regNumber: string;

  public data: Array<PersonData> = new Array<PersonData>();
  // tslint:disable-next-line:variable-name
  private _isAdmin: boolean;
  // outputName: string;
  // outputSurname: string;
  // outputRole: string;

  public autoList: Array<Auto> = new Array<Auto>();





  get isAdmin(): boolean {
    return this._isAdmin;
  }

  set isAdmin(value: boolean) {
    this._isAdmin = value;
  }


  constructor(
    private restService: RestService,

  ) {
    // this.outputPersonData.name = '';
    // this.outputPersonData.surname = '';
    // this.outputPersonData.role.name = '';
  }

  ngOnInit() {


    console.log('INIT OF CABINET');
    const login = localStorage.getItem('login');
    const role = localStorage.getItem('role');
    const password = localStorage.getItem('password');

    // tslint:disable-next-line:triple-equals
    if (role == 'admin') {   this.isAdmin = true; }



    console.log('LOAD DATA OF CABINET');
    this.loadData(login, password);
    this.loadRoleData();
    this.loadAutoData();

  }

  changePersonData(nameInput: NgModel, surnameInput: NgModel, roleInput: NgModel) {

    console.log(nameInput.value, surnameInput.value, roleInput.value);
    this.callChangeMainData(nameInput.value, surnameInput.value);
    if (this.isAdmin) {
      this.callChangeRole(roleInput.value);
    }
  }

  callChangeMainData(name: string, surname: string) {

    const login = localStorage.getItem('login');
    const password = localStorage.getItem('password');

    const params = {
      login,
      password,
      name,
      surname
    };
    console.log(params);
    this.restService.call('', '')// ('persondata/change', params, 'POST')
      .subscribe((res: any) => {
          // console.log(res);
        //  this.deals = [];
         // this.deals = res.dealList;
         // console.log(this.freeBoxList);
        }
      );
  }


  /*Добавить номер машины*/
  changeRegNumber(numberInput: NgModel) {

    this.callChangeRegNumber(numberInput.value);
  }

  // tslint:disable-next-line:variable-name
  callChangeRegNumber(number: string) {

    console.log(number);
    const login = localStorage.getItem('login');
    const password = localStorage.getItem('password');

    const params = {
      login,
      password,
      number
    };
    console.log(params);
    this.restService.call(login, password)// ('persondata/change', params, 'POST')
      .subscribe((res: any) => {
          // console.log(res);
          //  this.deals = [];
          // this.deals = res.dealList;
          // console.log(this.freeBoxList);
        }
      );
  }

  private callChangeRole(value: string) {

  }

  private loadData(login: string, password: string) {

    const params = {
      login,
      password
    };
    console.log('Load data ' + params);
    this.restService.call(login, password)// ('persondata/show', params, 'POST')
      .subscribe((res: any) => {
           console.log(res);
           // this.outputPersonData = null;
           this.data = res.dataList;

           console.log(this.data);
        }
      );
  }

  loadRoleData() {

    this.restService.call('', '')// ('persondata/roles', null, 'GET')
      .subscribe((res: any) => {
          // console.log(res);
          this.roleList = [];
          this.roleList = res.roleList;
          console.log(this.roleList);
        }
      );
  }

  loadAutoData() {

    this.restService.call('', '')// ('', null, 'GET')
      .subscribe((res: any) => {
          // console.log(res);
          this.autoList = [];
          this.autoList = res.autoList;
          console.log(this.autoList);
        }
      );
  }


}
