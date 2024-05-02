package tr.edu.bilkent.spacemission.controller;


import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.entity.Company;
import tr.edu.bilkent.spacemission.service.CompanyService;

import java.util.List;


/*
THIS IS THE PLACE WHERE WE GET THE REQUESTS
IT IS RECOMMENDED THAT DIRECTLY CALL THE SERVICE AND KEEP HERE AS SIMPLE AS POSSIBLE
 */
@CrossOrigin
@RestController
@RequestMapping("/company")
public class CompanyController {

    private final CompanyService companyService;

    // IT IS RECOMMENDED TO AVOID USE AUTOWIRED BUT WE MAY CONSIDER THAT AGAIN
    // THAT'S WHY WE NEED CONSTRUCTOR
    public CompanyController(CompanyService companyService){

        this.companyService = companyService;
    }

    // LIKE ALL WEB APPLICATIONS THIS IS THE URL THAT APPLICATION GET THE REQUESTS
    // THERE ARE 4 TYPES: GET POST PUT(FOR UPDATE PURPOSES) DELETE
    // (of course different types exists but only those are needed)
    // YOU CAN CREATE SAME URL FOR DIFFERENT REQUEST TYPES
    // @requestParam IS USED TO TAKE A PARAMETER AND RECOMMENDED TO USE WITH 'GET' TYPE REQUESTS
    // @requestBody IS USED TO TAKE BODY DIRECTLY AND RECOMMENDED TO USE WITH 'PUT' TYPE REQUESTS
    @GetMapping
    public List<CompanyDto> getAllCompanies(){
        return companyService.getAllCompanies();
    }

    @PostMapping("/offerJob/{astronautId}")
    public void offerJob(@PathVariable long astronautId){
        companyService.offerJob(astronautId);
    }

    @GetMapping("/profile/{id}")
    public CompanyDto getCompanyProfile(long id){
        return convertEntityToDto(companyService.getCompanyProfile(id));
    }

    private Company convertDtoToEntity(CompanyDto companyDto) {
        Company company = new Company();
        company.setId(companyDto.getId());
        company.setName(companyDto.getName());
        company.setMail(companyDto.getMail());
        company.setCountry(companyDto.getCountry());
        company.setBudget(companyDto.getBudget());
        //company.setType(companyDto.getType());
        return company;
    }

    private CompanyDto convertEntityToDto(Company company) {
        CompanyDto companyDto = new CompanyDto();
        companyDto.setId(company.getId());
        companyDto.setName(company.getName());
        companyDto.setMail(company.getMail());
        companyDto.setCountry(company.getCountry());
        companyDto.setBudget(company.getBudget());
        //companyDto.setType(company.getType());
        return companyDto;
    }
}
