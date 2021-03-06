import { Component, OnInit } from '@angular/core';
import {PersonData} from '../../beans/personData';
import {Box} from '../../beans/box';
import {Role} from '../../beans/role';
import {NgModel} from '@angular/forms';
import {RestService} from '../../services/rest.service';
import {NgSwitchCase} from '@angular/common';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  public tarif = null;
  public dell = null;
  // tslint:disable-next-line:variable-name
  public role = localStorage.getItem('role');
  mass = [];

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.getAll();
    if (this.role === 'admin') {
      this.mass = [
        {id: '1', name: 'показать пустые' },
        {id: '2', name: 'показать все' },
        {id: '3', name: 'добавить бокс' },
        {id: '4', name: 'удалить бокс' }
      ];
    } else {
      this.mass = [
        {id: '1', name: 'показать пустые' },
        {id: '2', name: 'показать все' }
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
        case '4' :
          this.dellBox(this.dell);
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
          window.alert('Ошибка получения пустых боксов: \n' + error);
        });
  }

  getAdd(col2: number, row2: number) {
    const params = {
      col: col2,
      row: row2,
      coefficient: this.tarif
    };
    this.restService.call('box/add', params, 'POST')
      .subscribe((res: any) => {
          if (res === null) {
            window.alert('Бокс добавлен.');
          } else {
            window.alert('Ошибка добавления бокса.');
          }
          return res;
        },
        error => {
          window.alert('Ошибка добавления бокса: \n' + error);
        });
  }

  dellBox(idB: string) {
    const params = {
      box_id: idB
    };
    this.restService.call('box/remove', params, 'POST')
      .subscribe((res: any) => {
          window.alert('Бокс удален.');
          this.getAll();
          return res;
        },
        error => {
          window.alert('Ошибка удаления бокса: \n' + error);
        });
  }
}
