package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.entity.Agency;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Repository
public class AgencyRepository {
    private final JdbcTemplate jdbcTemplate;
    private final Connection connection;

    public AgencyRepository(JdbcTemplate jdbcTemplate, DataSource dataSource) throws SQLException {
        this.jdbcTemplate = jdbcTemplate;
        this.connection = dataSource.getConnection();
    }

    public Agency getAgencyProfile(long agencyId){
        String query = "SELECT * FROM agency WHERE agency_id = ?;";
        return jdbcTemplate.queryForObject(query, (rs, rowNum) -> {
            Agency agency = new Agency();
            agency.setId(rs.getLong("agency_id"));
            agency.setName(rs.getString("agency_name"));
            agency.setLogo(rs.getBytes("agency_logo"));
            agency.setApproved(rs.getBoolean("is_approved"));
            return agency;
        }, agencyId);
    }

    //attempts to approve a space mission, approval status is returned as a boolean return value
    //Returns false when given mission is already approved by the given agency
    public boolean approveMission(long agencyId, long missionId, boolean approvedStatus){
        boolean success = false;
        String query = "SELECT COUNT(*) FROM agency_approve_space_mission WHERE agency_id = ? AND " +
                "space_mission_id = ?;";
        //if the execution of the first query yields 0, then we can insert a new tuple
        Integer count = jdbcTemplate.queryForObject(query, Integer.class, agencyId, missionId);

        String approvalString;
        if(approvedStatus){
            approvalString = "approved";
        }
        else{
            approvalString = "not_approved";
        }
        int rowsAffected;
        if(count != null && count == 0){
            //insert a new tuple to the agency_approve_space_mission relation
            query = "INSERT INTO agency_approve_space_mission (space_mission_id, agency_id, approval_state) " +
                    "VALUES (?, ?, ?);";
            rowsAffected = this.jdbcTemplate.update(query, missionId, agencyId, approvalString);
        }
        else {
            query = "UPDATE agency_approve_space_mission SET approval_state = ? WHERE agency_id = ? AND space_mission_id = ?;";
            rowsAffected = this.jdbcTemplate.update(query, approvalString, agencyId, missionId);
        }
        success = rowsAffected > 0;
        return success;
    }
    /*
     * @param approvedStatus determines whether the agency has approved or not approved the astronaut after their evaluation.
     * If there is already an entry matching agencyId and astronautId, then just update it based on the given approvedStatus
     * @return true whether update or insertion is successful
    */
    public boolean evaluateAstronaut(long agencyId, long astronautId, boolean approvedStatus){
        boolean success = false; //query execution success
        String query = "SELECT COUNT(*) FROM agency_evaluate_astronaut WHERE astronaut_id = ? AND agency_id = ?;";
        Integer count = jdbcTemplate.queryForObject(query, Integer.class, astronautId, agencyId);

        String approvalString;
        if(approvedStatus){
            approvalString = "approved";
        }
        else{
            approvalString = "not_approved";
        }
        int rowsAffected;
        if(count != null && count == 0){
            //insert a new tuple for this astronaut's evaluationto this agency
            query = "INSERT INTO agency_evaluate_astronaut (astronaut_id, agency_id, approved_state) " +
                    "VALUES (?, ?, ?);";
            rowsAffected = this.jdbcTemplate.update(query, astronautId, agencyId, approvalString);
        }
        else{
            //update the existing tuple
            query = "UPDATE agency_evaluate_astronaut SET approved_state = ? WHERE astronaut_id = ? AND agency_id = ?;";
            rowsAffected = this.jdbcTemplate.update(query, approvalString, astronautId, agencyId);
        }
        return rowsAffected > 0;
    }
}
