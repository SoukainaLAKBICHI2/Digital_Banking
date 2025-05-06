package org.app.digital_banking_backend.Services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.app.digital_banking_backend.DTOs.*;
import org.app.digital_banking_backend.Entities.*;
import org.app.digital_banking_backend.Enums.OperationType;
import org.app.digital_banking_backend.Exceptions.BalanceNotSufficientException;
import org.app.digital_banking_backend.Exceptions.BankAccountNotFoundException;
import org.app.digital_banking_backend.Exceptions.CustomerNotFoundException;
import org.app.digital_banking_backend.Repositories.AccountOperationRepository;
import org.app.digital_banking_backend.Repositories.BankAccountRepository;
import org.app.digital_banking_backend.Repositories.CustomerRepository;
import org.app.digital_banking_backend.mappers.BankAccountMapperImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class BankAccountServiceImpl implements BankAccountService {
    private CustomerRepository customerRepository;
    private BankAccountRepository bankAccountRepository;
    private AccountOperationRepository operationRepository;
    private BankAccountMapperImpl dtoMapper;


    @Override
    public CustomerDTO saveCostumer(CustomerDTO customerDTO) {
        log.info("Saving new Customer");
        Customer customer = dtoMapper.fromCustomerDTO(customerDTO);
        Customer savedCustomer = customerRepository.save(customer);
        return dtoMapper.fromCustomer(savedCustomer);
    }


    @Override
    public CurrentAccountDTO saveCurrentBankAccount(double initialBalance, Long customerId, double overDraft) throws CustomerNotFoundException {
        Customer customer = customerRepository.findById(customerId).orElse(null);
        if(customer == null)
            throw  new CustomerNotFoundException("Customer not found");

        CurrentAccount currentAccount = new CurrentAccount();

        currentAccount.setId(UUID.randomUUID().toString());
        currentAccount.setCreatedAt(new Date());
        currentAccount.setBalance(initialBalance);
        currentAccount.setOverDraft(overDraft);
        currentAccount.setCustomer(customer);
        CurrentAccount savedBankAccount = bankAccountRepository.save(currentAccount);

        return dtoMapper.fromCurrentBankAccount(savedBankAccount);
    }

    @Override
    public SavingAccountDTO saveSavingsBankAccount(double initialBalance, Long customerId, double interestRate) throws CustomerNotFoundException {
        Customer customer = customerRepository.findById(customerId).orElse(null);
        if(customer == null)
            throw  new CustomerNotFoundException("Customer not found");

        SavingAccount savingsAccount = new SavingAccount();

        savingsAccount.setId(UUID.randomUUID().toString());
        savingsAccount.setCreatedAt(new Date());
        savingsAccount.setBalance(initialBalance);
        savingsAccount.setInterestRate(interestRate);
        savingsAccount.setCustomer(customer);
        SavingAccount savedBankAccount = bankAccountRepository.save(savingsAccount);
        return dtoMapper.fromSavingsBankAccount(savedBankAccount);
    }

    @Override
    public List<CustomerDTO> listCostumers() {
        List<Customer> customers = customerRepository.findAll();
        List<CustomerDTO> customerDTOS = customers.stream()
                .map(customer -> dtoMapper.fromCustomer(customer))
                .collect(Collectors.toList());
        return customerDTOS;
    }

    @Override
    public BankAccountDTO getBankAccount(String accountId) throws BankAccountNotFoundException {
        BankAccount bankAccount = bankAccountRepository.findById(accountId)
                .orElseThrow(() -> new BankAccountNotFoundException("Bank account not found"));
        if(bankAccount instanceof  SavingAccount){
            SavingAccount savingsAccount = (SavingAccount) bankAccount;
            return dtoMapper.fromSavingsBankAccount(savingsAccount);
        }else {
            CurrentAccount currentAccount = (CurrentAccount) bankAccount;
            return dtoMapper.fromCurrentBankAccount(currentAccount);
        }

    }

    @Override
    public void debit(String accountId, double amount, String description) throws BankAccountNotFoundException, BalanceNotSufficientException {
        BankAccount bankAccount = bankAccountRepository.findById(accountId)
                .orElseThrow(() -> new BankAccountNotFoundException("Bank account not found"));
        if(bankAccount.getBalance()<amount){
            throw new BalanceNotSufficientException("Balance Not Sufficient");
        }
        AccountOperation operation = new AccountOperation();
        operation.setBankAccount(bankAccount);
        operation.setAmount(amount);
        operation.setDate(new Date());
        operation.setType(OperationType.DEBIT);
        operation.setDescription(description);
        operationRepository.save(operation);
        bankAccount.setBalance(bankAccount.getBalance()-amount);
        bankAccountRepository.save(bankAccount);
    }

    @Override
    public void credit(String accountId, double amount, String description) throws BankAccountNotFoundException {
        BankAccount bankAccount = bankAccountRepository.findById(accountId)
                .orElseThrow(() -> new BankAccountNotFoundException("Bank account not found"));
        AccountOperation operation = new AccountOperation();
        operation.setBankAccount(bankAccount);
        operation.setAmount(amount);
        operation.setDate(new Date());
        operation.setType(OperationType.CREDIT);
        operation.setDescription(description);
        operationRepository.save(operation);
        bankAccount.setBalance(bankAccount.getBalance()+amount);
        bankAccountRepository.save(bankAccount);
    }

    @Override
    public void transfer(String accountIdSource, String accountIdDestination, double amount) throws BankAccountNotFoundException, BalanceNotSufficientException {
        debit(accountIdSource,amount,"Transfer to "+accountIdDestination);
        credit(accountIdDestination,amount,"Transfer from "+accountIdSource);

    }
    @Override
    public List<BankAccountDTO> bankAccountList(){
        List<BankAccount> bankAccounts = bankAccountRepository.findAll();
        List<BankAccountDTO> bankAccountDTOS = bankAccounts.stream().map(bankAccount -> {
            if (bankAccount instanceof SavingAccount) {
                SavingAccount savingsAccount = (SavingAccount) bankAccount;
                return dtoMapper.fromSavingsBankAccount(savingsAccount);
            } else {
                CurrentAccount currentAccount = (CurrentAccount) bankAccount;
                return dtoMapper.fromCurrentBankAccount(currentAccount);
            }
        }).collect(Collectors.toList());
        return bankAccountDTOS;
    }

    @Override
    public  CustomerDTO getCustomer(Long customerId) throws CustomerNotFoundException {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new CustomerNotFoundException("Customer Not Found"));
        CustomerDTO customerDTO = dtoMapper.fromCustomer(customer);
        return customerDTO;
    }

    @Override
    public CustomerDTO updateCostumer(CustomerDTO customerDTO) {
        log.info("Saving new Customer");
        Customer customer = dtoMapper.fromCustomerDTO(customerDTO);
        Customer savedCustomer = customerRepository.save(customer);
        return dtoMapper.fromCustomer(savedCustomer);
    }
    @Override
    public void deleteCustomer(Long customerId) {
        if (customerRepository.existsById(customerId)) {
            bankAccountRepository.deleteByCustomerId(customerId);

            customerRepository.deleteById(customerId);
        } else {
            System.out.println("Customer Not Found");
        }
    }

    @Override
    public List<AccountOperationDTO> accountHistory(String accountId){
        List<AccountOperation> accountOperations = operationRepository.findByBankAccountId(accountId);
        return accountOperations.stream().map(op->dtoMapper.fromAccountOperation(op)).collect(Collectors.toList());
    }

    @Override
    public AccountHistoryDTO getAccountHistory(String accountId, int page, int size) throws BankAccountNotFoundException {
        BankAccount bankAccount=bankAccountRepository.findById(accountId).orElse(null);
        if(bankAccount==null) throw new BankAccountNotFoundException("Account not Found");
        Page<AccountOperation> accountOperations = operationRepository.findByBankAccountIdOrderByDateDesc(accountId, PageRequest.of(page, size));
        AccountHistoryDTO accountHistoryDTO=new AccountHistoryDTO();
        List<AccountOperationDTO> accountOperationDTOS = accountOperations.getContent().stream().map(op -> dtoMapper.fromAccountOperation(op)).collect(Collectors.toList());
        accountHistoryDTO.setAccountOperationDTOS(accountOperationDTOS);
        accountHistoryDTO.setAccountId(bankAccount.getId());
        accountHistoryDTO.setBalance(bankAccount.getBalance());
        accountHistoryDTO.setCurrentPage(page);
        accountHistoryDTO.setPageSize(size);
        accountHistoryDTO.setTotalPages(accountOperations.getTotalPages());
        return accountHistoryDTO;
    }

    @Override
    public List<CustomerDTO> searchCustomers(String keyword) {
        List<Customer> customers=customerRepository.searchCustomer(keyword);
        List<CustomerDTO> customerDTOS = customers.stream().map(cust -> dtoMapper.fromCustomer(cust)).collect(Collectors.toList());
        return customerDTOS;
    }
}