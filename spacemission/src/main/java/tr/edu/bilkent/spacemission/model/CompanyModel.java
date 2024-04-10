package tr.edu.bilkent.spacemission.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// THIS IS NOT ENTIRELY COMPLETE IMPLEMENTATION JUST TO GIVE YOU AN IDEA ABOUT THE IMPLEMENTATION OF MODELS
// THIS IS THE FOLDER WHERE DATABASE TABLES ARE MAPPED BE CAREFUL ABOUT NAMING MYSQL IS PROBLEMATIC ABOUT
// UPPERCASE LETTERS THAT'S WHY WE SPECIFY COLUMN NAMES EXPLICITLY
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="company")
public class CompanyModel {

    @Id
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id")
    @MapsId
    UserModel user;

    @Column(name = "company_name")
    String companyName;

    @Column(name = "company_mail")
    String companyMail;

    @Column(name = "company_password")
    String companyPassword;

    @Column(name = "company_country")
    String companyCountry;

    @Column(name = "company_budget")
    long companyBudget;

    @Column(name = "company_type")
    String companyType;
}
