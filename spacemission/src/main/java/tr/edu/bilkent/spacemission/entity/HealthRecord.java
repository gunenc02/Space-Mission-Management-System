package tr.edu.bilkent.spacemission.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HealthRecord {
    private long id;
    private long astronautId;
    private long expertId;
    private Date date;
    private boolean availabilityForMission;
    private double weight;
    private double height;
    private double heartRate;
    private double bloodPressure;
    private String[] vaccinations;
    private String notes;
}
