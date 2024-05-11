package tr.edu.bilkent.spacemission.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.dto.AstronautDto;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.entity.Astronaut;
import tr.edu.bilkent.spacemission.repository.AstronautRepository;

import java.util.List;

@Service
public class AstronautService {

    private final AstronautRepository astronautRepository;

    public AstronautService(AstronautRepository astronautRepository) {
        this.astronautRepository = astronautRepository;
    }

    public Astronaut getAstronautProfile(long id) {
        return astronautRepository.getAstronautProfile(id);
    }

    public List<Astronaut> getAstronauts() {
        return astronautRepository.getAstronauts();
    }

    public void joinCompany(long companyId, long userId) {
        astronautRepository.joinCompany(companyId, userId);
    }

    public void joinMission(long missionId, long astronautId) {
        astronautRepository.joinMission(missionId, astronautId);
    }

    public void leaveMission(long missionId, long astronautId) {
        astronautRepository.leaveMission(missionId, astronautId);
    }
}
