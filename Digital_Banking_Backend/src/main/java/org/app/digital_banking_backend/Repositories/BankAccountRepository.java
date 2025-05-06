package org.app.digital_banking_backend.Repositories;

import org.app.digital_banking_backend.Entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface BankAccountRepository extends JpaRepository<BankAccount, String> {
    @Modifying
    @Query("DELETE FROM BankAccount b WHERE b.customer.id = :customerId")
    void deleteByCustomerId(@Param("customerId") Long customerId);
}
