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
    private long id; //user id
    private String name;
    private byte[] image;
    private Date dateOfBirth; // I DIDN'T INCLUDE AGE ATTRIBUTE, can we take it as a derived attribute ? YOU CAN USE DATE CLASS DIRECTLY
    private boolean onDuty;
    private String country;
    private double salary;
}
