package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.dto.*;
import tr.edu.bilkent.spacemission.entity.*;

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
            PreparedStatement ps = connection.prepareStatement("INSERT INTO user(user_mail, user_password, user_role) VALUES (?,?,?);",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, ardto.getEmail());
            ps.setString(2, ardto.getPassword());
            ps.setString(3,"ADMIN");
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
            PreparedStatement ps = connection.prepareStatement("INSERT INTO user(user_mail, user_password, user_role) VALUES (?,?,?);",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, ardto.getEmail());
            ps.setString(2, ardto.getPassword());
            ps.setString(3,"AGENCY");
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                long userId = rs.getLong(1);

                // Now insert into the astronaut table
                PreparedStatement psAgency = connection.prepareStatement(
                        "");
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
            PreparedStatement ps = connection.prepareStatement("INSERT INTO user(user_mail, user_password) VALUES (?,?,?);",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, ardto.getEmail());
            ps.setString(2, ardto.getPassword());
            ps.setString(3,"ASTRONAUT");
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                long userId = rs.getLong(1);

                // Now insert into the astronaut table
                PreparedStatement psCompany = connection.prepareStatement(
                        "INSERT INTO astronaut (astronaut_id, astronaut_name, astronaut_agency_id, country, date_of_birth) VALUES (?, ?, ?, ?, ?);");
                psCompany.setLong(1, userId);
                psCompany.setString(2, ardto.getName());
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
            PreparedStatement ps = connection.prepareStatement("INSERT INTO user(user_mail, user_password, user_role) VALUES (?,?,?);",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, crdto.getEmail());
            ps.setString(2, crdto.getPassword());
            ps.setString(3,"COMPANY");
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                long userId = rs.getLong(1);

                // Now insert into the astronaut table
                PreparedStatement psCompany = connection.prepareStatement(
                        "INSERT INTO company (company_id, company_name, company_agency_id, money, country) VALUES (?, ?, ?, ?, ?);");
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
            PreparedStatement ps = connection.prepareStatement("UPDATE agency SET is_approved = TRUE WHERE agency_id = ?;");
            ps.setLong(1, agencyId);
            ps.executeUpdate();
        }
        catch(SQLException ex){
            System.out.println(ex.getMessage());
        }


    }

    public void approveAstronaut(long astronautId) {
        try{
            PreparedStatement ps = connection.prepareStatement("UPDATE astronaut SET is_approved = TRUE WHERE astronaut_id = ?;");
            ps.setLong(1, astronautId);
            ps.executeUpdate();
        }
        catch(SQLException ex){
            System.out.println(ex.getMessage());
        }
    }
    public void approveCompany(long companyId) {
        try{
            PreparedStatement ps = connection.prepareStatement("UPDATE company SET is_approved = TRUE WHERE company_id = ?;");
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
                PreparedStatement ps = connection.prepareStatement("UPDATE user SET user_mail = ? WHERE user_id = ?;");
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
                PreparedStatement ps = connection.prepareStatement("UPDATE user SET user_password = ? WHERE user_id = ?;");
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
                PreparedStatement ps = connection.prepareStatement("UPDATE agency SET agency_name= ? WHERE agency_id = ?;");
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
                PreparedStatement ps = connection.prepareStatement("UPDATE agency SET agency_logo= ? WHERE agency_id = ?;");
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
                PreparedStatement ps = connection.prepareStatement("UPDATE company SET company_name= ? WHERE company_id = ?;");
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
                PreparedStatement ps = connection.prepareStatement("UPDATE company SET company_logo= ? WHERE company_id = ?;");
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
                PreparedStatement ps = connection.prepareStatement("UPDATE astronaut SET astronaut_name= ? WHERE astronaut_id = ?;");
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
                PreparedStatement ps = connection.prepareStatement("UPDATE astronaut SET astronaut_image= ? WHERE astronaut_id = ?;");
                ps.setBytes(1, image);
                ps.setLong(2, astronautId);
                ps.executeUpdate();
            }
            catch(SQLException ex){
                System.out.println(ex.getMessage());
            }
        }
    }

    public UserDto getLoggedUser(String usermail, String password) {
        try{
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM user WHERE user_mail=? AND user_password = ?;");
            ps.setString(1, usermail);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();
            User tmp = new Admin();
            while(rs.next()){
                tmp.setId(rs.getLong("user_id"));
                tmp.setMail(rs.getString("user_mail"));
                tmp.setUserRole(rs.getString("user_role"));
            }
            PreparedStatement ps2;
            ResultSet rs2;
            if(tmp.getUserRole().equals("ADMIN")){
                AdminDto adm = new AdminDto();
                ps2 = connection.prepareStatement("SELECT  *  FROM admin WHERE admin_id = ?");
                ps2.setLong(1, tmp.getId());
                rs2 = ps2.executeQuery();
                while (rs2.next()) {
                    adm.setUserId(tmp.getId());
                    adm.setUserRole(tmp.getUserRole());
                    adm.setUserMail(tmp.getMail());
                    adm.setName(rs2.getString("admin_name"));
                }
                return adm;
            }

            if(tmp.getUserRole().equals("AGENCY")){
                AgencyDto agency = new AgencyDto();
                ps2 = connection.prepareStatement("SELECT  *  FROM agency WHERE agency_id = ?");
                ps2.setLong(1, tmp.getId());
                rs2 = ps2.executeQuery();
                while (rs2.next()) {
                    agency.setUserId(tmp.getId());
                    agency.setUserRole(tmp.getUserRole());
                    agency.setUserMail(tmp.getMail());
                    agency.setName(rs2.getString("admin_name"));
                    agency.setLogo(rs2.getBytes("agency_logo"));
                    agency.setApproved(rs2.getBoolean("is_approved"));
                }
                return agency;
            }


            if(tmp.getUserRole().equals("ASTRONAUT")){
                AstronautDto astronaut = new AstronautDto();
                ps2 = connection.prepareStatement("SELECT  *  FROM astronaut WHERE astronaut_id = ?");
                ps2.setLong(1, tmp.getId());
                rs2 = ps2.executeQuery();
                while (rs2.next()) {
                    astronaut.setUserId(tmp.getId());
                    astronaut.setUserRole(tmp.getUserRole());
                    astronaut.setUserMail(tmp.getMail());
                    astronaut.setName(rs2.getString("astronaut_name"));
                    astronaut.setImage(rs2.getBytes("astronaut_image"));
                    astronaut.setDateOfBirth(rs2.getDate("date_of_birth"));
                    astronaut.setCountry(rs2.getString("country"));
                    astronaut.setOnDuty(rs2.getBoolean("on_duty"));
                    astronaut.setSalary(rs2.getDouble("salary"));
                }
                return astronaut;
            }

            if(tmp.getUserRole().equals("COMPANY")){
                CompanyDto company = new CompanyDto();
                ps2 = connection.prepareStatement("SELECT  *  FROM company WHERE company_id = ?");
                ps2.setLong(1, tmp.getId());
                rs2 = ps2.executeQuery();
                while (rs2.next()) {
                    company.setUserId(tmp.getId());
                    company.setUserRole(tmp.getUserRole());
                    company.setUserMail(tmp.getMail());
                    company.setName(rs2.getString("company_name"));
                    company.setLogo(rs2.getBytes("company_logo"));
                    company.setCountry(rs2.getString("country"));
                    company.setMoney(rs2.getDouble("money"));
                }
                return company;
            }

            if(tmp.getUserRole().equals("EXPERT")){
                ExpertDto expert = new ExpertDto();
                ps2 = connection.prepareStatement("SELECT  *  FROM expert WHERE expert_id = ?");
                ps2.setLong(1, tmp.getId());
                rs2 = ps2.executeQuery();
                while (rs2.next()) {
                    expert.setUserId(tmp.getId());
                    expert.setUserRole(tmp.getUserRole());
                    expert.setUserMail(tmp.getMail());
                    expert.setName(rs2.getString("astronaut_name"));
                    expert.setCompanyId(rs.getLong("company_id"));
                    PreparedStatement ps3 = connection.prepareStatement("SELECT company_id, company_name, company_logo FROM company WHERE company_id = ?");
                    ps3.setLong(1, rs2.getLong("company_id"));
                    ResultSet rs3 = ps3.executeQuery();
                    while (rs3.next()) {
                        expert.setCompanyName(rs3.getString("company_name"));
                        expert.setCompanyLogo(rs3.getBytes("company_logo"));
                    }
                }
                return expert;
            }

            return null;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        return null;
    }

    private User createSpecificUser(String userRole){
        if(userRole.equals("ADMIN")){
            return new Admin();
        }
        if(userRole.equals("AGENCY")){
            return new Agency();
        }
        if(userRole.equals("ASTRONAUT")){
            return new Astronaut();
        }
        if(userRole.equals("COMPANY")){
            return new Company();
        }
        if(userRole.equals("EXPERT")){
            return new Expert();
        }

        return null;
    }
}
