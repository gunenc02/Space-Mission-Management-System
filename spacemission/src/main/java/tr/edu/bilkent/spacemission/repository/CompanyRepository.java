package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.dto.Login;
import tr.edu.bilkent.spacemission.entity.Company;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

// THIS IS OUR REPOSITORY THIS IS WHERE OUR QUERIES TAKE PLACE
// THIS IS WRONG FOR NOW BUT AFTER THE CLARIFICATIONS I AM GOING TO FIX IT
// I DONT KNOW FOR NOW HOW TO IMPLEMENT THOSE QUERIES WITHOUT THE HELP OF EXTERNAL LIBRARIES (JPA,CRUD) FOR NOW
@Repository
public class CompanyRepository {

    private final JdbcTemplate jdbcTemplate;
    private final Connection connection;

    public CompanyRepository(JdbcTemplate jdbcTemplate, DataSource dataSource) throws SQLException {
        this.jdbcTemplate = jdbcTemplate;
        this.connection = dataSource.getConnection();
    }

    public List<CompanyDto> getAllCompanies() {
        ArrayList<CompanyDto> list = new ArrayList<>();
        try{
            PreparedStatement ps = connection.prepareStatement("SELECT c.*, u.* FROM company c JOIN " +
                    " user u ON c.company_id = u.user_id;");
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                CompanyDto dto = new CompanyDto();
                dto.setUserId(rs.getLong("company_id"));
                dto.setName(rs.getString("company_name"));
                dto.setCountry(rs.getString("country"));
                dto.setUserMail(rs.getString("user_mail"));
                dto.setUserRole(rs.getString("user_role"));
                dto.setLogo(rs.getBytes("company_logo"));
                dto.setMoney(rs.getDouble("money"));
                list.add(dto);
            }
        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
        }
        return list;
    }

    /**
     * This method returns the profile of the company with the given id
     * @param id Id of the company
     * @return Company object
     */
    public Company getCompanyProfile(long id) {
        Company company = null;
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT c.*, u.* FROM company c JOIN " +
                                                                    " user u ON c.company_id = u.user_id WHERE company_id = ?");
            ps.setLong(1, id);

            ResultSet rs = ps.executeQuery();
            company = new Company();
            if (rs.next()) {
                company.setId(rs.getLong("company_id"));
                company.setMail(rs.getString("u.user_mail"));
                company.setName(rs.getString("company_name"));
                company.setLogo(rs.getBytes("company_logo"));
                company.setCountry(rs.getString("country"));
                company.setWorkerCount(rs.getInt("worker_count"));
                company.setBudget(rs.getLong("money"));
            }

        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return company;
    }

    public CompanyDto getByLogInfo(Login logInfo) {
        String query = "SELECT * FROM company WHERE company_mail = ? AND company_password = ?";
        return jdbcTemplate.queryForObject(query,
             (rs, rowNum) -> new CompanyDto(
                     rs.getLong("company_id"),
                     rs.getString("company_name"),
                     rs.getString("country"),
                     rs.getBytes("company_logo"),
                     rs.getDouble("money")
             ), logInfo.getUsername(), logInfo.getPassword()
        );
    }

    public void offerJob(long astronautId) {
    }
    /**
     *@param missionId id of the space mission to be performed
     * returns whether the mission has been marked as performed in the database
     * After successful update of perform_status to "performed", a SQL trigger will be executed to release
     * currently deployed astronauts automatically
     */
    public boolean markSpaceMissionAsPerformed(long missionId){
        boolean result = false;
        //execute such a query that if a space mission with given attributes exists try and mark it as performed
        //first check if there exists an entry in space mission performings with specified mission id and not yet performed
        final String notPerformedStatus = "pending";
        final String performedStatus = "performed";
        String query = "SELECT COUNT(*) FROM space_mission_performings " +
                "WHERE space_mission_id = ? AND perform_status = ?;";
        //execute the first query and if retrieval yields something then update that entry
        Integer count = jdbcTemplate.queryForObject(query, Integer.class, missionId, notPerformedStatus);
        if(count != null && count > 0) {
            //such a row exists, now we should modify the perform onDuty of that row
            query = "UPDATE space_mission_performings SET perform_status = ? " +
                    "WHERE space_mission_id = ?;";
            int affectedRows = jdbcTemplate.update(query, performedStatus, missionId);
            result = affectedRows > 0; //we expect affectedRows to be exactly 1 however
        }
        return result;
    }
}
