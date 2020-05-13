import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseURL = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  // private request(method: string, url: string, data?: any) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Credentials': 'true',
  //         'Access-Control-Allow-Headers': 'Content-Type',
  //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  //     })
  // };
  //   return this.http.post<any>(url, JSON.stringify(data), httpOptions).subscribe(res => {
  //     console.log('res: ',res)
  //   })
    // const result = this.http.request(method, url, {
    //   body: data,
    //   responseType: 'json',
    //   observe: 'body',
    //   headers: {
    //     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // });
    // return new Promise<any>((resolve, reject) => {
    //   result.subscribe(resolve as any, reject as any);
    // });
  // }


  // async login(userName, pass) {
  //   console.log("d5l hna");
  //   var data = {
  //     userName, pass
  //   }

  //   var x = await this.request('post', this.baseURL + 'login', data);
  //   console.log('x: ', x);

  // }

}
