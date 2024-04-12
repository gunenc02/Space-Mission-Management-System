/**
 * In this controller, account related issiues will be handled such as registration, password changes etc
 *
 */

package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.dto.AgencyRegisterDto;
import tr.edu.bilkent.spacemission.dto.AstronautRegisterDto;
import tr.edu.bilkent.spacemission.dto.CompanyRegisterDto;
import tr.edu.bilkent.spacemission.service.AccountService;

@RestController
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // THE FOLLOWING 3 METHOD IS REGISTRATION, NOT APPROVAL
    @PostMapping("/registerAgency")
    public void registerAgency(@RequestBody AgencyRegisterDto ardto){
        accountService.registerAgency(ardto);
    }

    @PostMapping("/registerAstronaut")
    public void registerAstronaut(@RequestBody AstronautRegisterDto ardto){
        accountService.registerAstronaut(ardto);
    }

    @PostMapping("/registerCompany")
    public void registerCompany(@RequestBody CompanyRegisterDto crdto){
        accountService.registerCompany(crdto);
    }

    // THE FOLLOWING 3 METHOD IS FOR APPROVAL, NOT REGISTRATION

    @PostMapping("/approveAgency")
    public void approveAgency(@RequestParam long agencyId){
        accountService.approveAgency(agencyId);
    }

    @PostMapping("/approveAstronaut")
    public void approveAstronaut(@RequestParam long astronautId){
        accountService.approveAstronaut((astronautId));
    }

    @PostMapping("/approveAstronaut")
    public void approveCompany(@RequestParam long companyId){
        accountService.approveCompany(companyId);
    }

    // THIS METHOD IS FOR CHANGING THE PROFILE

    @PutMapping("/alterAccount")
    public void alterAccount(@RequestParam String mail, @RequestParam String password){
        accountService.alterAccount(mail, password);
    }
}
