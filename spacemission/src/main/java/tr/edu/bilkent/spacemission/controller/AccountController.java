/**
 * In this controller, account related issiues will be handled such as registration, password changes etc
 *
 */

package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tr.edu.bilkent.spacemission.dto.AgencyRegisterDto;
import tr.edu.bilkent.spacemission.service.AccountService;

@RestController
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/registerAgency")
    public void registerAgency(@RequestBody AgencyRegisterDto ardto){
        accountService.registerAgency(ardto);
    }
}
