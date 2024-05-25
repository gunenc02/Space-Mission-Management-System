package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.service.AdminService;
import tr.edu.bilkent.spacemission.dto.AdminDto;

@CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;


    public AdminController(AdminService adminService) {this.adminService = adminService;}

    @PostMapping("/confirm/{id}")
    public void confirmAgency(@PathVariable long id){
        this.adminService.confirmAgency(id);
    }

}
