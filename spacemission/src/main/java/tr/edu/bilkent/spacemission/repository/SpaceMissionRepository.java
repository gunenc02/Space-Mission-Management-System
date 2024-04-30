package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.entity.SpaceMission;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

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
    public List<SpaceMission> getSpaceMissions() {
        String query = "SELECT * FROM space_mission;";
        return jdbcTemplate.query(query, (rs, rowNum) -> {
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
        });
    }

    /**
     * This method returns the space mission with the given id
     * @param id Id of the space mission
     * @return SpaceMission object
     */
    public SpaceMission getSpaceMission(long id) {
        String query = "SELECT * FROM space_mission WHERE mission_id = ?;";
        return jdbcTemplate.queryForObject(query, new Object[]{id}, (rs, rowNum) -> {
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
        });
    }

    /**
     * This method creates a new space mission
     * @param spaceMission SpaceMission object
     */
    public void createSpaceMission(SpaceMission spaceMission) {
        try {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO space_mission (mission_name, mission_image, objective, budget, create_date, perform_date, platform_id, creator_id, performer_id, perform_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");
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
}
