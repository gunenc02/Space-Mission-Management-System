package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.entity.Astronaut;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AstronautRepository {
    String query;
    private final JdbcTemplate jdbcTemplate;
    private final Connection connection;

    public AstronautRepository(JdbcTemplate jdbcTemplate, DataSource dataSource) throws SQLException {
        this.jdbcTemplate = jdbcTemplate;
        this.connection = dataSource.getConnection();
    }

    /**
     * This method returns the profile of the astronaut with the given id
     * @param id Id of the astronaut
     * @return Astronaut object
     */
    public Astronaut getAstronautProfile(long id) {
        Astronaut astronaut = null;
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM astronaut WHERE astronaut_id = ?");
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                astronaut = new Astronaut();
                astronaut.setId(rs.getLong("astronaut_id"));
                astronaut.setName(rs.getString("astronaut_name"));
                astronaut.setImage(rs.getBytes("astronaut_image"));
                astronaut.setDateOfBirth(rs.getDate("date_of_birth"));
                astronaut.setOnDuty(rs.getBoolean("on_duty"));
                astronaut.setCountry(rs.getString("country"));
                astronaut.setSalary(rs.getDouble("salary"));
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return astronaut;
    }

    /**
     * This method returns the list of all astronauts
     * @return List of astronauts
     */
    public List<Astronaut> getAstronauts() {
        List<Astronaut> astronauts = new ArrayList<Astronaut>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM astronaut");
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Astronaut astronaut = new Astronaut();
                astronaut.setId(rs.getLong("astronaut_id"));
                astronaut.setName(rs.getString("astronaut_name"));
                astronaut.setImage(rs.getBytes("astronaut_image"));
                astronaut.setDateOfBirth(rs.getDate("date_of_birth"));
                astronaut.setOnDuty(rs.getBoolean("on_duty"));
                astronaut.setCountry(rs.getString("country"));
                astronaut.setSalary(rs.getDouble("salary"));
                astronauts.add(astronaut);
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return astronauts;
    }

    /**
     * This method joins the astronaut into company
     * @param companyId Id of the company
     * @param userId Id of the astronaut
     */
    public void joinCompany(long companyId, long userId) {
        query = "UPDATE astronaut SET astronaut_company_id = ? WHERE astronaut_id = ?";
        jdbcTemplate.update(query, companyId, userId);
    }

    /**
     * This method associates the given astronaut with the given mission
     * @param missionId Id of the mission
     * @param astronautId Id of the astronaut
     */
    public void joinMission(long missionId, long astronautId) {
        query = "INSERT INTO mission_astronaut_recordings (mission_id, astronaut_id) VALUES (?, ?)";
        jdbcTemplate.update(query, missionId, astronautId);
    }

    /**
     * This method removes the association between the given astronaut and the given mission
     * @param missionId Id of the mission
     * @param astronautId Id of the astronaut
     */
    public void leaveMission(long missionId, long astronautId) {
        query = "DELETE FROM mission_astronaut_recordings WHERE mission_id = ? AND astronaut_id = ?";
        jdbcTemplate.update(query, missionId, astronautId);
    }
}
