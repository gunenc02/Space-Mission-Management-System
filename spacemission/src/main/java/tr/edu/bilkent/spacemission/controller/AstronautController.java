package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.dto.CompanyDto;
import tr.edu.bilkent.spacemission.service.AstronautService;

import java.util.List;

@RestController
@RequestMapping("/astronaut")
public class AstronautController {

    private final AstronautService astronautService;

    public AstronautController(AstronautService astronautService) {
        this.astronautService = astronautService;
    }

    @GetMapping("/listExperience/{id}")
    public List<CompanyDto> getExperienceById(@PathVariable long id){
        return astronautService.getExperienceById(id);
    }

    @PostMapping("/joinCompany/{companyId}/{userId}")
    public void joinCompany(@PathVariable long companyId, @PathVariable long userId){
        astronautService.joinCompany(companyId, userId);
    }
}
