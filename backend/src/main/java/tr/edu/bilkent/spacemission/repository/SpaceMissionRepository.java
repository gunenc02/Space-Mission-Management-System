package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.dto.AgencyDto;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.dto.SpaceMissionDto;
import tr.edu.bilkent.spacemission.dto.SpaceMissionsInPortfolioDto;
import tr.edu.bilkent.spacemission.entity.Agency;
import tr.edu.bilkent.spacemission.entity.SpaceMission;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.sql.Date;


@Repository
public class SpaceMissionRepository {
    private final JdbcTemplate jdbcTemplate;
    private final Connection connection;

    public SpaceMissionRepository(JdbcTemplate jdbcTemplate, DataSource dataSource) throws SQLException {
        this.jdbcTemplate = jdbcTemplate;
        this.connection = dataSource.getConnection();
    }

    /**
     * This method returns the list of all space missions
     * @return List of space missions
     */
    public List<SpaceMissionDto> getSpaceMissions() {
        String query = "SELECT * FROM space_mission;";
        ArrayList<SpaceMissionDto> list = new ArrayList<>();

        try{
            PreparedStatement ps = connection.prepareStatement(query);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                SpaceMissionDto dto = new SpaceMissionDto();

                dto.setBudget(rs.getDouble("budget"));
                dto.setMissionName(rs.getString("mission_name"));
                dto.setId(rs.getLong("mission_id"));
                dto.setImage(rs.getBytes("mission_image"));
                dto.setObjective(rs.getString("objective"));
                dto.setCreateDate(rs.getDate("create_date"));
                dto.setPerformDate(rs.getDate("perform_date"));
                dto.setCreatorId(rs.getInt("creator_id"));
                dto.setPerformerId(rs.getInt("performer_id"));
                dto.setPlatformId(rs.getInt("platform_id"));
                dto.setPerformStatus(rs.getString("perform_status"));
                list.add(dto);
            }
        }
        catch(Exception e){
            System.out.println(e.getMessage());
        }
        return list;
    }

    /**
     * This method returns the space mission with the given id
     * @param id Id of the space mission
     * @return SpaceMission object
     */
    public SpaceMissionDto getSpaceMission(long id) {
        String query = "SELECT * FROM space_mission WHERE mission_id = ?;";
        SpaceMissionDto spaceMission = null;

        /*return jdbcTemplate.queryForObject(query, new Object[]{id}, (rs, rowNum) -> {
            SpaceMission spaceMission = new SpaceMission();
            spaceMission.setId(rs.getLong("mission_id"));
            spaceMission.setMissionName(rs.getString("mission_name"));
            spaceMission.setImage(rs.getBytes("mission_image"));
            spaceMission.setObjective(rs.getString("objective"));
            spaceMission.setBudget(rs.getDouble("budget"));
            spaceMission.setCreateDate(rs.getDate("create_date"));
            spaceMission.setPerformDate(rs.getDate("perform_date"));
            spaceMission.setPlatformId(rs.getInt("platform_id"));
            spaceMission.setCreatorId(rs.getInt("creator_id"));
            spaceMission.setPerformerId(rs.getInt("performer_id"));
            spaceMission.setPerformStatus(rs.getString("perform_status"));
            return spaceMission;
        });*/
        try{
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setString(1, String.valueOf(id));
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                spaceMission = new SpaceMissionDto();

                spaceMission.setId(rs.getLong("mission_id"));
                spaceMission.setMissionName(rs.getString("mission_name"));
                spaceMission.setImage(rs.getBytes("mission_image"));
                spaceMission.setObjective(rs.getString("objective"));
                spaceMission.setBudget(rs.getDouble("budget"));
                spaceMission.setCreateDate(rs.getDate("create_date"));
                spaceMission.setPerformDate(rs.getDate("perform_date"));
                spaceMission.setPlatformId(rs.getInt("platform_id"));
                spaceMission.setCreatorId(rs.getInt("creator_id"));
                spaceMission.setPerformerId(rs.getInt("performer_id"));
                spaceMission.setPerformStatus(rs.getString("perform_status"));
            }
        }
        catch(Exception e){
            System.out.println(e.getMessage());
        }
        return spaceMission;
    }

    public List<SpaceMissionsInPortfolioDto> getPortfolio(long companyId){
        ArrayList<SpaceMissionsInPortfolioDto> missions = new ArrayList<>();
        try {
            PreparedStatement ps2 = connection.prepareStatement("SELECT sm.* FROM space_mission sm, company c WHERE (c.company_id = sm.creator_id OR c.company_id = sm.performer_id) AND c.company_id = ?");
            ps2.setLong(1, companyId);
            ResultSet rs2 = ps2.executeQuery();
            while(rs2.next()){
                SpaceMissionsInPortfolioDto mission = new SpaceMissionsInPortfolioDto();
                mission.setId(rs2.getLong("mission_id"));
                mission.setMissionName(rs2.getString("mission_name"));
                mission.setImage(rs2.getBytes("mission_image"));
                mission.setStatus(rs2.getString("perform_status"));
                mission.setStartDate(rs2.getDate("create_date"));
                mission.setEndDate(rs2.getDate("perform_date"));
                missions.add(mission);
            }
        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
        }

        return missions;
    }

    /**
     * This method returns the list of space missions that
     * are approved by the agency
     * @param agencyId ID of the agency
     */

    public List<SpaceMissionsInPortfolioDto> getApprovedMissions(long agencyId) {
        ArrayList<SpaceMissionsInPortfolioDto> missions = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement(
                    "SELECT sm.*, a.agency_name, c.company_name " +
                            "FROM space_mission sm " +
                            "JOIN agency_approve_space_mission aasm ON sm.mission_id = aasm.space_mission_id " +
                            "JOIN agency a ON aasm.agency_id = a.agency_id " +
                            "JOIN company c ON sm.creator_id = c.company_id " +
                            "WHERE a.agency_id = ?"
            );

            ps.setLong(1, agencyId);
            ResultSet rs = ps.executeQuery();

            while(rs.next()) {
                SpaceMissionsInPortfolioDto mission = new SpaceMissionsInPortfolioDto();
                mission.setId(rs.getLong("mission_id"));
                mission.setMissionName(rs.getString("mission_name"));
                mission.setImage(rs.getBytes("mission_image"));
                mission.setStatus(rs.getString("perform_status"));
                mission.setStartDate(rs.getDate("create_date"));
                mission.setEndDate(rs.getDate("perform_date"));
                mission.setCompanyName(rs.getString("company_name")); // Assuming you have this setter
                missions.add(mission);
            }
        }
        catch (Exception ex) {
            System.out.println(ex.getMessage());
        }

        return missions;
    }

    /**
     * This method creates a new space mission
     * @param spaceMission SpaceMission object
     */
    public void createSpaceMission(SpaceMission spaceMission) {
        try {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO space_mission (mission_name, mission_image, objective, budget, create_date, perform_date, creator_id, performer_id, perform_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
            ps.setString(1, spaceMission.getMissionName());
            ps.setBytes(2, spaceMission.getImage());
            ps.setString(3, spaceMission.getObjective());
            ps.setDouble(4, spaceMission.getBudget());
            ps.setDate(5, spaceMission.getCreateDate());
            ps.setDate(6, spaceMission.getPerformDate());
            ps.setInt(7, spaceMission.getCreatorId());
            ps.setNull(8, java.sql.Types.INTEGER);
            ps.setString(9, spaceMission.getPerformStatus());
            ps.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * This method updates the space mission with the given id
     * @param spaceMission SpaceMission object
     */
    public void updateSpaceMission(SpaceMission spaceMission) {
        try {
            PreparedStatement ps = connection.prepareStatement("UPDATE space_mission SET mission_name = ?, mission_image = ?, objective = ?, budget = ?, create_date = ?, perform_date = ?, platform_id = ?, creator_id = ?, performer_id = ?, perform_status = ?, WHERE mission_id = ?;");
            ps.setString(1, spaceMission.getMissionName());
            ps.setBytes(2, spaceMission.getImage());
            ps.setString(3, spaceMission.getObjective());
            ps.setDouble(4, spaceMission.getBudget());
            ps.setDate(5, spaceMission.getCreateDate());
            ps.setDate(6, spaceMission.getPerformDate());
            ps.setInt(7, spaceMission.getPlatformId());
            ps.setInt(8, spaceMission.getCreatorId());
            ps.setInt(9, spaceMission.getPerformerId());
            ps.setString(10, spaceMission.getPerformStatus());
            ps.setLong(11, spaceMission.getId());
            ps.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * This method deletes the space mission with the given id
     * @param id Id of the space mission
     */
    public void deleteSpaceMission (long id) {
        try {
            PreparedStatement ps = connection.prepareStatement("DELETE FROM space_mission WHERE mission_id = ?;");
            ps.setLong(1, id);
            ps.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<SpaceMissionsInPortfolioDto> getMissionByAstronautId(long astronautId) {
        ArrayList<SpaceMissionsInPortfolioDto> list = new ArrayList<>();
        try{
            PreparedStatement ps = connection.prepareStatement(
                    "SELECT space_mission.*," +
                            "(SELECT company_name FROM  company WHERE company_id = space_mission.creator_id) AS creator_name " +
                            "FROM space_mission WHERE mission_id IN (" +
                            "SELECT mission_id FROM mission_astronaut_recordings WHERE astronaut_id = ?)"
            );
            ps.setLong(1,astronautId);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                SpaceMissionsInPortfolioDto mission = new SpaceMissionsInPortfolioDto();
                mission.setId(rs.getLong("mission_id"));
                mission.setMissionName(rs.getString("mission_name"));
                mission.setImage(rs.getBytes("mission_image"));
                mission.setCompanyName(rs.getString("creator_name"));
                mission.setStatus(rs.getString("perform_status"));
                mission.setStartDate(rs.getDate("create_date"));
                mission.setEndDate(rs.getDate("perform_date"));
                list.add(mission);
            }

        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
        }
        return list;
    }


    public List<SpaceMissionDto> filterSpaceMissions(Double minBudget, Double maxBudget, String minCreateDate, String maxCreateDate, String minPerformDate, String maxPerformDate) {
        String query = "SELECT * FROM space_mission WHERE 1=1";

        List<Object> params = new ArrayList<>();
        if (minBudget != null) {
            query += " AND budget >= ?";
            params.add(minBudget);
        }
        if (maxBudget != null) {
            query += " AND budget <= ?";
            params.add(maxBudget);
        }
        if (minCreateDate != null) {
            query += " AND create_date >= ?";
            params.add(Date.valueOf(minCreateDate));
        }
        if (maxCreateDate != null) {
            query += " AND create_date <= ?";
            params.add(Date.valueOf(maxCreateDate));
        }
        if (minPerformDate != null) {
            query += " AND perform_date >= ?";
            params.add(Date.valueOf(minPerformDate));
        }
        if (maxPerformDate != null) {
            query += " AND perform_date <= ?";
            params.add(Date.valueOf(maxPerformDate));
        }

        return jdbcTemplate.query(query, params.toArray(), (rs, rowNum) -> {
            SpaceMissionDto spaceMission = new SpaceMissionDto();
            spaceMission.setId(rs.getInt("mission_id"));
            spaceMission.setMissionName(rs.getString("mission_name"));
            spaceMission.setObjective(rs.getString("objective"));
            spaceMission.setBudget(rs.getDouble("budget"));
            spaceMission.setCreateDate(rs.getDate("create_date"));
            spaceMission.setPerformDate(rs.getDate("perform_date"));
            spaceMission.setImage(rs.getBytes("mission_image"));
            spaceMission.setPerformStatus(rs.getString("perform_status"));
            return spaceMission;
        });
    }

    public List<Agency> getApprovingAgencies(long id) {
        ArrayList<Agency> list = new ArrayList<>();
        try{
            String query = "SELECT * FROM agency WHERE " +
                            "agency_id IN (SELECT DISTINCT agency_id FROM agency_approve_space_mission WHERE mission_id = ?);";
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Agency agency = new Agency();
                agency.setId(rs.getLong("agency_id"));
                agency.setName(rs.getString("agency_name"));
                agency.setLogo(rs.getBytes("agency_logo"));
                agency.setApproved(rs.getBoolean("is_approved"));
                list.add(agency);
            }
        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
        }
        return list;
    }
}
