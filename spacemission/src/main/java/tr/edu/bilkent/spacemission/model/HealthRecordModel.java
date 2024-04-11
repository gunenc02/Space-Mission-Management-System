package tr.edu.bilkent.spacemission.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "health_record")
public class HealthRecordModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "health_record_id")
    long id;

    @Column(nullable = false, name = "date")
    Date date;

    @Column(nullable = false, name = "availability_for_mission")
    Boolean availabilityForMission;

    @Column(name = "weight", nullable = false, precision = 10, scale = 2)
    BigDecimal weight;

    @Column(name = "height", nullable = false, precision = 10, scale = 2)
    BigDecimal height;

    @Column(name = "health_rate", nullable = false)
    long healthRate;

    @Column(nullable = false, columnDefinition = "TEXT", name = "vaccinations")
    String vaccinations;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "expert_id", nullable = false)
    ExpertModel expert;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "astronaut_id", nullable = false)
    AstronautModel astronaut;


}
