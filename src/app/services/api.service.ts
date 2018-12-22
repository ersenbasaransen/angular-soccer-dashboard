import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL : string = "http://ip.jsontest.com";
  constructor(private httpClient : HttpClient) { }

  getIP() {
    return this.httpClient.get(`${this.API_URL}`);
  }

  // public getIP (): Observable<string> {
  //   return this._http.get(this._IPURL).map(this.extractIP);
  // }

  // private extractIP(res: Response) :string {
  //   let body = res.json();
  //   return body.ip || { };
  // }
}
