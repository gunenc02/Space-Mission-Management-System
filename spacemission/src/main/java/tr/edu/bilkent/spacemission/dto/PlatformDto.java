package tr.edu.bilkent.spacemission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlatformDto {
    private long id;
    private String platformName;
    private int productionYear;
    private byte[] image;
    private double costPerLaunch;
}
