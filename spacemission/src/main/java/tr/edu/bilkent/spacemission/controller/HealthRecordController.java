package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.dto.HealthRecordDto;
import tr.edu.bilkent.spacemission.entity.HealthRecord;
import tr.edu.bilkent.spacemission.service.HealthRecordService;

@RestController
@RequestMapping("/healthRecord")
public class HealthRecordController {
    private final HealthRecordService healthRecordService;

    public HealthRecordController(HealthRecordService healthRecordService) {
        this.healthRecordService = healthRecordService;
    }

    @GetMapping("/{id}")
    public HealthRecordDto getHealthRecordById (@PathVariable long id) {
        HealthRecord healthRecord = healthRecordService.getHealthRecordById(id);
        return convertEntityToDto(healthRecord);
    }

    @PostMapping("/create")
    public void createHealthRecord(@RequestBody HealthRecordDto healthRecordDto) {
        HealthRecord healthRecord = convertDtoToEntity(healthRecordDto);
        healthRecordService.createHealthRecord(healthRecord);
    }

    public HealthRecord convertDtoToEntity(HealthRecordDto healthRecordDto) {
        HealthRecord healthRecord = new HealthRecord();
        healthRecord.setId(healthRecordDto.getId());
        healthRecord.setAstronautId(healthRecordDto.getAstronautId());
        healthRecord.setDate(healthRecordDto.getDate());
        healthRecord.setAvailabilityForMission(healthRecordDto.isAvailabilityForMission());
        healthRecord.setWeight(healthRecordDto.getWeight());
        healthRecord.setHeight(healthRecordDto.getHeight());
        healthRecord.setHeartRate(healthRecordDto.getHeartRate());
        healthRecord.setBloodPressure(healthRecordDto.getBloodPressure());
        healthRecord.setVaccinations(healthRecordDto.getVaccinations());
        healthRecord.setNotes(healthRecordDto.getNotes());
        return healthRecord;
    }

    public HealthRecordDto convertEntityToDto(HealthRecord healthRecord) {
        HealthRecordDto healthRecordDto = new HealthRecordDto();
        healthRecordDto.setId(healthRecord.getId());
        healthRecordDto.setAstronautId(healthRecord.getAstronautId());
        healthRecordDto.setDate(healthRecord.getDate());
        healthRecordDto.setAvailabilityForMission(healthRecord.isAvailabilityForMission());
        healthRecordDto.setWeight(healthRecord.getWeight());
        healthRecordDto.setHeight(healthRecord.getHeight());
        healthRecordDto.setHeartRate(healthRecord.getHeartRate());
        healthRecordDto.setBloodPressure(healthRecord.getBloodPressure());
        healthRecordDto.setVaccinations(healthRecord.getVaccinations());
        healthRecordDto.setNotes(healthRecord.getNotes());
        return healthRecordDto;
    }
}
