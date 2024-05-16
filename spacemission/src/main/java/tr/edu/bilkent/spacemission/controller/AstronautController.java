package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.dto.AstronautDto;
import tr.edu.bilkent.spacemission.dto.HealthRecordDto;
import tr.edu.bilkent.spacemission.entity.Astronaut;
import tr.edu.bilkent.spacemission.service.AstronautService;
import tr.edu.bilkent.spacemission.service.SpaceMissionService;
import tr.edu.bilkent.spacemission.dto.SpaceMissionDto;


import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/astronaut")
public class AstronautController {

    private final AstronautService astronautService;
    private final SpaceMissionService spaceMissionService;

    public AstronautController(AstronautService astronautService, SpaceMissionService spaceMissionService) {
        this.astronautService = astronautService;
        this.spaceMissionService = spaceMissionService;
    }

    @GetMapping("/profile/{id}")
    public AstronautDto getAstronautProfile(@PathVariable long id){
        Astronaut astronaut = astronautService.getAstronautProfile(id);
        return convertEntityToDto(astronaut);
    }

    @GetMapping("/list")
    public List<Astronaut> getAstronauts() {
        return astronautService.getAstronauts();
    }

    @PostMapping("/joinCompany/{companyId}/{userId}")
    public void joinCompany(@PathVariable long companyId, @PathVariable long userId){
        astronautService.joinCompany(companyId, userId);
    }

    @PostMapping("/joinMission/{missionId}/{astronautId}")
    public void joinMission(@PathVariable long missionId, @PathVariable long astronautId){
        astronautService.joinMission(missionId, astronautId);
    }

    @DeleteMapping("/leaveMission/{missionId}/{astronautId}")
    public void leaveMission(@PathVariable long missionId, @PathVariable long astronautId){
        astronautService.leaveMission(missionId, astronautId);
    }

    @GetMapping("/getAstronautsByMissionId/{missionId}")
    public List<AstronautDto> getAstronautsByMissionId(@PathVariable long missionId) {
        ArrayList<AstronautDto> astronautDtos = new ArrayList<>();
        for (Astronaut astronaut : astronautService.getAstronautsByMissionId(missionId)) {
            astronautDtos.add(convertEntityToDto(astronaut));
        }
        return astronautDtos;
    }


    @GetMapping("/getAllAstronautByAgency/{agencyId}")
    public List<AstronautDto> getApprovedAstronauts(@PathVariable long agencyId) {
        return astronautService.getApprovedAstronauts(agencyId);
    }

    @GetMapping("/getMissions/{id}")
    public List<SpaceMissionDto> getMissions(@PathVariable long id){
        return astronautService.getMissions(id);
    }

    @GetMapping("/getHealthRecords/{id}")
    public List<HealthRecordDto> getHealthRecords(@PathVariable long id){
        return astronautService.getHealthRecords(id);
    }

    private Astronaut convertDtoToEntity(AstronautDto astronautDto) {
        Astronaut astronaut = new Astronaut();
        astronaut.setId(astronautDto.getUserId());
        astronaut.setName(astronautDto.getName());
        astronaut.setImage(astronautDto.getImage());
        astronaut.setDateOfBirth(astronautDto.getDateOfBirth());
        astronaut.setOnDuty(astronautDto.isOnDuty());
        astronaut.setCountry(astronautDto.getCountry());
        astronaut.setSalary(astronautDto.getSalary());
        return astronaut;
    }

    private AstronautDto convertEntityToDto(Astronaut astronaut) {
        AstronautDto astronautDto = new AstronautDto();
        astronautDto.setUserId(astronaut.getId());
        astronautDto.setName(astronaut.getName());
        astronautDto.setImage(astronaut.getImage());
        astronautDto.setDateOfBirth(astronaut.getDateOfBirth());
        astronautDto.setOnDuty(astronaut.isOnDuty());
        astronautDto.setCountry(astronaut.getCountry());
        astronautDto.setSalary(astronaut.getSalary());
        return astronautDto;
    }
}
