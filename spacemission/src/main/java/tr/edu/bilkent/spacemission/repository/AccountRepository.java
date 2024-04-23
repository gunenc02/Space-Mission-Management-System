package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.dto.AdminRegisterDto;
import tr.edu.bilkent.spacemission.dto.AgencyRegisterDto;
import tr.edu.bilkent.spacemission.dto.AstronautRegisterDto;
import tr.edu.bilkent.spacemission.dto.CompanyRegisterDto;

import javax.sql.DataSource;
import java.sql.*;

@Repository
public class AccountRepository {

    String query;
    private final JdbcTemplate jdbcTemplate;
    private final Connection connection;

    public AccountRepository(JdbcTemplate jdbcTemplate, DataSource dataSource) throws SQLException {
        this.jdbcTemplate = jdbcTemplate;
        this.connection = dataSource.getConnection();
    }
    public void saveAdmin(AdminRegisterDto ardto) {
        try{
            PreparedStatement ps = connection.prepareStatement("INSERT INTO user(user_mail, user_password) VALUES (?,?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, ardto.getEmail());
            ps.setString(2, ardto.getPassword());
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                long userId = rs.getLong(1);

                // Now insert into the astronaut table
                PreparedStatement psAdmin = connection.prepareStatement(
                        "INSERT INTO admin (admin_id, admin_name) VALUES (?, ?)");
                psAdmin.setLong(1, userId);
                psAdmin.setString(2, ardto.getUsername());
                psAdmin.executeUpdate();
            }
        } catch (SQLException ex){
            System.out.println(ex.getMessage());
        }
    }
    public void saveAgency(AgencyRegisterDto ardto) {
        try{
            PreparedStatement ps = connection.prepareStatement("INSERT INTO user(user_mail, user_password) VALUES (?,?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, ardto.getEmail());
            ps.setString(2, ardto.getPassword());
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                long userId = rs.getLong(1);

                // Now insert into the astronaut table
                PreparedStatement psAgency = connection.prepareStatement(
                        "INSERT INTO agency (agency_id, agency_name) VALUES (?, ?)");
                psAgency.setLong(1, userId);
                psAgency.setString(2, ardto.getUsername());
                psAgency.executeUpdate();
            }
        } catch (SQLException ex){
            System.out.println(ex.getMessage());
        }

    }

    public void saveAstronaut(AstronautRegisterDto ardto) {
        try{
            PreparedStatement ps = connection.prepareStatement("INSERT INTO user(user_mail, user_password) VALUES (?,?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, ardto.getEmail());
            ps.setString(2, ardto.getPassword());
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                long userId = rs.getLong(1);

                // Now insert into the astronaut table
                PreparedStatement psCompany = connection.prepareStatement(
                        "INSERT INTO astronaut (astronaut_id, astronaut_name, astronaut_agency_id, country, date_of_birth) VALUES (?, ?, ?, ?, ?)");
                psCompany.setLong(1, userId);
                psCompany.setString(2, ardto.getUsername());
                psCompany.setLong(3, ardto.getAgencyId());
                psCompany.setString(4, ardto.getCountry());
                psCompany.setDate(5, ardto.getDateOfBirth());
                psCompany.executeUpdate();
            }
        } catch (SQLException ex){
            System.out.println(ex.getMessage());
        }

    }

    public void saveCompany(CompanyRegisterDto crdto) {
        try{
            PreparedStatement ps = connection.prepareStatement("INSERT INTO user(user_mail, user_password) VALUES (?,?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, crdto.getEmail());
            ps.setString(2, crdto.getPassword());
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                long userId = rs.getLong(1);

                // Now insert into the astronaut table
                PreparedStatement psCompany = connection.prepareStatement(
                        "INSERT INTO company (company_id, company_name, company_agency_id, money, country) VALUES (?, ?, ?, ?, ?)");
                psCompany.setLong(1, userId);
                psCompany.setString(2, crdto.getUsername());
                psCompany.setLong(3, crdto.getAgencyId());
                psCompany.setDouble(4, crdto.getMoney());
                psCompany.setString(5, crdto.getCountry());
                psCompany.executeUpdate();
            }
        } catch (SQLException ex){
            System.out.println(ex.getMessage());
        }

    }

