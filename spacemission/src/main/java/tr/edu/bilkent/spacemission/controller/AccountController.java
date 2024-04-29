/**
 * In this controller, account related issiues will be handled such as registration, password changes etc
 */

package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tr.edu.bilkent.spacemission.dto.AdminRegisterDto;
import tr.edu.bilkent.spacemission.dto.AgencyRegisterDto;
import tr.edu.bilkent.spacemission.dto.AstronautRegisterDto;
import tr.edu.bilkent.spacemission.dto.CompanyRegisterDto;
import tr.edu.bilkent.spacemission.service.AccountService;

import java.io.IOException;
import java.util.Optional;

@CrossOrigin // This annotation is used to handle the request from a different origin
@RestController
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // THE FOLLOWING 4 METHOD IS REGISTRATION, NOT APPROVAL
    @PostMapping("/registerAdmin")
    public void registerAdmin(@RequestBody AdminRegisterDto ardto) {
        accountService.registerAdmin(ardto);
    }

    @PostMapping("/registerAgency")
    public void registerAgency(@RequestBody AgencyRegisterDto ardto) {
        accountService.registerAgency(ardto);
    }

    @PostMapping("/registerAstronaut")
    public void registerAstronaut(@RequestBody AstronautRegisterDto ardto) {
        accountService.registerAstronaut(ardto);
    }

    @PostMapping("/registerCompany")
    public void registerCompany(@RequestBody CompanyRegisterDto crdto) {
        accountService.registerCompany(crdto);
    }

    // THE FOLLOWING 4 METHOD IS FOR APPROVAL, NOT REGISTRATION
    @PutMapping("/approveAgency/{agencyId}")
    public void approveAgency(@PathVariable long agencyId) {
        accountService.approveAgency(agencyId);
    }

    @PutMapping("/approveAstronaut/{astronautId}")
    public void approveAstronaut(@PathVariable long astronautId) {
        accountService.approveAstronaut((astronautId));
    }

    @PutMapping("/approveCompany/{companyId}")
    public void approveCompany(@PathVariable long companyId) {
        accountService.approveCompany(companyId);
    }

    // THIS METHOD IS FOR CHANGING THE PROFILE
    @PutMapping("/alterUser/{userId}")
    public void alterUser(@PathVariable long userId, @RequestParam Optional<String> pmail, @RequestParam Optional<String> ppassword) {
        String mail = pmail.orElse(null);
        String password = ppassword.orElse(null);
        accountService.alterUser(userId, mail, password);
    }

    @PutMapping("/alterAgency/{agencyId}")
    public void alterAgency(@PathVariable long agencyId, @RequestParam Optional<String> pusername, @RequestParam("file") Optional<MultipartFile> file) {
        String username = pusername.orElse(null);
        byte[] logo;
        try {
            if (file.isPresent()) {
                logo = file.get().getBytes();
            } else {
                logo = null;
            }
            accountService.alterAgency(agencyId, username, logo);
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
    }

    @PutMapping("/alterCompany/{companyId}")
    public void alterCompany(@PathVariable long companyId, @RequestParam Optional<String> pusername, @RequestParam("file") Optional<MultipartFile> file) {
        String username = pusername.orElse(null);
        byte[] logo;
        try {
            if (file.isPresent()) {
                logo = file.get().getBytes();
            } else {
                logo = null;
            }
            accountService.alterCompany(companyId, username, logo);
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
    }

    @PutMapping("/alterAstronaut/{astronautId}")
    public void alterAstronaut(@PathVariable long astronautId, @RequestParam Optional<String> pusername, @RequestParam("file") Optional<MultipartFile> file) {
        String username = pusername.orElse(null);
        byte[] logo;
        try {
            if (file.isPresent()) {
                logo = file.get().getBytes();
            } else {
                logo = null;
            }
            accountService.alterAstronaut(astronautId, username, logo);
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
    }
}
