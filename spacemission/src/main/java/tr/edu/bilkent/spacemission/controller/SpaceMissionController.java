package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.dto.SpaceMissionDto;
import tr.edu.bilkent.spacemission.entity.SpaceMission;
import tr.edu.bilkent.spacemission.service.SpaceMissionService;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/spaceMission")
public class SpaceMissionController {
    private final SpaceMissionService spaceMissionService;

    public SpaceMissionController(SpaceMissionService spaceMissionService) {
        this.spaceMissionService = spaceMissionService;
    }

    @GetMapping("/list")
    public List<SpaceMissionDto> getSpaceMissions() {
        List<SpaceMission> spaceMissions = spaceMissionService.getSpaceMissions();
        List<SpaceMissionDto> spaceMissionDtos = new ArrayList<SpaceMissionDto>();
        for (SpaceMission spaceMission : spaceMissions) {
            spaceMissionDtos.add(convertEntityToDto(spaceMission));
        }
        return spaceMissionDtos;
    }

    @GetMapping("{id}")
    public SpaceMissionDto getSpaceMission(@PathVariable long id) {
        SpaceMission spaceMission = spaceMissionService.getSpaceMission(id);
        return convertEntityToDto(spaceMission);
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

    private SpaceMission convertDtoToEntity(SpaceMissionDto spaceMissionDto) {
        SpaceMission spaceMission = new SpaceMission();
        spaceMission.setId(spaceMissionDto.getId());
        spaceMission.setMissionName(spaceMissionDto.getMissionName());
        spaceMission.setImage(spaceMissionDto.getImage());
        spaceMission.setObjective(spaceMissionDto.getObjective());
        spaceMission.setBudget(spaceMissionDto.getBudget());
        spaceMission.setCreateDate(spaceMissionDto.getCreateDate());
        spaceMission.setPerformDate(spaceMissionDto.getPerformDate());
        return spaceMission;
    }

    private SpaceMissionDto convertEntityToDto (SpaceMission spaceMission) {
        SpaceMissionDto spaceMissionDto = new SpaceMissionDto();
        spaceMissionDto.setId(spaceMission.getId());
        spaceMissionDto.setMissionName(spaceMission.getMissionName());
        spaceMissionDto.setImage(spaceMission.getImage());
        spaceMissionDto.setObjective(spaceMission.getObjective());
        spaceMissionDto.setBudget(spaceMission.getBudget());
        spaceMissionDto.setCreateDate(spaceMission.getCreateDate());
        spaceMissionDto.setPerformDate(spaceMission.getPerformDate());
        return spaceMissionDto;
    }

}
