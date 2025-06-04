import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {CustomerService} from '../services/customer.service';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: "./navbar.component.html"
})
export class NavbarComponent implements OnInit{

  constructor(protected authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }
handleLogout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
}

  protected readonly AuthService = AuthService;
}
