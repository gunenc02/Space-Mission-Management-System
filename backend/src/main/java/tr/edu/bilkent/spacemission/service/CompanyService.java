package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.dto.AstronautDto;
import tr.edu.bilkent.spacemission.dto.AstronautForRequestListingDto;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.dto.Login;
import tr.edu.bilkent.spacemission.entity.Company;
import tr.edu.bilkent.spacemission.repository.CompanyRepository;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;


    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<CompanyDto> getAllCompanies(){
        return companyRepository.getAllCompanies();
    }

    public Company getCompanyProfile(long id){
        return companyRepository.getCompanyProfile(id);
    }

    public CompanyDto isCompanyExists(Login logInfo){
        return companyRepository.getByLogInfo(logInfo);
    }

    public void offerJob(long astronautId) {
        companyRepository.offerJob(astronautId);
    }

    public void fireAstronaut(long id, long astronautId){companyRepository.fireAstronaut(id, astronautId);}

    //returns whether the space mission is performed after attempt
    public void markSpaceMissionAsPerformed(long id, long missionId){
        companyRepository.markSpaceMissionAsPerformed(id, missionId);
    }

    public List<CompanyDto> filterCompanies(String country, Double minBudget, Double maxBudget) {
        return companyRepository.filterCompanies(country, minBudget, maxBudget);
    }

    public String getCompanyName(long companyId) {
        return companyRepository.getCompanyName(companyId);
    }

    public List<AstronautForRequestListingDto> getJoinRequests(long companyId) {
        return companyRepository.getJoinRequests(companyId);
    }

    public void acceptAstronautIntoMission(long astronautId, long missionId) {
        companyRepository.acceptAstronautIntoMission(astronautId, missionId);
    }

    public void declineAstronaut(long astronautId, long missionId) {
        companyRepository.declineAstronaut(astronautId, missionId);
    }
}
