package org.app.digital_banking_backend.mappers;

import org.app.digital_banking_backend.DTOs.AccountOperationDTO;
import org.app.digital_banking_backend.DTOs.CurrentAccountDTO;
import org.app.digital_banking_backend.DTOs.CustomerDTO;
import org.app.digital_banking_backend.DTOs.SavingAccountDTO;
import org.app.digital_banking_backend.Entities.AccountOperation;
import org.app.digital_banking_backend.Entities.CurrentAccount;
import org.app.digital_banking_backend.Entities.Customer;
import org.app.digital_banking_backend.Entities.SavingAccount;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class BankAccountMapperImpl {
    public CustomerDTO fromCustomer(Customer customer){
        CustomerDTO customerDTO = new CustomerDTO();
        BeanUtils.copyProperties(customer,customerDTO);
        return customerDTO;
    }

    public Customer fromCustomerDTO(CustomerDTO customerDTO){
        Customer customer = new Customer();
        BeanUtils.copyProperties(customerDTO, customer);
        return customer;

    }

    public SavingAccountDTO fromSavingsBankAccount(SavingAccount savingsAccount){
        SavingAccountDTO savingsBankAccountDTO = new SavingAccountDTO();
        BeanUtils.copyProperties(savingsAccount, savingsBankAccountDTO);
        savingsBankAccountDTO.setCustomerDTO(fromCustomer(savingsAccount.getCustomer()));
        savingsBankAccountDTO.setType(savingsAccount.getClass().getSimpleName());
        return savingsBankAccountDTO;
    }

    public SavingAccount fromSavingsBankAccountDTO(SavingAccountDTO savingsBankAccountDTO){
        SavingAccount savingsAccount = new SavingAccount();
        BeanUtils.copyProperties(savingsBankAccountDTO, savingsAccount);
        savingsAccount.setCustomer(fromCustomerDTO(savingsBankAccountDTO.getCustomerDTO()));
        return savingsAccount;
    }

    public CurrentAccountDTO fromCurrentBankAccount(CurrentAccount currentAccount){
        CurrentAccountDTO currentBankAccountDTO=new CurrentAccountDTO();
        BeanUtils.copyProperties(currentAccount,currentBankAccountDTO);
        currentBankAccountDTO.setCustomerDTO(fromCustomer(currentAccount.getCustomer()));
        currentBankAccountDTO.setType(currentAccount.getClass().getSimpleName());
        return currentBankAccountDTO;
    }
    public CurrentAccount fromCurrentBankAccountDTO(CurrentAccountDTO currentBankAccountDTO){
        CurrentAccount currentAccount=new CurrentAccount();
        BeanUtils.copyProperties(currentBankAccountDTO,currentAccount);
        currentAccount.setCustomer(fromCustomerDTO(currentBankAccountDTO.getCustomerDTO()));
        return currentAccount;
    }

    public AccountOperationDTO fromAccountOperation(AccountOperation accountOperation){
        AccountOperationDTO accountOperationDTO=new AccountOperationDTO();
        BeanUtils.copyProperties(accountOperation,accountOperationDTO);
        return accountOperationDTO;
    }



}
