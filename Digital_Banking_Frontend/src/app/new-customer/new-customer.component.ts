import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CustomerService } from '../services/customer.service'; // Adjust path as needed
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  newCustomerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newCustomerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public onSubmit(): void {
    if (this.newCustomerForm.valid) {
      this.customerService.addCustomer(this.newCustomerForm.value).subscribe({
        next: () => this.router.navigateByUrl('admin/customers'),
        error: (err) => alert('Error: ' + err.message)
      });
    }
  }
}
