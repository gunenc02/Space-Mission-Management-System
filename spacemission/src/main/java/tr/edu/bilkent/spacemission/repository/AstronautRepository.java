package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.dto.AstronautDto;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.dto.HealthRecordDto;
import tr.edu.bilkent.spacemission.entity.Astronaut;
import tr.edu.bilkent.spacemission.dto.SpaceMissionDto;

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
            PreparedStatement ps = connection.prepareStatement(
                    "SELECT astronaut.*, " +
                            "(SELECT user_mail FROM user WHERE user_id = astronaut.astronaut_id) AS user_mail, " +
                            "(SELECT user_role FROM user WHERE user_id = astronaut.astronaut_id) AS user_role " +
                            "FROM astronaut " +
                            "WHERE astronaut.astronaut_id = ?"
            );
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                astronaut = new Astronaut();
                astronaut.setId(rs.getLong("astronaut_id"));
                astronaut.setUserRole(rs.getString("user_role"));
                astronaut.setMail(rs.getString("user_mail"));
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

    /**
     * This method returns the list of astronauts that
     * are approved by the agency
     * @param agencyId ID of the agency
     */
    public List<AstronautDto> getApprovedAstronauts(long agencyId) {
        ArrayList<AstronautDto> astronauts = new ArrayList<>();

        try {
            PreparedStatement ps = connection.prepareStatement(
                    "SELECT ast.* " +
                            "FROM astronaut ast " +
                            "JOIN agency_approve_astronaut aaa ON ast.astronaut_id = aaa.astronaut_id " +
                            "JOIN agency a ON aaa.agency_id = a.agency_id " +
                            "WHERE a.agency_id = ?"
            );

            ps.setLong(1, agencyId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                AstronautDto astronaut = new AstronautDto();
                astronaut.setUserId(rs.getInt("astronaut_id"));
                astronaut.setName(rs.getString("astronaut_name"));
                //astronaut.setImage(rs.getBytes("astronaut_image"));
                astronaut.setDateOfBirth(rs.getDate("date_of_birth"));
                astronaut.setOnDuty(rs.getBoolean("on_duty"));
                astronaut.setCountry(rs.getString("country"));
                astronaut.setSalary(rs.getDouble("salary"));
                astronauts.add(astronaut);
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }

        return astronauts;
    }
     /**
     * @param id of the astronaut
     * @return list of all missions the astronaut is associated with including ongoing and completed missions
     */
     public List<SpaceMissionDto> getMissions(long id){
         ArrayList<SpaceMissionDto> missions = new ArrayList<>();

         String query = "SELECT sm.* " +
                 "FROM space_mission sm " +
                 "JOIN mission_astronaut_recordings mar ON sm.mission_id = mar.mission_id " +
                 "WHERE mar.astronaut_id = ? " +
                 "ORDER BY sm.perform_status ASC, sm.create_date DESC;";
         try {
             PreparedStatement ps = connection.prepareStatement(query);
             ps.setLong(1, id);
             ResultSet rs = ps.executeQuery();

             while (rs.next()) {
                 SpaceMissionDto spaceMission = new SpaceMissionDto();

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

                 missions.add(spaceMission);
             }
         } catch (SQLException e) {
             System.out.println(e.getMessage());
         }
         return missions;
     }

    /**
     *
     * @param id astronaut id
     * @return all of the health records of the astronaut sorted by date
     */
    public List<HealthRecordDto> getHealthRecords(long id) {
        ArrayList<HealthRecordDto> records = new ArrayList<>();

        String query = "SELECT * FROM health_record " +
                "WHERE astronaut_id = ? " +
                "ORDER BY date DESC;";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                HealthRecordDto healthRecord = new HealthRecordDto();

                healthRecord.setId(rs.getLong("health_record_id")); // Correct column name from schema
                healthRecord.setAstronautId(rs.getLong("astronaut_id"));
                healthRecord.setExpertId(rs.getLong("expert_id"));
                healthRecord.setDate(rs.getDate("date"));
                healthRecord.setAvailabilityForMission(rs.getBoolean("availibility_for_mission"));
                healthRecord.setWeight(rs.getDouble("weight"));
                healthRecord.setHeight(rs.getDouble("height"));
                healthRecord.setHeartRate(rs.getInt("heart_rate"));
                healthRecord.setBloodPressure(rs.getString("blood_pressure"));
                healthRecord.setVaccinations(rs.getString("vaccinations").split(","));
                healthRecord.setNotes(rs.getString("notes"));

                records.add(healthRecord);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return records;
    }

    /**
     * This method returns the list of astronauts that are associated with the given mission
     * @param missionId Id of the mission
     */
    public List<Astronaut> getAstronautsByMissionId(long missionId) {
        ArrayList<Astronaut> astronauts = new ArrayList<>();
        String query = "SELECT ast.* " +
                "FROM astronaut ast " +
                "JOIN mission_astronaut_recordings mar ON ast.astronaut_id = mar.astronaut_id " +
                "WHERE mar.mission_id = ?";

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setLong(1, missionId);
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
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return astronauts;
    }

    public List<AstronautDto> filterAstronauts(String name, String country, Boolean onDuty) {
        String query = "SELECT * FROM astronaut WHERE 1=1";
        List<Object> params = new ArrayList<>();

        if (name != null) {
            query += " AND astronaut_name LIKE ?";
            params.add("%" + name + "%");
        }
        if (country != null) {
            query += " AND country LIKE ?";
            params.add("%" + country + "%");
        }
        if (onDuty != null) {
            query += " AND on_duty = ?";
            params.add(onDuty);
        }

        return jdbcTemplate.query(query, params.toArray(), (rs, rowNum) -> {
            AstronautDto astronaut = new AstronautDto();
            astronaut.setName(rs.getString("astronaut_name"));
            astronaut.setCountry(rs.getString("country"));
            astronaut.setDateOfBirth(rs.getDate("date_of_birth"));
            astronaut.setOnDuty(rs.getBoolean("on_duty"));
            astronaut.setImage(rs.getBytes("astronaut_image"));
            return astronaut;
        });
    }


    public List<AstronautDto> searchAstronautsByName(String matchClause) {
        ArrayList<AstronautDto> astronauts = new ArrayList<>();
        String pattern = '%' + matchClause + '%';
        String query = "SELECT * FROM astronaut WHERE astronaut_name LIKE ?;";
        try{
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setString(1, pattern);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                AstronautDto astronaut = new AstronautDto();
                astronaut.setUserId(rs.getInt("astronaut_id"));
                astronaut.setName(rs.getString("astronaut_name"));
                astronaut.setImage(rs.getBytes("astronaut_image"));
                astronaut.setDateOfBirth(rs.getDate("date_of_birth"));
                astronaut.setOnDuty(rs.getBoolean("on_duty"));
                astronaut.setCountry(rs.getString("country"));
                astronaut.setSalary(rs.getDouble("salary"));
                astronauts.add(astronaut);
            }
        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
        }
        return astronauts;
    }

    public void requestJoinMission(long id, long missionId) {
        try{
            String query = "INSERT INTO astronaut_mission_join_request(mission_id, astronaut_id) VALUES(?, ?);";
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setLong(1, missionId);
            ps.setLong(2, id);
            ps.executeUpdate();
        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
        }
    }
    public void deleteJoinMissionRequest(long id, long missionId) {
        try{
            String query = "DELETE FROM astronaut_mission_join_request WHERE mission_id = ? AND astronaut_id = ?;";
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setLong(1, missionId);
            ps.setLong(2, id);
            ps.executeUpdate();
        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
        }
    }

    public boolean hasJoinRequest(long id, long missionId) {
        boolean result = false;
        try{
            String query = "SELECT * FROM astronaut_mission_join_request " +
                    "WHERE mission_id = ? AND astronaut_id = ?;";
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setLong(1, missionId);
            ps.setLong(2, id);
            ResultSet rs = ps.executeQuery();

            result = rs.next(); //check if we have an entry
        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
        }
        return result;
    }
}
