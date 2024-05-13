package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.dto.ExpertDto;
import tr.edu.bilkent.spacemission.dto.ExpertRegisterDto;
import tr.edu.bilkent.spacemission.entity.Expert;
import tr.edu.bilkent.spacemission.service.ExpertService;

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

    private ExpertDto convertEntityToDto(Expert expert) {
        ExpertDto expertDto = new ExpertDto();
        expertDto.setUserId(expert.getId());
        expertDto.setMail(expert.getMail());
        expertDto.setName(expert.getName());
        return expertDto;
    }

    private Expert convertDtoToEntity(ExpertDto expertDto) {
        Expert expert = new Expert();
        expert.setId(expertDto.getUserId());
        expert.setMail(expertDto.getMail());
        //expert.setPassword(expertDto.getPassword());
        expert.setName(expertDto.getName());
        return expert;
    }
}
