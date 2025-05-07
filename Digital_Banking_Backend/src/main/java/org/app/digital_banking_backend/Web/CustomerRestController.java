package org.app.digital_banking_backend.Web;


import lombok.AllArgsConstructor;


import lombok.extern.slf4j.Slf4j;
import org.app.digital_banking_backend.DTOs.CustomerDTO;
import org.app.digital_banking_backend.Exceptions.CustomerNotFoundException;
import org.app.digital_banking_backend.Services.BankAccountService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@Slf4j


public class CustomerRestController {
    private BankAccountService bankAccountService;

    @GetMapping("/customers")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public List<CustomerDTO> customers(){
        return bankAccountService.listCostumers();
    }


    @GetMapping("/customers/search")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public List<CustomerDTO> searchCustomers(@RequestParam(name = "keyword",defaultValue = "") String keyword){
        return bankAccountService.searchCustomers("%"+keyword+"%");
    }
    @GetMapping("/customers/{id}")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public CustomerDTO getCustomer(@PathVariable(name = "id") Long customerId) throws CustomerNotFoundException {
        return bankAccountService.getCustomer(customerId);
    }
    @PostMapping("/customers")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public CustomerDTO saveCustomer(@RequestBody CustomerDTO customerDTO){
        return bankAccountService.saveCostumer(customerDTO);
    }

    @PutMapping("/customers/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public CustomerDTO updateCustomer(@PathVariable Long id, @RequestBody CustomerDTO customerDTO){
        customerDTO.setId(id);
        return bankAccountService.updateCostumer(customerDTO);
    }
    @DeleteMapping("/customers/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public void deleteCustomer(@PathVariable Long id){
        bankAccountService.deleteCustomer(id);
    }

}
