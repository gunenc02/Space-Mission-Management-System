package tr.edu.bilkent.spacemission.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Platform {
    private int id;
    private String modelName;
    private Image image;
    private int productionYear;
    private double costPerLaunch;
}
