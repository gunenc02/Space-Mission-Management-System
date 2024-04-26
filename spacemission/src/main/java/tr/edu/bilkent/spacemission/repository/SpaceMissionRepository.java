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
            return spaceMission;
        });
    }

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
            return spaceMission;
        });
    }

    public void createSpaceMission(SpaceMission spaceMission) {
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO space_mission (mission_name, mission_image, objective, budget, create_date, perform_date, platform_id, creator_id, performer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
            ps.setString(1, spaceMission.getMissionName());
            ps.setBytes(2, spaceMission.getImage());
            ps.setString(3, spaceMission.getObjective());
            ps.setDouble(4, spaceMission.getBudget());
            ps.setDate(5, spaceMission.getCreateDate());
            ps.setDate(6, spaceMission.getPerformDate());
            ps.setInt(7, spaceMission.getPlatformId());
            ps.setInt(8, spaceMission.getCreatorId());
            ps.setInt(9, spaceMission.getPerformerId());
            ps.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void updateSpaceMission(SpaceMission spaceMission) {
        try {
            PreparedStatement ps = connection.prepareStatement("UPDATE space_mission SET mission_name = ?, mission_image = ?, objective = ?, budget = ?, create_date = ?, perform_date = ?, platform_id = ?, creator_id = ?, performer_id = ? WHERE mission_id = ?;");
            ps.setString(1, spaceMission.getMissionName());
            ps.setBytes(2, spaceMission.getImage());
            ps.setString(3, spaceMission.getObjective());
            ps.setDouble(4, spaceMission.getBudget());
            ps.setDate(5, spaceMission.getCreateDate());
            ps.setDate(6, spaceMission.getPerformDate());
            ps.setInt(7, spaceMission.getPlatformId());
            ps.setInt(8, spaceMission.getCreatorId());
            ps.setInt(9, spaceMission.getPerformerId());
            ps.setLong(10, spaceMission.getId());
            ps.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }

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
