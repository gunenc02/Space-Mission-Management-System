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
    int astronautId; // WE GENERALLY USE "long" AS A TYPE FOR IDS SO USE LONG FOR FURTHER DEVELOPMENTS
    String astronautName;
    String astronautImgPath; //??? Change to an Image object maybe ? USE BINARY ARRAY SINCE IMAGES CAN BE STORED AT MYSQL AS BLOB
    String dateOfBirth; // I DIDN'T INCLUDE AGE ATTRIBUTE, can we take it as a derived attribute ? YOU CAN USE DATE CLASS DIRECTLY
    boolean astronautStatus; //true when astronaut is currently employed ı HAVE ALREADY CHANGED THE DB TO STORE AS BINARY WHICH CORRESPONDS TO BINARY IN MYSQL
    String astronautCountry;
    long astronautSalary;
}
