package tr.edu.bilkent.spacemission.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bid {
    private long id;
    private double price;
    private Date offerDate;
    private Date deadline;
    private String description;
    private String status;
    private long offererId;
    private long receiverId;
    private long missionId;
}
