package tr.edu.bilkent.spacemission.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Platform {
    private long id;
    private String platformName;
    private int productionYear;
    private byte[] image;
    private double costPerLaunch;
}
