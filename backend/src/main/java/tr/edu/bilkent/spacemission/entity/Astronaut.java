package tr.edu.bilkent.spacemission.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.sql.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Astronaut extends User{
    private String name;
    private byte[] image;
    private Date dateOfBirth;
    private boolean onDuty;
    private String country;
    private double salary;
}
