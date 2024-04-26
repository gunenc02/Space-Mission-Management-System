package tr.edu.bilkent.spacemission.controller;

import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.service.AgencyService;
//Do we need this class ? If not we may have to apply refactoring to its methods.
@RestController
@RequestMapping("/agency")
@Lazy //Lazy annotation creates the controller only when first requested. This broke a cyclic bean dependency
// I do not know where it came from
public class AgencyController {
    private final AgencyService agencyService;

    public AgencyController(AgencyService agencyService){ this.agencyService = agencyService;}

    @PostMapping("approveMission/{agencyId}/{missionId}/{approvedStatus}")
    public void approveMission(@PathVariable long agencyId, @PathVariable long missionId, @PathVariable boolean approvedStatus){
        boolean success = agencyService.approveMission(agencyId, missionId, approvedStatus);
        //ToDo
    }
    @PostMapping("evaluateAstronaut/{agencyId}/{astronautId}/{approvedStatus}")
    public void evaluateAstronaut(@PathVariable long agencyId, @PathVariable long astronautId, @PathVariable boolean approvedStatus){
        boolean success = agencyService.evaluateAstronaut(agencyId, astronautId, approvedStatus);
        //ToDo
    }
}
