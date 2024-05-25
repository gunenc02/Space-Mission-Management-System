package tr.edu.bilkent.spacemission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidDto {
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
