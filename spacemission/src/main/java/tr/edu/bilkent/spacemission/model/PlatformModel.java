package tr.edu.bilkent.spacemission.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "platform")
public class PlatformModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "platform_id")
    long platformId;

    @Column(nullable = false, length = 255, name="model_name")
    String modelName;

    @Column(nullable = false, name = "production_year")
    long productionYear;

    @Lob
    @Column(name = "platform_image")
    byte[] platformImage;

    @Column(nullable = false, precision = 19, scale = 2)
    BigDecimal costPerLaunch;
}
