package tr.edu.bilkent.spacemission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AstronautRegisterDto {
    String email;
    String password;
    String name;
    private byte[] image;
    Date dateOfBirth;
    String country;
    long agencyId;

}
