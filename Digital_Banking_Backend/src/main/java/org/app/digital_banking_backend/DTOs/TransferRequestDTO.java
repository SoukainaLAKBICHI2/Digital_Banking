package org.app.digital_banking_backend.DTOs;

import lombok.Data;
@Data
public class TransferRequestDTO {
    private String accountSource;
    private String accountDestination;
    private double amount;
    private String description;
}