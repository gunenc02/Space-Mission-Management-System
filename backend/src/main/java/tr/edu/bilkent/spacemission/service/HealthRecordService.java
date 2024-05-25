package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.entity.HealthRecord;
import tr.edu.bilkent.spacemission.repository.HealthRecordRepository;

@Service
public class HealthRecordService {
    private final HealthRecordRepository healthRecordRepository;

    public HealthRecordService(HealthRecordRepository healthRecordRepository) {
        this.healthRecordRepository = healthRecordRepository;
    }

    public HealthRecord getHealthRecordById(long id) {
        return healthRecordRepository.getHealthRecordById(id);
    }

    public void createHealthRecord(HealthRecord healthRecord) {
        healthRecordRepository.createHealthRecord(healthRecord);
    }
}
