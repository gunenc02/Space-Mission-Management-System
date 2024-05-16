package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.dto.SpaceMissionDto;
import tr.edu.bilkent.spacemission.dto.SpaceMissionsInPortfolioDto;
import tr.edu.bilkent.spacemission.repository.SpaceMissionRepository;
import tr.edu.bilkent.spacemission.entity.SpaceMission;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class SpaceMissionService {
    private final SpaceMissionRepository spaceMissionRepository;

    public SpaceMissionService (SpaceMissionRepository spaceMissionRepository) {
        this.spaceMissionRepository = spaceMissionRepository;
    }

    public List<SpaceMissionDto> getSpaceMissions() {
        return spaceMissionRepository.getSpaceMissions();
    }

    public SpaceMissionDto getSpaceMission (long id) {
        return spaceMissionRepository.getSpaceMission(id);
    }

    public void createSpaceMission (SpaceMission spaceMission) {
        spaceMission.setCreateDate(Date.valueOf(LocalDate.now()));
        spaceMission.setPerformStatus("pending");
        spaceMissionRepository.createSpaceMission(spaceMission);
    }

    public void updateSpaceMission (SpaceMission spaceMission) {
        spaceMissionRepository.updateSpaceMission(spaceMission);
    }

    public List<SpaceMissionsInPortfolioDto> getPortfolio(long companyId){
        return spaceMissionRepository.getPortfolio(companyId);
    }

    public List<SpaceMissionsInCompanyPortfolioDto> getApprovedMissions(long agencyId){
        return spaceMissionRepository.getApprovedMissions(agencyId);
    }

    public void deleteSpaceMission (long id) {
        spaceMissionRepository.deleteSpaceMission(id);
    }

    public List<SpaceMissionsInPortfolioDto> getAstronautPortfolio(long astronautId) {
        return spaceMissionRepository.getMissionByAstronautId(astronautId);
    }
}
