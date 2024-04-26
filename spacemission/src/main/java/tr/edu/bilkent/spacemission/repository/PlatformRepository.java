package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.entity.Platform;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class PlatformRepository {
    private final JdbcTemplate jdbcTemplate;
    private final Connection connection;

    public PlatformRepository (JdbcTemplate jdbcTemplate, DataSource dataSource) throws SQLException {
        this.jdbcTemplate = jdbcTemplate;
        this.connection = dataSource.getConnection();
    }

    /**
     * Get all platforms
     * @return List of platforms
     */
    public List<Platform> getPlatforms() {
        List<Platform> platforms = new ArrayList<Platform>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM platform");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Platform platform = new Platform();
                platform.setId(rs.getLong("platform_id"));
                platform.setPlatformName(rs.getString("platform_name"));
                platform.setProductionYear(rs.getInt("production_year"));
                platform.setImage(rs.getBytes("platform_image"));
                platform.setCostPerLaunch(rs.getDouble("cost_per_launch"));
                platforms.add(platform);
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return platforms;
    }

    /**
     * Get the platform with the given id
     * @param id Platform id
     * @return Platform
     */
    public Platform getPlatform(long id) {
        Platform platform = new Platform();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM platform WHERE platform_id = ?");
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                platform.setId(rs.getLong("platform_id"));
                platform.setPlatformName(rs.getString("platform_name"));
                platform.setProductionYear(rs.getInt("production_year"));
                platform.setImage(rs.getBytes("platform_image"));
                platform.setCostPerLaunch(rs.getDouble("cost_per_launch"));
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return platform;
    }


    /**
     * Create a new platform
     * @param platform Platform object
     */
    public void createPlatform(Platform platform) {
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO platform (platform_name, production_year, platform_image, cost_per_launch) VALUES (?, ?, ?, ?)");
            ps.setString(1, platform.getPlatformName());
            ps.setInt(2, platform.getProductionYear());
            ps.setBytes(3, platform.getImage());
            ps.setDouble(4, platform.getCostPerLaunch());
            ps.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * Update the platform with the given id
     * @param platform Platform object
     */
    public void updatePlatform(Platform platform) {
        try {
            PreparedStatement ps = connection.prepareStatement("UPDATE platform SET platform_name = ?, production_year = ?, platform_image = ?, cost_per_launch = ? WHERE platform_id = ?");
            ps.setString(1, platform.getPlatformName());
            ps.setInt(2, platform.getProductionYear());
            ps.setBytes(3, platform.getImage());
            ps.setDouble(4, platform.getCostPerLaunch());
            ps.setLong(5, platform.getId());
            ps.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * Delete the platform with the given id
     * @param id Platform id
     */
    public void deletePlatform(long id) {
        try {
            PreparedStatement ps = connection.prepareStatement("DELETE FROM platform WHERE platform_id = ?");
            ps.setLong(1, id);
            ps.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
