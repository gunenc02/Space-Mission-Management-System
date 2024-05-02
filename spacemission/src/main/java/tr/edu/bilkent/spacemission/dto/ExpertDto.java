package tr.edu.bilkent.spacemission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpertDto extends UserDto {
    private long id;
    private String name;
    private String mail;
    private String companyName;
    private byte[] companyLogo;
    private long companyId;
}
