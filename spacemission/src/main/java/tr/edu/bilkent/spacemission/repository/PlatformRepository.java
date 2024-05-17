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
import java.util.Objects;

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

    /**
     * Filter platforms dynamically based on optional production year and cost per launch
     * @param minYear Minimum production year (inclusive)
     * @param maxYear Maximum production year (inclusive)
     * @param minCost Minimum cost per launch (inclusive)
     * @param maxCost Maximum cost per launch (inclusive)
     * @return List of filtered platforms
     */
    public List<Platform> filterPlatforms(Integer minYear, Integer maxYear, Double minCost, Double maxCost) {

        validateParameters(minYear, maxYear, minCost, maxCost);

        List<Platform> platforms = new ArrayList<>();
        List<Object> parameters = new ArrayList<>();

        StringBuilder queryBuilder = new StringBuilder("SELECT * FROM platform WHERE 1=1 ");

        // Append conditions to the query dynamically
        if (minYear != null) {
            queryBuilder.append(" AND production_year >= ?");
            parameters.add(minYear);
        }
        if (maxYear != null) {
            queryBuilder.append(" AND production_year <= ?");
            parameters.add(maxYear);
        }
        if (minCost != null) {
            queryBuilder.append(" AND cost_per_launch >= ?");
            parameters.add(minCost);
        }
        if (maxCost != null) {
            queryBuilder.append(" AND cost_per_launch <= ?");
            parameters.add(maxCost);
        }

        try (PreparedStatement ps = connection.prepareStatement(queryBuilder.toString())) {
            for (int i=0; i < parameters.size(); i++) {
                ps.setObject(i+1, parameters.get(i));
            }
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Platform platform = new Platform();
                platform.setId(rs.getLong("platform_id"));
                platform.setPlatformName(rs.getString("platform_name"));
                platform.setProductionYear(rs.getInt("production_year"));
                platform.setCostPerLaunch(rs.getDouble("cost_per_launch"));
                platform.setImage(rs.getBytes("platform_image"));
                platforms.add(platform);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return platforms;
    }

    /**
     * Check if the corner cases are satisfies for filter
     * @param minYear Minimum production year (inclusive)
     * @param maxYear Maximum production year (inclusive)
     * @param minCost Minimum cost per launch (inclusive)
     * @param maxCost Maximum cost per launch (inclusive)
     */
    private void validateParameters(Integer minYear, Integer maxYear, Double minCost, Double maxCost) {
        int currentYear = java.util.Calendar.getInstance().get(java.util.Calendar.YEAR);
        if (minYear != null && (minYear < 0 || minYear > currentYear)) {
            throw new IllegalArgumentException("Minimum year cannot be negative or greater than the current year.");
        }
        if (maxYear != null && (maxYear < 0 || maxYear > currentYear)) {
            throw new IllegalArgumentException("Maximum year cannot be negative or greater than the current year.");
        }
        if (minCost != null && minCost < 0) {
            throw new IllegalArgumentException("Minimum cost cannot be negative.");
        }
        if (maxCost != null && maxCost < 0) {
            throw new IllegalArgumentException("Maximum cost cannot be negative.");
        }
        if (minYear != null && maxYear != null && minYear > maxYear) {
            throw new IllegalArgumentException("Minimum year cannot be greater than maximum year.");
        }
    }
}
