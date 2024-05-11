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
                healthRecord.setId(rs.getLong("id"));
                healthRecord.setAstronautId(rs.getLong("astronaut_id"));
                healthRecord.setExpertId(rs.getLong("expert_id"));
                healthRecord.setDate(rs.getDate("date"));
                healthRecord.setAvailabilityForMission(rs.getBoolean("availability_for_mission"));
                healthRecord.setWeight(rs.getDouble("weight"));
                healthRecord.setHeight(rs.getDouble("height"));
                healthRecord.setHeartRate(rs.getDouble("heart_rate"));
                healthRecord.setBloodPressure(rs.getDouble("blood_pressure"));
                healthRecord.setVaccinations(rs.getString("vaccinations").split(","));
                healthRecord.setNotes(rs.getString("notes"));
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
            PreparedStatement ps = connection.prepareStatement("INSERT INTO health_record (astronaut_id, expert_id, date, availability_for_mission, weight, height, heart_rate, blood_pressure, vaccinations, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            ps.setLong(1, healthRecord.getAstronautId());
            ps.setLong(2, healthRecord.getExpertId());
            ps.setDate(3, healthRecord.getDate());
            ps.setBoolean(4, healthRecord.isAvailabilityForMission());
            ps.setDouble(5, healthRecord.getWeight());
            ps.setDouble(6, healthRecord.getHeight());
            ps.setDouble(7, healthRecord.getHeartRate());
            ps.setDouble(8, healthRecord.getBloodPressure());
            ps.setString(9, String.join(",", healthRecord.getVaccinations()));
            ps.setString(10, healthRecord.getNotes());
            ps.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
