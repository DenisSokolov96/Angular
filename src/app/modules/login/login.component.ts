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


  constructor(
    private headerService: HeaderService,
    private router: Router,
    private restService: RestService
  ) {
  }

  ngOnInit() {
  }


  logIn(l: string, p: string) {

    l = 'Oleg';
    p = 'pass';
    const params = {
      login: l,
      password: p
    };
    this.restService.call(l, p)// .pipe(first())
      .subscribe((res: any) => {
         console.log(res);
        // tslint:disable-next-line:triple-equals
         if (res.result == true) {
         localStorage.setItem('login', params.login);
         localStorage.setItem('role', res.role);
         localStorage.setItem('password', params.password);
         window.alert('then');
         this.router.navigate(['/home']);
         } else {
          window.alert('incorrect login or password');
         }
         return res;
      },
        error => {
          window.alert('login component error : \n' + error );
        }
        );
  }


}

//////////////////////////////////////////


