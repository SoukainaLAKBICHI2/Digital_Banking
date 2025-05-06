import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    NavbarComponent,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Digital_Banking_Frontend';
}
