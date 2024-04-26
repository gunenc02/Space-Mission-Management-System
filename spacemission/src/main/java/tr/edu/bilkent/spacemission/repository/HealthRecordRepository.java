package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.entity.HealthRecord;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class HealthRecordRepository {
    private final JdbcTemplate jdbcTemplate;
    private final Connection connection;

    public HealthRecordRepository(JdbcTemplate jdbcTemplate, DataSource dataSource) throws SQLException {
        this.jdbcTemplate = jdbcTemplate;
        this.connection = dataSource.getConnection();
    }

    /**
     * This method returns the health record with the given id
     * @param id Id of the health record
     * @return HealthRecord object
     */
    public HealthRecord getHealthRecordById(long id) {
        HealthRecord healthRecord = null;
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM health_record WHERE health_record_id = ?");
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                healthRecord = new HealthRecord();
                healthRecord.setId(rs.getLong("health_record_id"));
                healthRecord.setAstronautId(rs.getLong("health_record_astronaut_id"));
                healthRecord.setDate(rs.getDate("health_record_date"));
                healthRecord.setAvailabilityForMission(rs.getBoolean("health_record_availability_for_mission"));
                healthRecord.setWeight(rs.getDouble("health_record_weight"));
                healthRecord.setHeight(rs.getDouble("health_record_height"));
                healthRecord.setHeartRate(rs.getDouble("health_record_heart_rate"));
                healthRecord.setBloodPressure(rs.getDouble("health_record_blood_pressure"));
                healthRecord.setVaccinations(rs.getString("health_record_vaccinations").split(","));
                healthRecord.setNotes(rs.getString("health_record_notes"));
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return healthRecord;
    }

    /**
     * This method creates a new health record
     * @param healthRecord HealthRecord object
     */
    public void createHealthRecord(HealthRecord healthRecord) {
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO health_record (health_record_astronaut_id, health_record_date, health_record_availability_for_mission, health_record_weight, health_record_height, health_record_heart_rate, health_record_blood_pressure, health_record_vaccinations, health_record_notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            ps.setLong(1, healthRecord.getAstronautId());
            ps.setDate(2, healthRecord.getDate());
            ps.setBoolean(3, healthRecord.isAvailabilityForMission());
            ps.setDouble(4, healthRecord.getWeight());
            ps.setDouble(5, healthRecord.getHeight());
            ps.setDouble(6, healthRecord.getHeartRate());
            ps.setDouble(7, healthRecord.getBloodPressure());
            ps.setString(8, String.join(",", healthRecord.getVaccinations()));
            ps.setString(9, healthRecord.getNotes());
            ps.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
