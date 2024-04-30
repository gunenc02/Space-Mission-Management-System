package tr.edu.bilkent.spacemission.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.sql.Date;

//Dto for astronaut
//Refer to CompanyDto if you seek for explanation of Dto classes
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor

public class AstronautDto extends UserDto{
    String name;
    byte[] image;
    Date dateOfBirth; // I DIDN'T INCLUDE AGE ATTRIBUTE, can we take it as a derived attribute ? YOU CAN USE DATE CLASS DIRECTLY
    boolean onDuty;
    String country;
    double salary;
}
