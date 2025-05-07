import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccountService } from '../services/accounts.service';
import {AccountDetails, AccountOperation} from '../model/account.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-accounts',
  standalone: true,
  templateUrl: './accounts.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AccountsComponent {
  accountId: string = '';
  accountDetails: AccountDetails | null = null;
  operations: AccountOperation[] = [];
  error: string = '';
  currentPage: number = 0;
  pageSize: number = 5;
  accountFormGroup! : FormGroup;
  operationFromGroup! : FormGroup;

  constructor(private accountService: AccountService) {}

  search(page: number = 0) {
    this.accountService.getAccountDetails(this.accountId).subscribe({
      next: (details) => {
        this.accountDetails = details;
        this.error = '';
      },
      error: () => {
        this.error = 'Error fetching account details';
        this.accountDetails = null;
      }
    });

    this.accountService.getOperations(this.accountId, page, this.pageSize).subscribe({
      next: (ops) => {
        this.operations = ops;
        this.currentPage = page;
        this.error = '';
      },
      error: () => {
        this.operations = [];
      }
    });
  }
  get pageNumbers(): number[] {
    return this.accountDetails ? Array(this.accountDetails.totalPages).fill(0).map((_, i) => i) : [];
  }
  handleAccountOperation() {
    let accountId :string = this.accountFormGroup.value.accountId;
    let operationType=this.operationFromGroup.value.operationType;
    let amount :number =this.operationFromGroup.value.amount;
    let description :string =this.operationFromGroup.value.description;
    let accountDestination :string =this.operationFromGroup.value.accountDestination;
    if(operationType=='DEBIT'){
      this.accountService.debit(accountId, amount,description).subscribe({
        next : (data)=>{
          alert("Success Credit");
          this.operationFromGroup.reset();
          this.search();
        },
        error : (err)=>{
          console.log(err);
        }
      });
    } else if(operationType=='CREDIT'){
      this.accountService.credit(accountId, amount,description).subscribe({
        next : (data)=>{
          alert("Success Debit");
          this.operationFromGroup.reset();
          this.search();
        },
        error : (err)=>{
          console.log(err);
        }
      });
    }
    else if(operationType=='TRANSFER'){
      this.accountService.transfer(accountId,accountDestination, amount,description).subscribe({
        next : (data)=>{
          alert("Success Transfer");
          this.operationFromGroup.reset();
          this.search();
        },
        error : (err)=>{
          console.log(err);
        }
      });

    }
  }

}
