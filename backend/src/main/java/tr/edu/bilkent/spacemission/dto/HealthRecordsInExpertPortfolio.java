package tr.edu.bilkent.spacemission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HealthRecordsInExpertPortfolio {
    private long id;
    private Date date;
    private String astronautName;
    private String notes;
}
