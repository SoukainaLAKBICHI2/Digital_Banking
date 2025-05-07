import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import {AccountsComponent} from './accounts/accounts.component';
import {EditCustomerComponent} from './edit-customer/edit-customer.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {CustomerAccountsComponent} from './customer-accounts/customer-accounts.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'add-customer', component: NewCustomerComponent},
  { path: 'customer-accounts', component: CustomerAccountsComponent},
  {
    path: 'edit-customer/:id', component: EditCustomerComponent}
];
