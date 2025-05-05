package org.app.digital_banking_backend.Repositories;

import org.app.digital_banking_backend.Entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BankAccountRepository extends JpaRepository<BankAccount, String> {
}
