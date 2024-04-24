package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
    //attempts to approve a space mission, approval status is returned as a boolean return value
    //Returns false when given mission is already approved by the given agency
    public boolean approveMission(long agencyId, long missionId){
        boolean success = false;
        String query = "SELECT COUNT(*) FROM agency_approve_space_mission WHERE agency_id = ? AND " +
                "space_mission_id = ?;";
        //if the execution of the first query yields 0, then we can insert a new tuple
        Integer count = jdbcTemplate.queryForObject(query, Integer.class, agencyId, missionId);
        if(count != null && count == 0){
            //insert a new tuple to the agency_approve_space_mission relation
            query = "INSERT INTO agency_approve_space_mission (space_mission_id, agency_id) " +
                    "VALUES (?, ?);";
            int rowsAffected = this.jdbcTemplate.update(query, missionId, agencyId);
            success = rowsAffected > 0;
        }
        return success;
    }
    public boolean evaluateAstronaut(){
        //ToDo
        return false;
    }
}
