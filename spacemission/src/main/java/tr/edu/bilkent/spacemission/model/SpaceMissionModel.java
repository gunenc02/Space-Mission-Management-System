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
@Table(name = "space_mission")
public class SpaceMissionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mission_id")
    long missionId;

    @Column(nullable = false, length = 255, name = "mission_name")
    String missionName;

    @Lob
    @Column(name = "mission_image")
    byte[] missionImage; // BLOB for storing binary data

    @Column(nullable = false, columnDefinition = "TEXT", name = "objective")
    String objective;

    @Column(nullable = false, precision = 19, scale = 2, name = "budget")
    BigDecimal budget;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false, name = "create_date")
    Date createDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "perform_date")
    Date performDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "platform_id")
    PlatformModel platform;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    CompanyModel creator;
}
