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
    String name;
    String country;
    byte[] logo;
    double budget;
    //String type;

}
