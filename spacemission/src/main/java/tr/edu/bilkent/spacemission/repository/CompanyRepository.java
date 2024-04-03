package tr.edu.bilkent.spacemission.repository;

import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.model.CompanyModel;

import java.util.List;

// THIS IS OUR REPOSITORY THIS IS WHERE OUR QUERIES TAKE PLACE
// THIS IS WRONG FOR NOW BUT AFTER THE CLARIFICATIONS I AM GOING TO FIX IT
// I DONT KNOW FOR NOW HOW TO IMPLEMENT THOSE QUERIES WITHOUT THE HELP OF EXTERNAL LIBRARIES (JPA,CRUD) FOR NOW
@Repository
public class CompanyRepository {

    public List<CompanyModel> getAllCompaniesRepo() {
        return null;
    }
}
