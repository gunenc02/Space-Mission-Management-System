package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.entity.Transaction;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@Repository
public class TransactionRepository {
    private final JdbcTemplate jdbcTemplate;
    private final Connection connection;

    public TransactionRepository(JdbcTemplate jdbcTemplate, DataSource dataSource) throws SQLException {
        this.jdbcTemplate = jdbcTemplate;
        this.connection = dataSource.getConnection();
    }

    public List<Transaction> getTransactionsByCompany(long companyId) {
        String query = "SELECT * FROM transaction WHERE from_company_id = ? OR to_company_id = ?";
        return jdbcTemplate.query(query, (rs, rowNum) -> {
            Transaction transaction = new Transaction();
            transaction.setFromCompanyId((rs.getLong("from_company_id")));
            transaction.setToCompanyId((rs.getLong("to_company_id")));
            transaction.setTransactionAmount(rs.getDouble("transaction_amount"));
            transaction.setTransactionDate(rs.getDate("transaction_date"));
            return transaction;
        }, companyId, companyId);
    }
}
