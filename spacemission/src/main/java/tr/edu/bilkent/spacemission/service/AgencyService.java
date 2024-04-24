package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.repository.AgencyRepository;

@Service
public class AgencyService {
    private final AgencyRepository agencyRepository;

    public AgencyService(AgencyRepository agencyRepository) { this.agencyRepository = agencyRepository; }


    public boolean approveMission(long agencyId, long missionId){
        return agencyRepository.approveMission(agencyId, missionId);
    }
    public boolean evaluateAstronaut(){
        return agencyRepository.evaluateAstronaut();
    }
}
