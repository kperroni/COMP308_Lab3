import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private LoginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onLogOut(){
    this.LoginService.logOut()
    .subscribe(
      (data: any) => {
        console.log(data);
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    );
  }

}
