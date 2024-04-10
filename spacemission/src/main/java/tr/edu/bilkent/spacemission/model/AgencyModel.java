package tr.edu.bilkent.spacemission.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "agency")
public class AgencyModel {

    @Id
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "agency_id")
    @MapsId
    UserModel user;

    @Column(nullable = false, name = "agency_name")
    String agencyName;

    @Column(nullable = false, name = "is_approved", columnDefinition = "BINARY(1)")
    Boolean isApproved;

    @Column(nullable = true, name = "agency_logo")
    @Lob
    private byte[] agencyLogo;
    

}
