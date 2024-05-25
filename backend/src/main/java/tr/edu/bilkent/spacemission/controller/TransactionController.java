package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.dto.TransactionDto;
import tr.edu.bilkent.spacemission.entity.Transaction;
import tr.edu.bilkent.spacemission.service.TransactionService;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/transaction")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("getByCompany/{companyId}")
    public List<TransactionDto> getTransactionsByCompany(@PathVariable long companyId) {
        ArrayList<TransactionDto> transactionDtos = new ArrayList<>();
        for (Transaction transaction : transactionService.getTransactionsByCompany(companyId)) {
            transactionDtos.add(convertEntityToDto(transaction));
        }
        return transactionDtos;
    }

    private TransactionDto convertEntityToDto(Transaction transaction) {
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setFromCompanyId(transaction.getFromCompanyId());
        transactionDto.setToCompanyId(transaction.getToCompanyId());
        transactionDto.setTransactionAmount(transaction.getTransactionAmount());
        transactionDto.setTransactionDate(transaction.getTransactionDate());
        return transactionDto;
    }

    private Transaction convertDtoToEntity(TransactionDto transactionDto) {
        Transaction transaction = new Transaction();
        transaction.setFromCompanyId(transactionDto.getFromCompanyId());
        transaction.setToCompanyId(transaction.getToCompanyId());
        transaction.setTransactionAmount(transactionDto.getTransactionAmount());
        transaction.setTransactionDate(transactionDto.getTransactionDate());
        return transaction;
    }
}
