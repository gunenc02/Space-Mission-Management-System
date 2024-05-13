package tr.edu.bilkent.spacemission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpaceMissionsInCompanyPortfolioDto {

    private long id;
    private String missionName;
    private String creatorCompanyName;
    private String status;
    private Date startDate;
    private Date endDate;
    private byte[] image;
}
