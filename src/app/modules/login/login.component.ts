import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestService} from '../../services/rest.service';
import {HeaderService} from '../../services/header.service';
import {Deal} from '../../beans/deal';
import {HttpHeaders} from '@angular/common/http';
import {first, take} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  private mode: boolean;


  constructor(
    private headerService: HeaderService,
    private router: Router,
    private restService: RestService
  ) {
  }

  ngOnInit() {
    this.mode = true;
  }
  toggleVisibility(e) {
    this.mode = e.target.checked;
  }


  logIn(l: string, p: string) {

    l = 'Oleg';
    p = 'pass';

    if (this.mode) {
      console.log('/auth/user');
      this.restService.call(l, p, '/auth/user')
        .subscribe((res: any) => {
            // tslint:disable-next-line:triple-equals
            if (res.result == true) {
              this.router.navigate(['/home']);
            }
            return res;
          },
          error => {
            window.alert('Ошибка аутентификации: \n' + error );
          }
        );
    } else {
      console.log('/registration');
      this.restService.call(l, p, '/registration')
        .subscribe((res: any) => {
            // tslint:disable-next-line:triple-equals
            this.mode = true;
            return res;
          },
          error => {
            window.alert('Ошибка регистрации: \n' + error );
          }
        );
    }
  }


}

