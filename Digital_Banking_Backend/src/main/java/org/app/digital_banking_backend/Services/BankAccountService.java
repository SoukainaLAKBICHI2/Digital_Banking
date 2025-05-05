package org.app.digital_banking_backend.Services;
import org.app.digital_banking_backend.DTOs.*;
import org.app.digital_banking_backend.Exceptions.BalanceNotSufficientException;
import org.app.digital_banking_backend.Exceptions.BankAccountNotFoundException;
import org.app.digital_banking_backend.Exceptions.CustomerNotFoundException;

import java.util.List;





public interface BankAccountService {


    CustomerDTO saveCostumer(CustomerDTO customerDTO);

    CurrentAccountDTO saveCurrentBankAccount(double initialBalance, Long customerId, double overDraft) throws CustomerNotFoundException;
    SavingAccountDTO saveSavingsBankAccount(double initialBalance, Long customerId, double interestRate) throws CustomerNotFoundException;

    List<CustomerDTO> listCostumers();
    BankAccountDTO getBankAccount(String accountId) throws BankAccountNotFoundException;
    void debit(String accountId, double amount, String description) throws BankAccountNotFoundException, BalanceNotSufficientException;
    void credit(String accountId, double amount, String description) throws BankAccountNotFoundException;
    void transfer(String accountIdSource, String accountIdDestination, double amount) throws BankAccountNotFoundException, BalanceNotSufficientException;


    List<BankAccountDTO> bankAccountList();

    CustomerDTO getCustomer(Long customerId) throws CustomerNotFoundException;

    CustomerDTO updateCostumer(CustomerDTO customerDTO);

    void deleteCustomer(Long customerId);

    public List<AccountOperationDTO> accountHistory(String accountId);

    AccountHistoryDTO getAccountHistory(String accountId, int page, int size) throws BankAccountNotFoundException;

    List<CustomerDTO> searchCustomers(String keyword);
}
