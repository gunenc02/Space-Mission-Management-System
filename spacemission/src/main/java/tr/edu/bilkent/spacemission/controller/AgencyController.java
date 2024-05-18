package tr.edu.bilkent.spacemission.controller;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.dto.AgencyDto;
import tr.edu.bilkent.spacemission.service.AgencyService;
import tr.edu.bilkent.spacemission.entity.Agency;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/agency")
@Lazy //Lazy annotation creates the controller only when first requested. This broke a cyclic bean dependency
// I do not know where it came from :D LOL
public class AgencyController {
    private final AgencyService agencyService;

    public AgencyController(AgencyService agencyService){ this.agencyService = agencyService;}

    @GetMapping("/profile/{id}")
    public AgencyDto getAgencyProfile(@PathVariable long id){
        Agency agency = agencyService.getAgencyProfile(id);
        return convertEntityToDto(agency);
    }

    @GetMapping("/list")
    public List<AgencyDto> getAgencies(){
        List<Agency> agencies = agencyService.getAgencies();
        List<AgencyDto> agencyDtos = new ArrayList<>();
        for (Agency agency : agencies){
            agencyDtos.add(convertEntityToDto(agency));
        }
        return agencyDtos;
    }

    @PostMapping("approveMission/{agencyId}/{missionId}")
    public void approveMission(@PathVariable long agencyId, @PathVariable long missionId){
        boolean success = agencyService.approveMission(agencyId, missionId);
        //ToDo
    }
    @PostMapping("approveAstronaut/{agencyId}/{astronautId}")
    public void evaluateAstronaut(@PathVariable long agencyId, @PathVariable long astronautId){
        boolean success = agencyService.approveAstronaut(agencyId, astronautId);
        //ToDo
    }

    private AgencyDto convertEntityToDto(Agency agency){
        AgencyDto agencyDto = new AgencyDto();
        agencyDto.setUserId(agency.getId());
        //agencyDto.setPassword(agency.getPassword());
        agencyDto.setUserMail(agency.getMail());
        agencyDto.setName(agency.getName());
        agencyDto.setLogo(agency.getLogo());
        agencyDto.setApproved(agency.isApproved());
        return agencyDto;
    }

    private Agency convertDtoToEntity (AgencyDto agencyDto) {
        Agency agency = new Agency();
        agency.setId(agencyDto.getUserId());
        //agency.setPassword(agencyDto.getPassword());
        agency.setName(agencyDto.getName());
        agency.setLogo(agencyDto.getLogo());
        agency.setApproved(agencyDto.isApproved());
        return agency;
    }

    @GetMapping("/filterAgencies")
    public ResponseEntity<List<AgencyDto>> filterAgencies(
            @RequestParam(required = false) Boolean isApproved) {
        try {
            List<AgencyDto> agencies = agencyService.filterAgencies(isApproved);
            return ResponseEntity.ok(agencies);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
