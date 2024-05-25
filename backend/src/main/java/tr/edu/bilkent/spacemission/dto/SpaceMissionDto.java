package tr.edu.bilkent.spacemission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpaceMissionDto {
    private long id;
    private String missionName;
    private byte[] image;
    private String objective;
    private double budget;
    private Date createDate;
    private Date performDate;
    private int platformId;
    private int creatorId;
    private int performerId;
    private String performStatus;
}
