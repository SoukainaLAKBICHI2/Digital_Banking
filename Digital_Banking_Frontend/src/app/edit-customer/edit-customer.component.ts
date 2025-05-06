import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customerId!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customer) => {
        this.customerForm = this.fb.group({
          name: [customer.name, Validators.required],
          email: [customer.email, [Validators.required, Validators.email]]
        });
      },
      error: err => console.error(err)
    });
  }

  onUpdateCustomer() {
    if (this.customerForm.invalid) return;
    this.customerService.updateCustomer(this.customerId, this.customerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/customers'),
      error: err => console.error(err)
    });
  }
}
