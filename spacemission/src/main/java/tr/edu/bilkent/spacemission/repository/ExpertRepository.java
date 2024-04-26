package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.entity.Expert;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class ExpertRepository {
    private final JdbcTemplate jdbcTemplate;
    private final Connection connection;

    public ExpertRepository (JdbcTemplate jdbcTemplate, DataSource dataSource) throws SQLException {
        this.jdbcTemplate = jdbcTemplate;
        this.connection = dataSource.getConnection();
    }

    /**
     * This method returns the profile of the expert with the given id
     * @param id Id of the expert
     * @return Expert object
     */
    public Expert getExpertById(long id) {
        Expert expert = null;
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM user WHERE user_id = ?");
            ps.setLong(1, id);

            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                expert = new Expert();
                expert.setId(rs.getLong("user_id"));
                expert.setMail(rs.getString("user_mail"));
                expert.setPassword(rs.getString("user_password"));
            }

            PreparedStatement ps2 = connection.prepareStatement("SELECT * FROM expert WHERE expert_id = ?");
            ps2.setLong(1, id);
            ResultSet rs2 = ps2.executeQuery();
            if (rs2.next()) {
                expert.setName(rs2.getString("expert_name"));
            }

        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return expert;
    }

    /**
     * This method registers the expert to the system
     * @param expert Expert object
     */
    public void registerExpert(Expert expert) {
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO user (user_mail, user_password) VALUES (?, ?)");
            ps.setString(1, expert.getMail());
            ps.setString(2, expert.getPassword());
            ps.executeUpdate();

            PreparedStatement ps2 = connection.prepareStatement("SELECT user_id FROM user WHERE user_mail = ?");
            ps2.setString(1, expert.getMail());
            ResultSet rs = ps2.executeQuery();
            long userId = 0;
            if (rs.next()) {
                userId = rs.getLong("user_id");
            }

            PreparedStatement ps3 = connection.prepareStatement("INSERT INTO expert (expert_id, expert_name) VALUES (?, ?)");
            ps3.setLong(1, userId);
            ps3.setString(2, expert.getName());
            ps3.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public void fireExpert(long id){
        String query = "DELETE FROM expert WHERE expert_id = ?;";
        try {
            PreparedStatement ps = connection.prepareStatement(query);
            //1 BASED INDEXING FOR PLACEHOLDERS
            ps.setLong(1, id);
            ps.executeUpdate(); //executeUpdate also for delete queries
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
