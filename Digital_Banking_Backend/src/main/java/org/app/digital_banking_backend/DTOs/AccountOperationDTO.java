package org.app.digital_banking_backend.DTOs;

import lombok.Data;
import org.app.digital_banking_backend.Enums.OperationType;
import java.util.Date;

@Data
public class AccountOperationDTO {
    private Long id;
    private Date operationDate;
    private double amount;
    private OperationType type;
    private String description;
}
