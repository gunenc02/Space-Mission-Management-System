package tr.edu.bilkent.spacemission.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.*;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpaceMission {
    private int id;
    private String missionName;
    private Image image;
    private String objective;
    private double budget;
    private Date createDate;
    private Date performDate;
}
