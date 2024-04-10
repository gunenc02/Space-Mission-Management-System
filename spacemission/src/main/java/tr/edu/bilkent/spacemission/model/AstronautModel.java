package tr.edu.bilkent.spacemission.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "astronaut")
public class AstronautModel {

    @Id
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "astronaut_id")
    @MapsId
    UserModel user;

    @Column(nullable = false, name = "astronaut_name")
    String astronautName;

    @Column(nullable = true, name = "astronaut_image")
    @Lob
    byte[] astronautImage;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false, name = "date_of_birth")
    Date dateOfBirth;

    //I dont know how to implement this type of
    @Column(nullable = false)
    long age;

    @Column(nullable = false, length = 255)
    String status;

    @Column(nullable = false, length = 255)
    String country;

    @Column(nullable = false, precision = 19, scale = 2, name = "salary")
    BigDecimal salary;

}
