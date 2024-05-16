package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class AdminRepository {
    private final JdbcTemplate jdbcTemplate;
    private final Connection connection;

    public AdminRepository(JdbcTemplate jdbcTemplate, DataSource dataSource) throws SQLException{
        this.jdbcTemplate = jdbcTemplate;
        this.connection = dataSource.getConnection();
    }

    public void confirmAgency(long id){
        //directly attempt to update the approve_status of the Agency with given id without checking if it exists
        String query = "UPDATE agency SET is_approved = 1 WHERE agency_id = ?";
        this.jdbcTemplate.update(query, id);
    }
}
