package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.entity.Platform;
import tr.edu.bilkent.spacemission.repository.PlatformRepository;

import java.util.List;

@Service
public class PlatformService {
    private final PlatformRepository platformRepository;

    public PlatformService(PlatformRepository platformRepository) {
        this.platformRepository = platformRepository;
    }

    public List<Platform> getPlatforms() {
        return platformRepository.getPlatforms();
    }

    public Platform getPlatform(long id) {
        return platformRepository.getPlatform(id);
    }

    public void createPlatform(Platform platform) {
        platformRepository.createPlatform(platform);
    }

    public void updatePlatform(Platform platform) {
        platformRepository.updatePlatform(platform);
    }

    public void deletePlatform(long id) {
        platformRepository.deletePlatform(id);
    }

    public List<Platform> getFilteredPlatforms(Integer minYear, Integer maxYear, Double minCost, Double maxCost) {
        try {
            return platformRepository.filterPlatforms(minYear, maxYear, minCost, maxCost);
        } catch (IllegalArgumentException e) {
            // Handle the exception, e.g., log it or convert it to a user-friendly message
            throw new RuntimeException("Failed to filter platforms: " + e.getMessage());
        }
    }
}
