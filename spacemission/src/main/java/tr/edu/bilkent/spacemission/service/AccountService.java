package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.dto.AgencyRegisterDto;
import tr.edu.bilkent.spacemission.repository.AccountRepository;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public void registerAgency(AgencyRegisterDto arDto){
        accountRepository.saveAgency(arDto);
    }
}
