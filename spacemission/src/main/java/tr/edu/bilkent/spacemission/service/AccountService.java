package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.dto.AgencyRegisterDto;
import tr.edu.bilkent.spacemission.dto.AstronautRegisterDto;
import tr.edu.bilkent.spacemission.dto.CompanyRegisterDto;
import tr.edu.bilkent.spacemission.repository.AccountRepository;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public void registerAgency(AgencyRegisterDto ardto){
        accountRepository.saveAgency(ardto);
    }

    public void registerAstronaut(AstronautRegisterDto ardto) {
        accountRepository.saveAstronaut(ardto);
    }

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

    public void alterAccount(String mail, String password) {
        accountRepository.alterAccount(mail, password);
    }
}
