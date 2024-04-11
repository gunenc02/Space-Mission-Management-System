package tr.edu.bilkent.spacemission.repository;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import tr.edu.bilkent.spacemission.dto.AstronautDto;
import tr.edu.bilkent.spacemission.model.AstronautModel;
import tr.edu.bilkent.spacemission.dto.Login;

//Usage of this class is for executing queries relevant to astronaut entity
@Repository
public class AstronautRepository {
}
