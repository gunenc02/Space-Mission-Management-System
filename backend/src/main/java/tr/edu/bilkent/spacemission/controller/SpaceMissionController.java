package tr.edu.bilkent.spacemission.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.SpaceMissionManagement;
import tr.edu.bilkent.spacemission.dto.AgencyDto;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.dto.SpaceMissionDto;
import tr.edu.bilkent.spacemission.dto.SpaceMissionsInPortfolioDto;
import tr.edu.bilkent.spacemission.entity.Agency;
import tr.edu.bilkent.spacemission.entity.SpaceMission;
import tr.edu.bilkent.spacemission.service.SpaceMissionService;

import java.util.ArrayList;
import java.util.List;
import java.sql.Date;

@CrossOrigin
@RestController
@RequestMapping("/spaceMission")
public class SpaceMissionController {
    private final SpaceMissionService spaceMissionService;
    private final SpaceMissionManagement spaceMissionManagement;

    public SpaceMissionController(SpaceMissionService spaceMissionService, SpaceMissionManagement spaceMissionManagement) {
        this.spaceMissionService = spaceMissionService;
        this.spaceMissionManagement = spaceMissionManagement;
    }

    @GetMapping("/list")
    public List<SpaceMissionDto> getSpaceMissions() {
        List<SpaceMissionDto> spaceMissionsDtoList = spaceMissionService.getSpaceMissions();
        /*List<SpaceMissionDto> spaceMissionDtos = new ArrayList<SpaceMissionDto>();
        for (SpaceMission spaceMission : spaceMissions) {
            spaceMissionDtos.add(convertEntityToDto(spaceMission));
        }*/
        return spaceMissionsDtoList;
    }

    @GetMapping("{id}")
    public SpaceMissionDto getSpaceMission(@PathVariable long id) {
        SpaceMissionDto spaceMission = spaceMissionService.getSpaceMission(id);
        return spaceMission;
    }

    @PostMapping("/create")
    public void createSpaceMission(@RequestBody SpaceMissionDto spaceMissionDto) {
        SpaceMission spaceMission = convertDtoToEntity(spaceMissionDto);
        spaceMissionService.createSpaceMission(spaceMission);
    }

    @PutMapping("/update")
    public void updateSpaceMission(@RequestBody SpaceMissionDto spaceMissionDto) {
        SpaceMission spaceMission = convertDtoToEntity(spaceMissionDto);
        spaceMissionService.updateSpaceMission(spaceMission);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSpaceMission(@PathVariable long id) {
        spaceMissionService.deleteSpaceMission(id);
    }

    @GetMapping("/getAllMissionsByCompany/{companyId}")
    public List<SpaceMissionsInPortfolioDto> getPortfolio(@PathVariable long companyId){
        return spaceMissionService.getPortfolio(companyId);
    }

    @GetMapping("/getAllMissionsByAgency/{agencyId}")
    public List<SpaceMissionsInPortfolioDto> getApprovedMissions(@PathVariable long agencyId){
        return spaceMissionService.getApprovedMissions(agencyId);
    }

    @GetMapping("/getSpaceMissionsByAstronautId/{astronautId}")
    public List<SpaceMissionsInPortfolioDto> getAstronautPortfolio(@PathVariable long astronautId){
        return spaceMissionService.getAstronautPortfolio(astronautId);
    }

    private SpaceMission convertDtoToEntity(SpaceMissionDto spaceMissionDto) {
        SpaceMission spaceMission = new SpaceMission();
        spaceMission.setId(spaceMissionDto.getId());
        spaceMission.setMissionName(spaceMissionDto.getMissionName());
        spaceMission.setImage(spaceMissionDto.getImage());
        spaceMission.setObjective(spaceMissionDto.getObjective());
        spaceMission.setBudget(spaceMissionDto.getBudget());
        spaceMission.setCreateDate(spaceMissionDto.getCreateDate());
        spaceMission.setPerformDate(spaceMissionDto.getPerformDate());
        spaceMission.setCreatorId(spaceMissionDto.getCreatorId());
        return spaceMission;
    }

    @GetMapping("/filterMissions")
    public ResponseEntity<List<SpaceMissionDto>> filterMissions(
            @RequestParam(required = false) Double minBudget,
            @RequestParam(required = false) Double maxBudget,
            @RequestParam(required = false) String minCreateDate,
            @RequestParam(required = false) String maxCreateDate,
            @RequestParam(required = false) String minPerformDate,
            @RequestParam(required = false) String maxPerformDate) {
        try {
            List<SpaceMissionDto> missions = spaceMissionService.filterMissions(minBudget, maxBudget, minCreateDate, maxCreateDate, minPerformDate, maxPerformDate);
            return ResponseEntity.ok(missions);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}/getApprovingAgencies")
    public List<AgencyDto> getApprovingAgencies(@PathVariable long id){
        ArrayList<AgencyDto> result = new ArrayList<>();
        List<Agency> entityList = spaceMissionService.getApprovingAgencies(id);
        for(int i = 0; i < entityList.size(); i++){
            Agency agency = entityList.get(i);
            //BELOW IS TAKEN FROM AgencyController
            AgencyDto agencyDto = new AgencyDto();
            agencyDto.setUserId(agency.getId());
            //agencyDto.setPassword(agency.getPassword());
            agencyDto.setUserMail(agency.getMail());
            agencyDto.setName(agency.getName());
            agencyDto.setLogo(agency.getLogo());
            agencyDto.setApproved(agency.isApproved());
            result.add(agencyDto);
        }
        return result;
    }

}
