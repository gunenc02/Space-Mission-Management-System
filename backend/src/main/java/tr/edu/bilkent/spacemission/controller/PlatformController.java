package tr.edu.bilkent.spacemission.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.dto.PlatformDto;
import tr.edu.bilkent.spacemission.entity.Platform;
import tr.edu.bilkent.spacemission.service.PlatformService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/platform")
public class PlatformController {
    private final PlatformService platformService;

    public PlatformController(PlatformService platformService) {
        this.platformService = platformService;
    }

    @GetMapping("/list")
    public List<Platform> getPlatforms() {
        return platformService.getPlatforms();
    }

    @GetMapping("{id}")
    public Platform getPlatforms(@PathVariable long id) {
        return platformService.getPlatform(id);
    }

    @PostMapping("/create")
    public void createPlatform(@RequestBody PlatformDto platformDto) {
        Platform platform = convertDtoToEntity(platformDto);
        platformService.createPlatform(platform);
    }

    @PutMapping("/update")
    public void updatePlatform(@RequestBody PlatformDto platformDto) {
        Platform platform = convertDtoToEntity(platformDto);
        platformService.updatePlatform(platform);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePlatform(@PathVariable long id) {
        platformService.deletePlatform(id);
    }

    private Platform convertDtoToEntity(PlatformDto platformDto) {
        Platform platform = new Platform();
        platform.setId(platformDto.getId());
        platform.setPlatformName(platformDto.getPlatformName());
        platform.setProductionYear(platformDto.getProductionYear());
        platform.setImage(platformDto.getImage());
        platform.setCostPerLaunch(platformDto.getCostPerLaunch());
        return platform;
    }

    private PlatformDto convertEntityToDto(Platform platform) {
        PlatformDto platformDto = new PlatformDto();
        platformDto.setId(platform.getId());
        platformDto.setPlatformName(platform.getPlatformName());
        platformDto.setProductionYear(platform.getProductionYear());
        platformDto.setImage(platform.getImage());
        platformDto.setCostPerLaunch(platform.getCostPerLaunch());
        return platformDto;
    }

    @GetMapping("/filtered")
    public ResponseEntity<?> getFilteredPlatforms(
            @RequestParam(required = false) Integer minYear,
            @RequestParam(required = false) Integer maxYear,
            @RequestParam(required = false) Double minCost,
            @RequestParam(required = false) Double maxCost) {
        try {
            List<Platform> platforms = platformService.getFilteredPlatforms(minYear, maxYear, minCost, maxCost);
            return ResponseEntity.ok(platforms);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error while fetching platforms: " + e.getMessage());
        }
    }
}
