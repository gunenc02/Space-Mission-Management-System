package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.repository.AstronautRepository;

import java.util.List;

@Service
public class AstronautService {

    private final AstronautRepository astronautRepository;

    public AstronautService(AstronautRepository astronautRepository) {
        this.astronautRepository = astronautRepository;
    }

    public List<CompanyDto> getExperienceById(long id) {
        return astronautRepository.getExperienceById(id);
    }

    public void joinCompany(long companyId) {
        astronautRepository.joinCompany(companyId);
    }
}
