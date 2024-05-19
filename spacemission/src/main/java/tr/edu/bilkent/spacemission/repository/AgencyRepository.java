package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.dto.AgencyDto;
import tr.edu.bilkent.spacemission.entity.Agency;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AgencyRepository {
    private final JdbcTemplate jdbcTemplate;
    private final Connection connection;

    public AgencyRepository(JdbcTemplate jdbcTemplate, DataSource dataSource) throws SQLException {
        this.jdbcTemplate = jdbcTemplate;
        this.connection = dataSource.getConnection();
    }

    /**
     * This method returns the profile of the agency with the given id
     *
     * @param agencyId Id of the agency
     * @return Agency object
     */
    public Agency getAgencyProfile(long agencyId) {
        Agency agency = null;
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT a.*, u.user_mail FROM agency a JOIN " +
                    "user u ON a.agency_id = u.user_id WHERE a.agency_id = ?");
            ps.setLong(1, agencyId);

            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                agency = new Agency();
                agency.setId(rs.getLong("agency_id"));
                agency.setMail(rs.getString("user_mail")); // Correct column alias usage
                agency.setName(rs.getString("agency_name"));
                agency.setLogo(rs.getBytes("agency_logo"));
                agency.setApproved(rs.getBoolean("is_approved"));
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return agency;
    }

    /**
     * This method returns all agencies in the database
     * @return List of agencies
     */
    public List<Agency> getAgencies() {
        ArrayList<Agency> agencies = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM agency;");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Agency agency = new Agency();
                agency.setId(rs.getLong("agency_id"));
                agency.setName(rs.getString("agency_name"));
                agency.setLogo(rs.getBytes("agency_logo"));
                agency.setApproved(rs.getBoolean("is_approved"));
                agencies.add(agency);
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return agencies;
    }

    //attempts to approve a space mission, approval status is returned as a boolean return value
    //Returns false when given mission is already approved by the given agency
    public void approveMission(long agencyId, long missionId) {
        /*boolean success = false;
        String query = "SELECT COUNT(*) FROM agency_approve_space_mission WHERE agency_id = ? AND " +
                "space_mission_id = ?;";
        //if the execution of the first query yields 0, then we can insert a new tuple
        Integer count = jdbcTemplate.queryForObject(query, Integer.class, agencyId, missionId);


        int rowsAffected;
        if (count != null && count == 0) {
            //insert a new tuple to the agency_approve_space_mission relation
            query = "INSERT INTO agency_approve_space_mission (space_mission_id, agency_id) " +
                    "VALUES (?, ?);";
            rowsAffected = this.jdbcTemplate.update(query, missionId, agencyId);
        } else {
            //mission is already approved by the agency
            rowsAffected = 0;
        }
        success = rowsAffected > 0;
        return success;*/
        try{
            String query = "INSERT INTO agency_approve_space_mission (space_mission_id, agency_id) " +
                    "VALUES (?, ?);";
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setLong(1, missionId);
            ps.setLong(2, agencyId);
            ps.executeUpdate();
        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
        }
    }

    /*
     * @param approvedStatus determines whether the agency has approved or not approved the astronaut after their evaluation.
     * If there is already an entry matching agencyId and astronautId, then just update it based on the given approvedStatus
     * @return true whether update or insertion is successful
     */
    public void approveAstronaut(long agencyId, long astronautId) {
        /*boolean success = false; //query execution success
        String query = "SELECT COUNT(*) FROM agency_approve_astronaut WHERE astronaut_id = ? AND agency_id = ?;";
        Integer count = jdbcTemplate.queryForObject(query, Integer.class, astronautId, agencyId);

        int rowsAffected;
        if (count != null && count == 0) {
            //insert a new tuple for this astronaut's evaluationto this agency
            query = "INSERT INTO agency_approve_astronaut (astronaut_id, agency_id) " +
                    "VALUES (?, ?);";
            rowsAffected = this.jdbcTemplate.update(query, astronautId, agencyId);
        } else {
            // astronaut is already evaluated by the agency
            rowsAffected = 0;
        }
        return rowsAffected > 0;*/
        try {
            String query = "INSERT INTO agency_approve_astronaut (astronaut_id, agency_id) " +
                    "VALUES (?, ?);";
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setLong(1, astronautId);
            ps.setLong(2, agencyId);
            ps.executeUpdate();
        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
        }
    }


    public List<AgencyDto> filterAgencies(Boolean isApproved) {
        String query = "SELECT * FROM agency WHERE 1=1";

        List<Object> params = new ArrayList<>();
        if (isApproved != null) {
            query += " AND is_approved = ?";
            params.add(isApproved);
        }

        return jdbcTemplate.query(query, params.toArray(), (rs, rowNum) -> {
            AgencyDto agency = new AgencyDto();
            agency.setAgencyId(rs.getInt("agency_id"));
            agency.setName(rs.getString("agency_name"));
            agency.setApproved(rs.getBoolean("is_approved"));
            agency.setLogo(rs.getBytes("agency_logo"));
            return agency;
        });
    }
}
