import { Component, OnInit } from '@angular/core';
import {PersonData} from '../../beans/personData';
import {Box} from '../../beans/box';
import {Role} from '../../beans/role';
import {NgModel} from '@angular/forms';
import {RestService} from '../../services/rest.service';
import {NgSwitchCase} from '@angular/common';

@Component({
  selector: 'app-boxs',
  templateUrl: './boxs.component.html',
  styleUrls: ['./boxs.component.css']
})
export class BoxsComponent implements OnInit {

  public data: Array<Box> = new Array<Box>();
  public selected = null;
  public col = null;
  public row = null;
  // tslint:disable-next-line:variable-name
  private role = localStorage.getItem('role');
  mass = [];

  constructor(private restService: RestService) { }

  ngOnInit() {
    if (this.role === 'admin') {
      this.mass = [
        {id: '1', name: 'показать пустые' },
        {id: '2', name: 'показать все' },
        {id: '3', name: 'добавить' }
      ];
    } else {
      this.mass = [
        {id: '1', name: 'показать пустые' }
      ];
    }
  }

  selectData( select: string, col: number, row: number) {
      switch (select) {
        case '1' :
          this.getFree();
          break;
        case '2' :
          this.getAll();
          break;
        case '3' :
          if ( (col > -1) && (row > -1) ) {
          this.getAdd(col, row);
          }
          break;
      }
 }

  getAll() {
    this.restService.call('box/show/all', null, 'GET')
      .subscribe((res: any) => {
          this.data = [];
          this.data = res;
          console.log(this.data);
          return res;
        },
        error => {
          localStorage.clear();
          window.alert('Ошибка получения всех боксов: \n' + error);
        });
  }

  getFree() {
    this.restService.call('box/show/free', null, 'GET')
      .subscribe((res: any) => {
          this.data = [];
          this.data = res;
          return res;
        },
        error => {
          localStorage.clear();
          window.alert('Ошибка получения пустых боксов: \n' + error);
        });
  }

  getAdd(col2: number, row2: number) {
    const params = {
      col: col2,
      row: row2
    };
    this.restService.call('box/add', params, 'POST')
      .subscribe((res: any) => {
          if (res === true) {
            window.alert('Бокс добавлен.');
          } else {
            window.alert('Ошибка добавления бокса.');
          }
          return res;
        },
        error => {
          localStorage.clear();
          window.alert('Ошибка добавления бокса: \n' + error);
        });
  }
}
