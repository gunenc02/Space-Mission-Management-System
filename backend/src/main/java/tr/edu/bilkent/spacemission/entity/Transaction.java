package tr.edu.bilkent.spacemission.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    private long id;
    private long fromCompanyId;
    private long toCompanyId;
    private double transactionAmount;
    private Date transactionDate;
}
