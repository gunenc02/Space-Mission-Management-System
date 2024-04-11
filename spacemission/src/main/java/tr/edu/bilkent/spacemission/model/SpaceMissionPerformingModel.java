package tr.edu.bilkent.spacemission.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "space_mission_performing")
public class SpaceMissionPerformingModel {

    @Id
    @Column(name = "perform_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long performId;

    @Column(name = "perform_status")
    String performStatus;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "space_mission_id")
    SpaceMissionModel spaceMissionModel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "astronaut_id", nullable = false)
    AstronautModel astronautModel;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performer_company_id", nullable = false)
    CompanyModel companyModel;

}
