package tr.edu.bilkent.spacemission.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    private int id;
    private int fromCompanyId;
    private int toCompanyId;
    private double transactionAmount;
}
