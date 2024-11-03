import { Component } from '@angular/core';
import { LoginService } from './../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private loginservice: LoginService, private router: Router) { }

  logOut(){
    this.loginservice.removeLocalStore();
    this.router.navigate(["/inicio"]);
  }

}
