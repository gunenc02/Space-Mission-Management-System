package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.dto.CompanyDto;

import java.util.List;

@Repository
public class AstronautRepository {
    String query;
    private final JdbcTemplate jdbcTemplate;

    public AstronautRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
// This method lists the background of the specific astronaut
    public List<CompanyDto> getExperienceById(long id) {
        return null;
    }
//This method joins the astronaut into company
    public void joinCompany(long companyId, long userId) {
        query = "UPDATE astronaut SET astronaut_company_id = ? WHERE astronaut_id = ?";
        jdbcTemplate.update(query, companyId, userId);
    }
}
