import {CanActivateFn, Routes} from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import {AccountsComponent} from './accounts/accounts.component';
import {EditCustomerComponent} from './edit-customer/edit-customer.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {CustomerAccountsComponent} from './customer-accounts/customer-accounts.component';
import {LoginComponent} from './login/login.component';
import {AdminTemplateComponent} from './admin-template/admin-template.component';
import {authenticationGuard} from './guards/authentification.guard';
import {authorizationGuard} from './guards/authorization.guard';
import {NotAuthorizedComponent} from './not-authorized/not-authorized.component';

export const routes: Routes = [
  { path: 'login',component:LoginComponent},
  { path: '',redirectTo:"/login",pathMatch:"full" },
  { path: "admin",component:AdminTemplateComponent,
    canActivate :[authenticationGuard],
    children:[
      { path: 'customers', component:CustomersComponent},
      { path: 'accounts',component:AccountsComponent},
      { path: 'edit-customer/:id',component:EditCustomerComponent , canActivate :[authorizationGuard],data:{role:"ADMIN"}},
      { path: 'add-customer',component:NewCustomerComponent, canActivate :[authorizationGuard],data:{role:"ADMIN"}},
      { path: 'customer-accounts/:id',component:CustomerAccountsComponent, canActivate :[authorizationGuard],data:{role:"ADMIN"}},
      { path: 'notAuthorized',component:NotAuthorizedComponent},
    ]}
];
