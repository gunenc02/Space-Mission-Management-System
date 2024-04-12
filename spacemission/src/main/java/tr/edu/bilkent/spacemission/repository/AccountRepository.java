package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.dto.AgencyRegisterDto;
import tr.edu.bilkent.spacemission.dto.AstronautRegisterDto;
import tr.edu.bilkent.spacemission.dto.CompanyRegisterDto;

@Repository
public class AccountRepository {

    private JdbcTemplate jdbcTemplate;

    public AccountRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveAgency(AgencyRegisterDto ardto){

    }

    public void saveAstronaut(AstronautRegisterDto ardto) {
    }

    public void saveCompany(CompanyRegisterDto crdto) {
    }

    public void approveAgency(long agencyId) {
    }

    public void approveAstronaut(long astronautId) {
    }
    public void approveCompany(long companyId) {
    }


    public void alterAccount(String mail, String password) {
    }
}
