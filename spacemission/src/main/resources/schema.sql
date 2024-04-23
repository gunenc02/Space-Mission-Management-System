CREATE TABLE IF NOT EXISTS user (
     user_id INT AUTO_INCREMENT PRIMARY KEY,
     user_mail VARCHAR(255) NOT NULL UNIQUE,
     user_password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS admin (
     admin_id INT PRIMARY KEY,
     admin_name VARCHAR(255) NOT NULL,
     is_approved BOOLEAN NOT NULL DEFAULT FALSE,
     FOREIGN KEY (admin_id) REFERENCES user(user_id)
         ON DELETE CASCADE
         ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS agency (
     agency_id INT PRIMARY KEY,
     agency_name VARCHAR(255) NOT NULL,
     agency_logo BLOB,
     is_approved BOOLEAN NOT NULL DEFAULT FALSE,
     FOREIGN KEY (agency_id) REFERENCES user(user_id)
         ON DELETE CASCADE
         ON UPDATE CASCADE
);

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
    );

CREATE TABLE IF NOT EXISTS astronaut (
     astronaut_id INT PRIMARY KEY,
     astronaut_name VARCHAR(255) NOT NULL,
     astronaut_image BLOB,
     date_of_birth DATE NOT NULL,
     status BOOLEAN NOT NULL DEFAULT FALSE,
     country VARCHAR(255) NOT NULL,
     salary DOUBLE NOT NULL DEFAULT 0,
     is_approved BOOLEAN NOT NULL DEFAULT FALSE,
     FOREIGN KEY (astronaut_id) REFERENCES user(user_id)
         ON DELETE CASCADE
         ON UPDATE CASCADE

);

CREATE TABLE IF NOT EXISTS health_record (
     health_record_id INT AUTO_INCREMENT PRIMARY KEY,
     date DATE NOT NULL,
     availibility_for_mission BINARY NOT NULL,
     weight DOUBLE NOT NULL,
     height DOUBLE NOT NULL,
     heart_rate INT NOT NULL,
     blood_pressure VARCHAR(255) NOT NULL,
     vaccinations TEXT NOT NULL,
     astronaut_id INT NOT NULL,
     FOREIGN KEY(astronaut_id) REFERENCES astronaut(astronaut_id)
         ON DELETE CASCADE
         ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS platform (
     platform_id INT AUTO_INCREMENT PRIMARY KEY,
     model_name VARCHAR(255) NOT NULL,
     production_year YEAR NOT NULL,
     platform_image BLOB,
     cost_per_launch DOUBLE NOT NULL
);

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
     FOREIGN KEY(platform_id) REFERENCES platform(platform_id),
     FOREIGN KEY(creator_id) REFERENCES company(company_id)
         ON DELETE CASCADE
         ON UPDATE CASCADE,
     FOREIGN KEY(performer_id) REFERENCES company(company_id)
         ON DELETE CASCADE
         ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS space_mission_performings (
     perform_id INT AUTO_INCREMENT PRIMARY KEY,
     perform_status TEXT NOT NULL,
     space_mission_id INT NOT NULL,
     astronaut_id INT NOT NULL,
     performer_company_id INT NOT NULL,
     FOREIGN KEY (space_mission_id) REFERENCES space_mission(mission_id),
     /*FOREIGN KEY (astronaut_id) REFERENCES astronaut(astronaut_id),*/
     FOREIGN KEY (performer_company_id) REFERENCES company(company_id)
         ON DELETE CASCADE
         ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS transaction (
     transaction_id INT PRIMARY KEY,
     fromcompany_id INT NOT NULL,
     tocompany_id INT NOT NULL,
     transaction_amount DOUBLE NOT NULL,
     FOREIGN KEY(fromcompany_id) REFERENCES company(company_id),
     FOREIGN KEY(tocompany_id) REFERENCES company(company_id)
);

CREATE TABLE IF NOT EXISTS expert (
     expert_id INT PRIMARY KEY,
     expert_name VARCHAR(255) NOT NULL,
     expert_company INT,
     FOREIGN KEY (expert_id) REFERENCES user(user_id),
     FOREIGN KEY (expert_company) REFERENCES company(company_id)
);

CREATE TABLE IF NOT EXISTS expert_examine_astronaut (
     examine_id INT AUTO_INCREMENT PRIMARY KEY,
     expert_id INT NOT NULL,
     astronaut_id INT NOT NULL,
     FOREIGN KEY (expert_id) REFERENCES expert(expert_id),
     FOREIGN KEY (astronaut_id) REFERENCES astronaut(astronaut_id)
);

-- BUNA GEREK YOK, ONE TO MANY OLMALI. HEALTH_RECORD'DA ZATEN ASTRONAUT ID VAR
CREATE TABLE IF NOT EXISTS astronaut_health_record (
     id INT AUTO_INCREMENT PRIMARY KEY,
     astronaut_id INT NOT NULL,
     health_record_id INT NOT NULL,
     FOREIGN KEY (astronaut_id) REFERENCES astronaut(astronaut_id),
     FOREIGN KEY (health_record_id) REFERENCES health_record(health_record_id)
);

CREATE TABLE IF NOT EXISTS agency_evaluate_astronaut (
     id INT AUTO_INCREMENT PRIMARY KEY,
     astronaut_id INT NOT NULL,
     agency_id INT NOT NULL,
     FOREIGN KEY (astronaut_id) REFERENCES astronaut(astronaut_id),
     FOREIGN KEY (agency_id) REFERENCES agency(agency_id)
);

CREATE TABLE IF NOT EXISTS agency_approve_space_mission (
     id INT PRIMARY KEY,
     space_mission_id INT NOT NULL,
     agency_id INT NOT NULL,
     FOREIGN KEY (space_mission_id) REFERENCES space_mission(mission_id),
     FOREIGN KEY (agency_id) REFERENCES agency(agency_id)
);

CREATE TABLE IF NOT EXISTS bid (
     bid_id INT PRIMARY KEY,
     price INT NOT NULL,
     offer_date DATE NOT NULL,
     deadline DATE NOT NULL,
     requests VARCHAR(2555),
     offerer_id INT NOT NULL,
     receiver_id INT NOT NULL,
     FOREIGN KEY (offerer_id) REFERENCES company(company_id),
     FOREIGN KEY (receiver_id) REFERENCES company(company_id)
);