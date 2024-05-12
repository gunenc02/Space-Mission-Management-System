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

    public CompanyController(CompanyService companyService){

        this.companyService = companyService;
    }

    @GetMapping("/list")
    public List<CompanyDto> getAllCompanies(){
        return companyService.getAllCompanies();
    }

    @PostMapping("/offerJob/{astronautId}")
    public void offerJob(@PathVariable long astronautId){
        companyService.offerJob(astronautId);
    }

    @GetMapping("/profile/{id}")
    public CompanyDto getCompanyProfile(@PathVariable long id){
        return convertEntityToDto(companyService.getCompanyProfile(id));
    }

    private Company convertDtoToEntity(CompanyDto companyDto) {
        Company company = new Company();
        company.setId(companyDto.getId());
        company.setName(companyDto.getName());
        company.setCountry(companyDto.getCountry());
        company.setBudget(companyDto.getBudget());
        //company.setType(companyDto.getType());
        return company;
    }

    private CompanyDto convertEntityToDto(Company company) {
        CompanyDto companyDto = new CompanyDto();
        companyDto.setId(company.getId());
        companyDto.setName(company.getName());
        companyDto.setCountry(company.getCountry());
        companyDto.setBudget(company.getBudget());
        //companyDto.setType(company.getType());
        return companyDto;
    }
}
