import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private LoginService: LoginService) { }

  ngOnInit() {
  }

  onLogIn(username, password){
    this.LoginService.logIn({username: username, password: password})
    .subscribe
    (
      (data: any) => console.log(data),
      (error: any) => alert(error.error.message)
    );
  }

}
