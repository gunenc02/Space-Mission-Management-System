package tr.edu.bilkent.spacemission.repository;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.dto.Login;
import tr.edu.bilkent.spacemission.model.CompanyModel;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

// THIS IS OUR REPOSITORY THIS IS WHERE OUR QUERIES TAKE PLACE
// THIS IS WRONG FOR NOW BUT AFTER THE CLARIFICATIONS I AM GOING TO FIX IT
// I DONT KNOW FOR NOW HOW TO IMPLEMENT THOSE QUERIES WITHOUT THE HELP OF EXTERNAL LIBRARIES (JPA,CRUD) FOR NOW
@Repository
public class CompanyRepository {

    private JdbcTemplate jdbcTemplate;

    public CompanyRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<CompanyDto> getAllCompaniesRepo() {
        String query = "SELECT * FROM company";
        return jdbcTemplate.query(query,
                (rs, rowNum) -> new CompanyDto(
                        rs.getLong("company_id"),
                        rs.getString("company_name"),
                        rs.getString("company_mail"),
                        rs.getString("company_country"),
                        rs.getLong("company_budget"),
                        rs.getString("company_type")
                ));
    }

    public CompanyDto getByLogInfo(Login logInfo) {
        String query = "SELECT * FROM company WHERE company_mail = ? AND company_password = ?";
        Object[] args = { logInfo.getUsername(), logInfo.getPassword() };

        try {
            return jdbcTemplate.queryForObject(query, args, new RowMapper<CompanyDto>() {
                @Override
                public CompanyDto mapRow(ResultSet rs, int rowNum) throws SQLException {
                    return new CompanyDto(
                            rs.getInt("id"),
                            rs.getString("company_name"),
                            rs.getString("company_mail"),
                            rs.getString("company_country"),
                            rs.getInt("company_budget"),
                            rs.getString("company_type")
                    );
                }
            });
        } catch (EmptyResultDataAccessException e) {
            // Handle the case where no company matches the login info
            // This could mean returning null or throwing a custom exception
            return null; // or throw new CustomNotFoundException("Company not found.");
        }
    }
}
