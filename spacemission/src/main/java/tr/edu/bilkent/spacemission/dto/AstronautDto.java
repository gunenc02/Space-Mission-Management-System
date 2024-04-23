package tr.edu.bilkent.spacemission.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

//Dto for astronaut
//Refer to CompanyDto if you seek for explanation of Dto classes
@Data
@AllArgsConstructor
@NoArgsConstructor

public class AstronautDto {
    long id;
    String name;
    byte[] image;
    Date dateOfBirth; // I DIDN'T INCLUDE AGE ATTRIBUTE, can we take it as a derived attribute ? YOU CAN USE DATE CLASS DIRECTLY
    boolean status; //true when astronaut is currently employed ı HAVE ALREADY CHANGED THE DB TO STORE AS BINARY WHICH CORRESPONDS TO BINARY IN MYSQL
    String country;
    double salary;
}
