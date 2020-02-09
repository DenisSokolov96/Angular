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


  public mode: boolean;


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


  logIn(inputLogin: string, inputPassword: string) {

    // inputLogin = 'NewUser2';
    // inputPassword = 'pass';
    inputLogin = 'Oleg';
    inputPassword = 'pass';

    const authData = btoa(inputLogin + ':' + inputPassword);

    localStorage.setItem('authData', authData);

    console.log('MODE - ' + this.mode);
    if (this.mode) {
      console.log('auth/user');
      this.restService.call('auth/user', null, 'GET')
        .subscribe((res: any) => {

            if (res.result === true) {
              console.log('SUCCESS');

              localStorage.setItem('login', inputLogin);
              localStorage.setItem('role', res.role);
              console.log(res.role);
              this.router.navigate(['app']);
            }
            return res;
          },
          error => {
            localStorage.clear();
            window.alert('Ошибка аутентификации: \n' + error);
          }
        );
    } else {

      console.log('registration');

      const params = {
        login: inputLogin,
        password: inputPassword
      };

      this.restService.call('registration', params, 'POST')
        .subscribe((res: any) => {

            this.mode = true;
            return res;
          },
          error => {
            window.alert('Ошибка регистрации: \n' + error);
          }
        );
    }
  }


}

