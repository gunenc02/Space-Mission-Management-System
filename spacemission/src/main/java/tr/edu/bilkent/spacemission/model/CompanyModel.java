package tr.edu.bilkent.spacemission.model;

import jakarta.persistence.*;
import lombok.Data;

// THIS IS NOT ENTIRELY COMPLETE IMPLEMENTATION JUST TO GIVE YOU AN IDEA ABOUT THE IMPLEMENTATION OF MODELS
// THIS IS THE FOLDER WHERE DATABASE TABLES ARE MAPPED BE CAREFUL ABOUT NAMING MYSQL IS PROBLEMATIC ABOUT
// UPPERCASE LETTERS THAT'S WHY WE SPECIFY COLUMN NAMES EXPLICITLY
@Entity
@Data
@Table(name="company")
public class CompanyModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long companyId;

    @Column(name = "company_name")
    String companyName;

    // REST WILL BE ADDED LATER


}
