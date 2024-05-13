package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.dto.ExpertRegisterDto;
import tr.edu.bilkent.spacemission.entity.Expert;
import tr.edu.bilkent.spacemission.repository.ExpertRepository;

@Service
public class ExpertService {
    private final ExpertRepository expertRepository;

    public ExpertService(ExpertRepository expertRepository) {
        this.expertRepository = expertRepository;
    }

    public Expert getExpertById(long id) {
        return expertRepository.getExpertById(id);
    }

    public void registerExpert(ExpertRegisterDto expert) {
        expertRepository.registerExpert(expert);
    }
    public void fireExpert(long id) { expertRepository.fireExpert(id); }
}
