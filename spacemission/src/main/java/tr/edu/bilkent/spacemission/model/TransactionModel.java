package tr.edu.bilkent.spacemission.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "transaction")
public class TransactionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    long transactionId;

    @Column(name = "transaction_amount", precision = 19, scale = 2)
    BigDecimal transactionAmount;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_company_id", nullable = false)
    CompanyModel fromCompany;
}
