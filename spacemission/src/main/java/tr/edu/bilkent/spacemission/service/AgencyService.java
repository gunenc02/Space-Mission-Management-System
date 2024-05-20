package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.dto.AgencyDto;
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

    public void approveMission(long agencyId, long missionId){
        agencyRepository.approveMission(agencyId, missionId);
    }
    public void approveAstronaut(long agencyId, long astronautId){
        agencyRepository.approveAstronaut(agencyId, astronautId);
    }

    public List<Agency> getAgenciesApprovedMission(long missionId){
        return agencyRepository.getAgenciesApprovedMission(missionId);
    }

    public List<Agency> getAgenciesApprovedAstronaut(long astronautId){
        return agencyRepository.getAgenciesApprovedAstronaut(astronautId);
    }

    public List<AgencyDto> filterAgencies (Boolean isApproved){
        return agencyRepository.filterAgencies(isApproved);
    }
}
