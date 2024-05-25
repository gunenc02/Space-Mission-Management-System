package tr.edu.bilkent.spacemission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

// THIS WILL BE USED TO SEND BODIES TO FRONT
// NO EXTERNAL ANNOTATION NEEDED
//this dto is used to send data to the frontend cause we dont want to send password to the front-end
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDto extends UserDto{

    private String name;
    private String country;
    private byte[] logo;
    private double money;

    public CompanyDto(long companyId, String companyName, String country, byte[] companyLogos, double money) {
        super(companyId);
        this.money = money;
        this.logo = logo;
        this.country = country;
        this.name = name;
    }
}
