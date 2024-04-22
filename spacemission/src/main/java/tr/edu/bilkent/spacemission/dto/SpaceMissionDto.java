package tr.edu.bilkent.spacemission.dto;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpaceMissionDto {
    long missionId;
    String missionName;
    String missionObjective;
    String createDate;
    double budget;
    long creatorId;
}
