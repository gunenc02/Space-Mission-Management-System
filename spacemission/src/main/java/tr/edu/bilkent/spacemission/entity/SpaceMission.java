package tr.edu.bilkent.spacemission.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpaceMission {
    private long id;
    private String missionName;
    private byte[] image;
    private String objective;
    private double budget;
    private Date createDate;
    private Date performDate;
}
