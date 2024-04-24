package tr.edu.bilkent.spacemission.controller;

import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.*;
//Do we need this class ? If not we may have to apply refactoring to its methods.
@RestController
@RequestMapping("/agency")
@Lazy //Lazy annotation creates the controller only when first requested. This broke a cyclic bean dependency
// I do not know where it came from
public class AgencyController {
    private final AgencyController agencyController;

    public AgencyController(AgencyController agencyController){ this.agencyController = agencyController;}


}
