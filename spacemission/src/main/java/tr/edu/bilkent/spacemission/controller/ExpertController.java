package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.dto.ExpertDto;
import tr.edu.bilkent.spacemission.dto.ExpertRegisterDto;
import tr.edu.bilkent.spacemission.dto.HealthRecordsInExpertPortfolio;
import tr.edu.bilkent.spacemission.entity.Expert;
import tr.edu.bilkent.spacemission.service.ExpertService;

import java.util.List;

@RestController
@RequestMapping("/expert")
public class ExpertController {
    private final ExpertService expertService;

    public ExpertController(ExpertService expertService) {
        this.expertService = expertService;
    }

    @GetMapping("/{id}")
    public ExpertDto getExpertById(@PathVariable long id) {
        Expert expert = expertService.getExpertById(id);
        return convertEntityToDto(expert);
    }

    @PostMapping("/register")
    public void registerExpert(@RequestBody ExpertRegisterDto expertDto) {
        expertService.registerExpert(expertDto);
    }
    @DeleteMapping("/fire/{id}")
    public void fireExpert(@PathVariable long id){
        expertService.fireExpert(id);
    }

    @GetMapping("/getHealthRecordsByExpertId/{expertId}")
    public List<HealthRecordsInExpertPortfolio> getHealthRecordsByExpertId(@PathVariable long expertId){
        return expertService.getExpertPortfolio(expertId);
    }

    private ExpertDto convertEntityToDto(Expert expert) {
        ExpertDto expertDto = new ExpertDto();
        expertDto.setUserId(expert.getId());
        expertDto.setUserMail(expert.getMail());
        expertDto.setName(expert.getName());
        expertDto.setCompanyId(expert.getCompanyId());
        expertDto.setCompanyName(expertService.getCompanyName(expert.getCompanyId()));
        expertDto.setUserRole("EXPERT");
        return expertDto;
    }

    private Expert convertDtoToEntity(ExpertDto expertDto) {
        Expert expert = new Expert();
        expert.setId(expertDto.getUserId());
        expert.setMail(expertDto.getUserMail());
        //expert.setPassword(expertDto.getPassword());
        expert.setName(expertDto.getName());
        return expert;
    }
}
