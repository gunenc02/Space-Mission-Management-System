package tr.edu.bilkent.spacemission.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import tr.edu.bilkent.spacemission.dto.AstronautDto;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.dto.HealthRecordDto;
import tr.edu.bilkent.spacemission.dto.SpaceMissionDto;
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

    public List<Astronaut> getAstronautsByMissionId(long missionId) {
        return astronautRepository.getAstronautsByMissionId(missionId);
    }

    public List<AstronautDto> getApprovedAstronauts(long agencyId) {
        return astronautRepository.getApprovedAstronauts(agencyId);
    }

    public List<AstronautDto> filterAstronauts(String name, String country, Boolean onDuty) {
        return astronautRepository.filterAstronauts(name, country, onDuty);
    }
    public List<AstronautDto> searchAstronautsByName(String matchClause){
        return astronautRepository.searchAstronautsByName(matchClause);
    }
    public List<SpaceMissionDto> getMissions(long id){
        return astronautRepository.getMissions(id);
    }

    public List<HealthRecordDto> getHealthRecords(long id){
        return astronautRepository.getHealthRecords(id);
    }

    public void requestJoinMission(long id, long missionId) {
        astronautRepository.requestJoinMission(id, missionId);
    }
    public void deleteJoinMissionRequest(long id, long missionId){
        astronautRepository.deleteJoinMissionRequest(id, missionId);
    }
}