package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.dto.Login;

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
            )
        );
    }

    public CompanyDto getByLogInfo(Login logInfo) {
        String query = "SELECT * FROM company WHERE company_mail = ? AND company_password = ?";
        return jdbcTemplate.queryForObject(query,
             (rs, rowNum) -> new CompanyDto(
                  rs.getInt("id"),
                  rs.getString("company_name"),
                  rs.getString("company_mail"),
                  rs.getString("company_country"),
                  rs.getInt("company_budget"),
                  rs.getString("company_type")
             ), logInfo.getUsername(), logInfo.getPassword()
        );
    }

    public void offerJob(long astronautId) {
    }
    /*
     *@param missionId id of the space mission to be performed
     * returns whether the mission has been marked as performed in the database
     */
    public boolean markSpaceMissionAsPerformed(long missionId){
        //execute such a query that if a space mission with given attributes exists try and mark it as performed
        //first check if there exists an entry in space mission performings with specified mission id and not yet performed
        final String notPerformedStatus = "???Determine this";
        final String performedStatus = "???AlsoDetermine";
        String query = "SELECT * FROM space_mission_performings " +
                "WHERE space_mission_id = :missionId AND perform_status = :notPerformedStatus;";
        //execute the first query and if retrieval yields something then update that entry
        query = "UPDATE space_mission_performings SET perform_status = :performedStatus " +
                "WHERE space_mission_id = :missionId;";
        return false;
    }
}