    public void approveAgency(long agencyId) {
        try{
            PreparedStatement ps = connection.prepareStatement("UPDATE agency SET is_approved = TRUE WHERE agency_id = ?");
            ps.setLong(1, agencyId);
            ps.executeUpdate();
        }
        catch(SQLException ex){
            System.out.println(ex.getMessage());
        }


    }

    public void approveAstronaut(long astronautId) {
        try{
            PreparedStatement ps = connection.prepareStatement("UPDATE astronaut SET is_approved = TRUE WHERE astronaut_id = ?");
            ps.setLong(1, astronautId);
            ps.executeUpdate();
        }
        catch(SQLException ex){
            System.out.println(ex.getMessage());
        }
    }
    public void approveCompany(long companyId) {
        try{
            PreparedStatement ps = connection.prepareStatement("UPDATE company SET is_approved = TRUE WHERE company_id = ?");
            ps.setLong(1, companyId);
            ps.executeUpdate();
        }
        catch(SQLException ex){
            System.out.println(ex.getMessage());
        }
    }


    public void alterUser(long userId, String mail, String password) {
        if(mail == null && password == null){
            return;
        }
        if(mail != null){
            try{
                PreparedStatement ps = connection.prepareStatement("UPDATE user SET user_mail = ? WHERE user_id = ?");
                ps.setString(1, mail);
                ps.setLong(2, userId);
                ps.executeUpdate();
            }
            catch(SQLException ex){
                System.out.println(ex.getMessage());
            }
        }
        if(password != null){
            try{
                PreparedStatement ps = connection.prepareStatement("UPDATE user SET user_password = ? WHERE user_id = ?");
                ps.setString(1, password);
                ps.setLong(2, userId);
                ps.executeUpdate();
            }
            catch(SQLException ex){
                System.out.println(ex.getMessage());
            }
        }
    }

    public void alterAgency(long agencyId, String username, byte[]image) {
        if(username == null && image == null){
            return;
        }

        if(username != null){
            try{
                PreparedStatement ps = connection.prepareStatement("UPDATE agency SET agency_name= ? WHERE agency_id = ?");
                ps.setString(1, username);
                ps.setLong(2, agencyId);
                ps.executeUpdate();
            }
            catch(SQLException ex){
                System.out.println(ex.getMessage());
            }
        }

        if(image != null){
            try{
                PreparedStatement ps = connection.prepareStatement("UPDATE agency SET agency_logo= ? WHERE agency_id = ?");
                ps.setBytes(1, image);
                ps.setLong(2, agencyId);
                ps.executeUpdate();
            }
            catch(SQLException ex){
                System.out.println(ex.getMessage());
            }
        }

    }

    public void alterCompany(long companyId, String username, byte[] image) {
        if(username == null && image == null){
            return;
        }

        if(username != null){
            try{
                PreparedStatement ps = connection.prepareStatement("UPDATE company SET company_name= ? WHERE company_id = ?");
                ps.setString(1, username);
                ps.setLong(2, companyId);
                ps.executeUpdate();
            }
            catch(SQLException ex){
                System.out.println(ex.getMessage());
            }
        }

        if(image != null){
            try{
                PreparedStatement ps = connection.prepareStatement("UPDATE company SET company_logo= ? WHERE company_id = ?");
                ps.setBytes(1, image);
                ps.setLong(2, companyId);
                ps.executeUpdate();
            }
            catch(SQLException ex){
                System.out.println(ex.getMessage());
            }
        }
    }

    public void alterAstronaut(long astronautId, String username, byte[] image) {
        if(username == null && image == null){
            return;
        }

        if(username != null){
            try{
                PreparedStatement ps = connection.prepareStatement("UPDATE astronaut SET astronaut_name= ? WHERE astronaut_id = ?");
                ps.setString(1, username);
                ps.setLong(2, astronautId);
                ps.executeUpdate();
            }
            catch(SQLException ex){
                System.out.println(ex.getMessage());
            }
        }

        if(image != null){
            try{
                PreparedStatement ps = connection.prepareStatement("UPDATE astronaut SET astronaut_image= ? WHERE astronaut_id = ?");
                ps.setBytes(1, image);
                ps.setLong(2, astronautId);
                ps.executeUpdate();
            }
            catch(SQLException ex){
                System.out.println(ex.getMessage());
            }
        }
    }
}
