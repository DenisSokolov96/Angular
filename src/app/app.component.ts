import {Component, Injectable} from '@angular/core';
import {HeaderService} from './services/header.service';
import {Router} from '@angular/router';



@Component({

  // tslint:disable-next-line:component-selector
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
@Injectable({
  providedIn: 'root'
})


export class AppComponent {
  title = '';

  constructor(
    private headerService: HeaderService,
    private router: Router,
  ) {
  }

  loggedIn: boolean;
  // tslint:disable-next-line:variable-name
  private _isAdmin: boolean;


  get isAdmin(): boolean {
    return this._isAdmin;
  }

  set isAdmin(value: boolean) {
    this._isAdmin = value;
  }


  // TODO: check tis method
  // tslint:disable-next-line:use-lifecycle-interface
  curUserLogin = localStorage.getItem('login');
  ngOnInit() {
    const login = localStorage.getItem('login');
    const role = localStorage.getItem('role');

    if (role === 'admin') {
      this.isAdmin = true;
    }

    console.log('login  ' + login);
    if (login != null) {
      this.headerService.setTitle('Добро пожаловать, ' + localStorage.getItem('login') + '!');
      this.loggedIn = true;
    } else {
      this.headerService.setTitle('Добро пожаловать, гость!');
      this.loggedIn = false;
    }

    this.headerService.title.subscribe(title => {
      this.title = title;
      if ((this.title === 'Добро пожаловать, гость!!' &&
        this.loggedIn === true) ||
        (this.title !== 'Добро пожаловать, гость!' &&
          this.loggedIn === false)
      ) {
        this.loggedIn = !this.loggedIn;
        console.log('OLD_RELOAD_FUNC!?');
        window.location.reload();
      }

      /**
       * Место где произходит проверка нп вход TODO: можно лучше
       */

      if (!this.loggedIn) {
        this.router.navigate(['login']);
      } else {
        if (role === 'client') {
          this.router.navigate(['persondata']);
        } else {
          this.router.navigate(['admin']);
        }
      }

    });
  }

  logOut() {
    localStorage.clear();
    this.headerService.setTitle('Добро пожаловать, гость!');
    this.router.navigate(['login']).then(() =>
      window.location.reload()
     );
  }

}

