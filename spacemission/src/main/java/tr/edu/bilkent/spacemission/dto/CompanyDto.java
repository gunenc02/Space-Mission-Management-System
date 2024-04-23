package tr.edu.bilkent.spacemission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// THIS WILL BE USED TO SEND BODIES TO FRONT
// NO EXTERNAL ANNOTATION NEEDED
//this dto is used to send data to the frontend cause we dont want to send password to the front-end
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDto {
    long companyId;
    String companyName;
    String companyMail;
    String companyCountry;
    double companyBudget;
    String companyType;

}
