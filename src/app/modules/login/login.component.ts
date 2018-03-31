import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private LoginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onLogIn(username, password){
    this.LoginService.logIn({username: username, password: password})
    .subscribe
    (
      (data: any) => {localStorage.setItem('studentId', data._id); this.router.navigate(['/home']);},
      (error: any) => alert(error.error.message)
    );
  }
}
