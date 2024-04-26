package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.entity.Agency;
import tr.edu.bilkent.spacemission.repository.AgencyRepository;

import java.util.List;

@Service
public class AgencyService {
    private final AgencyRepository agencyRepository;

    public AgencyService(AgencyRepository agencyRepository) { this.agencyRepository = agencyRepository; }

    public Agency getAgencyProfile(long agencyId){
        return agencyRepository.getAgencyProfile(agencyId);
    }

    public List<Agency> getAgencies() {
        return agencyRepository.getAgencies();
    }

    public boolean approveMission(long agencyId, long missionId, boolean approvedStatus){
        return agencyRepository.approveMission(agencyId, missionId, approvedStatus);
    }
    public boolean evaluateAstronaut(long agencyId, long astronautId, boolean approvedStatus){
        return agencyRepository.evaluateAstronaut(agencyId, astronautId, approvedStatus);
    }
}
