import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {throwError} from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RestService {


  private jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'});
  // private static DEFAULT_PATH = '/rest/';

  constructor(private http: HttpClient) {
  }

  /**
   * Вызов веб-сервиса
   * @param methodName - имя метода
   * @param params - параметры
   */
/*  public call(methodName: string, params: any, reqType: string) {
    const url = 'http://localhost:8080/' + methodName;
    console.log('calling ' + methodName + ' with params: ', params);
    const options = {
      headers: this.jsonHeaders,
      body: params,
      withCredentials: true
    };
    return this.httpClient.request(reqType, url, options)
      .pipe(map((response) => {
        return this.mapResponse(methodName, response);
      }));
  }*/
  public call(username: string, password: string) {

    // tslint:disable-next-line:max-line-length
   const headers = new HttpHeaders({  'Content-Type': 'application/json', Accept: 'application/json', Authorization: 'Basic ' + btoa(username + ':' + password ) });
  /* headers.append('Content-Type', 'application/json');
   headers.append('Accept', 'application/json');*/
   // @ts-ignore
   return this.http
      .get<any>(`http://localhost:8080/test/clientrole`,   { headers })
      .pipe( map((user) => {
          // login successful if there's a user in the response
        if (user) {
            // store user details and basic auth credentials in local storage
            // to keep user logged in between page refreshes
            user.authdata = window.btoa(username + ':' + password);
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.alert('if');
        }

        return user;
        },
        error => {
          window.alert('rest service' + error);

        }
        ));

    /*const headers = new HttpHeaders({   Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<any>('http://localhost:8080/test/allrole', { headers }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          const authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('basicauth', authString);
          window.alert('После ' + username + ':' + password);
          return userData;
        }
      )

    );*/
    /*window.alert('До ' + username + ':' + password);
    return this.http.post<any>(`http://localhost:8080/test/allrole`, { username , password})
      .pipe(map(user => {
        // login successful if there's a user in the response
        if (user) {
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          user.authdata = window.btoa(username + ':' + password);
          localStorage.setItem('login', JSON.stringify(user.authdata.username));
          localStorage.setItem('password', JSON.stringify(user.authdata.username));
          window.alert('После ' + username + ':' + password);
        }
        return user;
      }));*/
  }

  /**
   * Мапинг результата вызова
   * @param methodName
   * @param response
   */
  private mapResponse(methodName, response) {
    console.log(methodName + ' call result: ', response);
    // console.log(response.username)
    // console.log(response.token)
    return response;
  }

}
