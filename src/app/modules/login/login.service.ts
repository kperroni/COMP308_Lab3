import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  logIn(body) {
    return this.http.post(environment.apiUrl + "/api/auth/signin", body);
  }
}
