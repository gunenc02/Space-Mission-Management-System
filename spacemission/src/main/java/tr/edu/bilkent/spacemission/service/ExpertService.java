package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.dto.ExpertRegisterDto;
import tr.edu.bilkent.spacemission.dto.HealthRecordsInExpertPortfolio;
import tr.edu.bilkent.spacemission.entity.Expert;
import tr.edu.bilkent.spacemission.repository.ExpertRepository;

import java.util.List;

@Service
public class ExpertService {
    private final ExpertRepository expertRepository;
    private final CompanyService companyService;

    public ExpertService(ExpertRepository expertRepository, CompanyService companyService) {
        this.expertRepository = expertRepository;
        this.companyService = companyService;
    }

    public Expert getExpertById(long id) {
        return expertRepository.getExpertById(id);
    }

    public void registerExpert(ExpertRegisterDto expert) {
        expertRepository.registerExpert(expert);
    }
    public void fireExpert(long id) { expertRepository.fireExpert(id); }

    public List<HealthRecordsInExpertPortfolio> getExpertPortfolio(long expertId) {
        return expertRepository.getExpertPortfolio(expertId);
    }

    public String getCompanyName(long companyId) {
        return companyService.getCompanyName(companyId);
    }
}
