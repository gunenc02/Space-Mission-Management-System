CREATE TABLE IF NOT EXISTS user (
     user_id INT AUTO_INCREMENT PRIMARY KEY,
     user_mail VARCHAR(255) NOT NULL UNIQUE,
     user_password VARCHAR(255) NOT NULL,
     user_role VARCHAR(255) NOT NULL
) ^;

CREATE TABLE IF NOT EXISTS admin (
     admin_id INT PRIMARY KEY,
     admin_name VARCHAR(255) NOT NULL,
     is_approved BOOLEAN NOT NULL DEFAULT FALSE,
     FOREIGN KEY (admin_id) REFERENCES user(user_id)
         ON DELETE CASCADE
         ON UPDATE CASCADE
) ^;

CREATE TABLE IF NOT EXISTS agency (
     agency_id INT PRIMARY KEY,
     agency_name VARCHAR(255) NOT NULL,
     agency_logo BLOB,
     is_approved BOOLEAN NOT NULL DEFAULT FALSE,
     FOREIGN KEY (agency_id) REFERENCES user(user_id)
         ON DELETE CASCADE
         ON UPDATE CASCADE
) ^;

CREATE TABLE IF NOT EXISTS company (
     company_id INT PRIMARY KEY,
     company_name VARCHAR(255) NOT NULL,
     company_logo BLOB,
     worker_count INT NOT NULL DEFAULT 0,
     country VARCHAR(255) NOT NULL,
     money DOUBLE NOT NULL,
     is_approved BOOLEAN NOT NULL DEFAULT FALSE,
     FOREIGN KEY (company_id) REFERENCES user(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    ) ^;

CREATE TABLE IF NOT EXISTS astronaut (
     astronaut_id INT PRIMARY KEY,
     astronaut_name VARCHAR(255) NOT NULL,
     astronaut_image BLOB,
     date_of_birth DATE NOT NULL,
     on_duty BOOLEAN NOT NULL DEFAULT FALSE,
     country VARCHAR(255) NOT NULL,
     salary DOUBLE NOT NULL DEFAULT 0,
     FOREIGN KEY (astronaut_id) REFERENCES user(user_id)
         ON DELETE CASCADE
         ON UPDATE CASCADE

) ^;

CREATE TABLE IF NOT EXISTS expert (
     expert_id INT PRIMARY KEY,
     expert_name VARCHAR(255) UNIQUE,
     expert_company INT,
     FOREIGN KEY (expert_id) REFERENCES user(user_id),
     FOREIGN KEY (expert_company) REFERENCES company(company_id)
) ^;

CREATE TABLE IF NOT EXISTS health_record (
     health_record_id INT AUTO_INCREMENT PRIMARY KEY,
     date DATE NOT NULL,
     availibility_for_mission BOOLEAN NOT NULL,
     weight DOUBLE NOT NULL,
     height DOUBLE NOT NULL,
     heart_rate INT NOT NULL,
     blood_pressure VARCHAR(255) NOT NULL,
     vaccinations TEXT NOT NULL,
     astronaut_id INT NOT NULL,
     expert_id INT NOT NULL,
     notes TEXT,
     FOREIGN KEY(astronaut_id) REFERENCES astronaut(astronaut_id)
         ON DELETE CASCADE
         ON UPDATE CASCADE,
     FOREIGN KEY(expert_id) REFERENCES expert(expert_id)
) ^;

CREATE TABLE IF NOT EXISTS platform (
     platform_id INT AUTO_INCREMENT PRIMARY KEY,
     platform_name VARCHAR(255) NOT NULL,
     production_year YEAR NOT NULL,
     platform_image BLOB,
     cost_per_launch DOUBLE NOT NULL
) ^;

CREATE TABLE IF NOT EXISTS space_mission (
     mission_id INT AUTO_INCREMENT PRIMARY KEY,
     mission_name VARCHAR(255) NOT NULL,
     mission_image BLOB,
     objective TEXT NOT NULL,
     budget DOUBLE NOT NULL,
     create_date DATE NOT NULL,
     perform_date DATE,
     platform_id INT,
     creator_id INT NOT NULL,
     performer_id INT,
     perform_status VARCHAR(10) NOT NULL CHECK (perform_status = 'pending' OR perform_status = 'performed'),
     FOREIGN KEY(platform_id) REFERENCES platform(platform_id),
     FOREIGN KEY(creator_id) REFERENCES company(company_id)
         ON DELETE CASCADE
         ON UPDATE CASCADE,
     FOREIGN KEY(performer_id) REFERENCES company(company_id)
         ON DELETE CASCADE
         ON UPDATE CASCADE
) ^;


CREATE TABLE IF NOT EXISTS mission_astronaut_recordings (
    mission_id INT,
    astronaut_id INT,
    FOREIGN KEY(mission_id) REFERENCES space_mission(mission_id),
    FOREIGN KEY(astronaut_id) REFERENCES astronaut(astronaut_id),
    PRIMARY KEY(mission_id, astronaut_id)
) ^;

CREATE TABLE IF NOT EXISTS transaction (
     transaction_id INT AUTO_INCREMENT PRIMARY KEY,
     fromcompany_id INT NOT NULL,
     tocompany_id INT NOT NULL,
     transaction_amount DOUBLE NOT NULL,
     FOREIGN KEY(fromcompany_id) REFERENCES company(company_id),
     FOREIGN KEY(tocompany_id) REFERENCES company(company_id)
) ^;



CREATE TABLE IF NOT EXISTS agency_approve_astronaut (
     id INT AUTO_INCREMENT PRIMARY KEY,
     astronaut_id INT NOT NULL,
     agency_id INT NOT NULL,
     FOREIGN KEY (astronaut_id) REFERENCES astronaut(astronaut_id),
     FOREIGN KEY (agency_id) REFERENCES agency(agency_id)
) ^;

CREATE TABLE IF NOT EXISTS agency_approve_space_mission (
     id INT AUTO_INCREMENT PRIMARY KEY,
     space_mission_id INT NOT NULL,
     agency_id INT NOT NULL,
     FOREIGN KEY (space_mission_id) REFERENCES space_mission(mission_id),
     FOREIGN KEY (agency_id) REFERENCES agency(agency_id)
) ^;

CREATE TABLE IF NOT EXISTS bid (
     bid_id INT AUTO_INCREMENT PRIMARY KEY,
     price INT NOT NULL,
     offer_date DATE NOT NULL,
     deadline DATE NOT NULL,
     description VARCHAR(2555),
     status TEXT NOT NULL CHECK (status = 'approved' OR status = 'rejected' OR status = 'pending'),
     offerer_id INT NOT NULL,
     receiver_id INT NOT NULL,
     mission_id INT NOT NULL,
     FOREIGN KEY (offerer_id) REFERENCES company(company_id),
     FOREIGN KEY (receiver_id) REFERENCES company(company_id),
     FOREIGN KEY (mission_id) REFERENCES space_mission(mission_id)
) ^;

CREATE OR REPLACE VIEW company_mission_info AS
SELECT comp.company_name,
       comp.worker_count,
       miss.mission_name,
       miss.objective,
       a.astronaut_name
FROM company AS comp JOIN space_mission AS miss ON (comp.company_id = miss.creator_id)
                     LEFT OUTER JOIN mission_astronaut_recordings
    AS mar ON (miss.mission_id = mar.mission_id) JOIN astronaut a ON (mar.astronaut_id = a.astronaut_id) ^;

CREATE OR REPLACE VIEW platform_availability AS
SELECT platform.platform_id, (SELECT COUNT(*) FROM space_mission WHERE platform_id = platform.platform_id
                                                                   AND space_mission.perform_status = 'pending')
FROM platform ^;


DROP TRIGGER IF EXISTS release_astronaut ^;
CREATE TRIGGER release_astronaut
    AFTER UPDATE ON space_mission
    FOR EACH ROW
BEGIN
    IF (OLD.perform_status = 'pending' AND NEW.perform_status = 'performed') THEN

        UPDATE astronaut
        SET on_duty = FALSE
        WHERE astronaut.astronaut_id IN (SELECT astronaut_id
                                         FROM mission_astronaut_recordings
                                         WHERE mission_id = OLD.mission_id);
    END IF;
END ^;

DROP TRIGGER IF EXISTS delete_experts ^;
CREATE TRIGGER delete_experts
    BEFORE DELETE ON company
    FOR EACH ROW
BEGIN
    DELETE FROM expert
    WHERE expert_company = OLD.company_id;
END ^;


/*
DROP TRIGGER IF EXISTS check_agency_mail_insert^;
CREATE TRIGGER check_agency_mail_insert
    BEFORE INSERT ON agency
    FOR EACH ROW
BEGIN
    DECLARE user_mail VARCHAR(255);
    SELECT user.user_mail INTO user_mail FROM user WHERE user_id = NEW.agency_id;
    IF (user_mail <> NEW.agency_mail) THEN
       SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Check failed. There exists no such agency mail in the user table';
    END IF;
END ^;

DROP TRIGGER IF EXISTS check_company_mail_insert^;
CREATE TRIGGER check_company_mail_insert
    BEFORE INSERT ON company
    FOR EACH ROW
BEGIN
    DECLARE company_mail VARCHAR(255);
    SELECT company.company_mail INTO company_mail FROM company WHERE company_id = NEW.company_id;
    IF(company_mail <> NEW.company_mail) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Check failed. There exists no such company mail in the user table';
    END IF;
END ^;

DROP TRIGGER IF EXISTS check_expert_mail_insert^;
CREATE TRIGGER check_expert_mail_insert
    BEFORE INSERT ON expert
    FOR EACH ROW
BEGIN
    DECLARE expert_mail VARCHAR(255);
    SELECT expert.expert_mail INTO expert_mail FROM expert WHERE expert_id = NEW.expert_id;
    IF(expert_mail <> NEW.expert_mail) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Check failed. There exists no such expert mail in the user table';
    END IF;
END ^;
*/
