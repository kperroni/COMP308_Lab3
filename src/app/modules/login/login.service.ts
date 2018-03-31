import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

logIn(body){
  return this.http.post("api/auth/signin" , body);
}

logOut(){
  return this.http.get('api/auth/signout');
}
}
