package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.dto.CompanyDto;

import java.util.List;

@Repository
public class AstronautRepository {
    
    private final JdbcTemplate jdbcTemplate;

    public AstronautRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<CompanyDto> getExperienceById(long id) {
        return null;
    }

    public void joinCompany(long companyId) {
    }
}
