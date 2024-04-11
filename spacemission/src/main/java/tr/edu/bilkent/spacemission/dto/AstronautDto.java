package tr.edu.bilkent.spacemission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Dto for astronaut
//Refer to CompanyDto if you seek for explanation of Dto classes
@Data
@AllArgsConstructor
@NoArgsConstructor

public class AstronautDto {
    int astronautId;
    String astronautName;
    String astronautImgPath; //??? Change to an Image object maybe ?
    String dateOfBirth; // I DIDN'T INCLUDE AGE ATTRIBUTE, can we take it as a derived attribute ?
    boolean astronautStatus; //true when astronaut is currently employed
    String astronautCountry;
    long astronautSalary;

}
