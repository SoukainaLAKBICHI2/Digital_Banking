import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Customer} from '../model/customer.model';
import {CustomerService} from '../services/customer.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-customers',

  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Customer[]>;
  searchFormGroup!: FormGroup;


  constructor(private customerService: CustomerService, private fb: FormBuilder,) {}

  ngOnInit(): void {
    this.customers = this.customerService.getAllCustomers();
    this.searchFormGroup = this.fb.group({
      keyword: ['']
    });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    const keyword = this.searchFormGroup.value.keyword;
    this.customers = this.customerService.searchCustomers(keyword)
  }
}
