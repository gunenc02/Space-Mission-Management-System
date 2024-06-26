package tr.edu.bilkent.spacemission.service;
import org.springframework.transaction.annotation.Transactional;


import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.dto.*;
import tr.edu.bilkent.spacemission.repository.AccountRepository;

import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Transactional
    public void registerAdmin(AdminRegisterDto ardto) {
        accountRepository.saveAdmin(ardto);
    }

    @Transactional
    public void registerAgency(AgencyRegisterDto ardto){
        accountRepository.saveAgency(ardto);
    }

    @Transactional
    public void registerAstronaut(AstronautRegisterDto ardto) {
        accountRepository.saveAstronaut(ardto);
    }

    @Transactional
    public void registerCompany(CompanyRegisterDto crdto) {
        accountRepository.saveCompany(crdto);
    }

    public void approveAgency(long agencyId) {
        accountRepository.approveAgency(agencyId);
    }

    public void approveAstronaut(long astronautId) {
        accountRepository.approveAstronaut(astronautId);
    }

    public void approveCompany(long companyId) {
        accountRepository.approveCompany(companyId);
    }

    public void alterUser(long userId, String mail, String password) {
        accountRepository.alterUser(userId, mail, password);
    }

    public void alterAgency(long agencyId, String username, byte[]image) {
        accountRepository.alterAgency(agencyId, username, image);
    }

    public void alterCompany(long companyId, String username, byte[] logo) {
        accountRepository.alterCompany(companyId, username, logo);
    }

    public void alterAstronaut(long astronautId, String username, byte[] logo) {
        accountRepository.alterAstronaut(astronautId, username, logo);
    }

    public UserDto getLoggedUser(String usermail, String password) {
        return accountRepository.getLoggedUser(usermail, password);
    }

    public void logout(Cookie idCookie, Cookie roleCookie){
    }



}
