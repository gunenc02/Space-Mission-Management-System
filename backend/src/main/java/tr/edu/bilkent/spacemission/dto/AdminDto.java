package tr.edu.bilkent.spacemission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDto extends UserDto{

    private String name;
    private String userMail;
    private String userRole;
}
