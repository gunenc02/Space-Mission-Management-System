package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tr.edu.bilkent.spacemission.service.AdminService;
import tr.edu.bilkent.spacemission.dto.AdminDto;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;


    public AdminController(AdminService adminService) {this.adminService = adminService;}

    @PostMapping
    public void confirmAgency(@PathVariable long id){
        this.adminService.confirmAgency(id);
    }

}
