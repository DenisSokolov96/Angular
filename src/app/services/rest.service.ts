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

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Вызов веб-сервиса
   * @param methodName - имя метода
   * @param params - параметры
   */
 public call(methodName: string, params: any, reqType: string) {
    const url = 'http://localhost:8080/' + methodName;
    console.log('calling ' + methodName + ' with params: ', params);
    const options = {
      headers: this.jsonHeaders,
      body: params
    };
    return this.httpClient.request(reqType, url, options)
      .pipe(map((response) => {
        return this.mapResponse(methodName, response);
      }));
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
