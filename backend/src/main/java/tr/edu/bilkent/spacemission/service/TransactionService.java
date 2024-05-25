package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.entity.Transaction;
import tr.edu.bilkent.spacemission.repository.TransactionRepository;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getTransactionsByCompany(long companyId) {
        return transactionRepository.getTransactionsByCompany(companyId);
    }
}
