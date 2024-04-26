package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.dto.AstronautDto;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.entity.Astronaut;
import tr.edu.bilkent.spacemission.service.AstronautService;

import java.util.List;

@RestController
@RequestMapping("/astronaut")
public class AstronautController {

    private final AstronautService astronautService;

    public AstronautController(AstronautService astronautService) {
        this.astronautService = astronautService;
    }

    @GetMapping("/profile/{id}")
    public AstronautDto getAstronautProfile(@PathVariable long id){
        Astronaut astronaut = astronautService.getAstronautProfile(id);
        return convertEntityToDto(astronaut);
    }

    @GetMapping("/listExperience/{id}")
    public List<CompanyDto> getExperienceById(@PathVariable long id){
        return astronautService.getExperienceById(id);
    }

    @PostMapping("/joinCompany/{companyId}/{userId}")
    public void joinCompany(@PathVariable long companyId, @PathVariable long userId){
        astronautService.joinCompany(companyId, userId);
    }

    private Astronaut convertDtoToEntity(AstronautDto astronautDto) {
        Astronaut astronaut = new Astronaut();
        astronaut.setId(astronautDto.getId());
        astronaut.setName(astronautDto.getName());
        astronaut.setImage(astronautDto.getImage());
        astronaut.setDateOfBirth(astronautDto.getDateOfBirth());
        astronaut.setStatus(astronautDto.isStatus());
        astronaut.setCountry(astronautDto.getCountry());
        astronaut.setSalary(astronautDto.getSalary());
        return astronaut;
    }

    private AstronautDto convertEntityToDto(Astronaut astronaut) {
        AstronautDto astronautDto = new AstronautDto();
        astronautDto.setId(astronaut.getId());
        astronautDto.setName(astronaut.getName());
        astronautDto.setImage(astronaut.getImage());
        astronautDto.setDateOfBirth(astronaut.getDateOfBirth());
        astronautDto.setStatus(astronaut.isStatus());
        astronautDto.setCountry(astronaut.getCountry());
        astronautDto.setSalary(astronaut.getSalary());
        return astronautDto;
    }
}
