package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.entity.Astronaut;

import javax.sql.DataSource;
import java.sql.*;
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
                astronaut.setDateOfBirth(rs.getDate("astronaut_date_of_birth"));
                astronaut.setStatus(rs.getBoolean("astronaut_status"));
                astronaut.setCountry(rs.getString("astronaut_country"));
                astronaut.setSalary(rs.getDouble("astronaut_salary"));
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return astronaut;
    }

    // This method lists the background of the specific astronaut
    public List<CompanyDto> getExperienceById(long id) {
        return null;
    }

    //This method joins the astronaut into company
    public void joinCompany(long companyId, long userId) {
        query = "UPDATE astronaut SET astronaut_company_id = ? WHERE astronaut_id = ?";
        jdbcTemplate.update(query, companyId, userId);
    }
}
