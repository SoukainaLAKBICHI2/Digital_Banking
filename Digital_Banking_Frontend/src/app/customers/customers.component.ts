import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Customer} from '../model/customer.model';
import {CustomerService} from '../services/customer.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';



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


  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router) {}

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
  onEditCustomer(customer: Customer) {
    this.router.navigateByUrl(`/edit-customer/${customer.id}`);
  }
  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next : (resp) => {
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data;
          })
        );
      },
      error : err => {
        console.log(err);
      }
    })
  }
}
