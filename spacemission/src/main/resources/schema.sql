CREATE TABLE admin (
                      admin_id INT AUTO_INCREMENT PRIMARY KEY,
                      admin_name VARCHAR(255) NOT NULL,
                      admin_mail VARCHAR(255) NOT NULL,
                      admin_password VARCHAR(255) NOT NULL
);


CREATE TABLE agency(
                      agency_id INT AUTO_INCREMENT PRIMARY KEY,
                      agency_name VARCHAR(255) NOT NULL,
                      agency_mail VARCHAR(255) NOT NULL,
                      agency_password VARCHAR(255) NOT NULL
);

CREATE TABLE spacemission(
                        mission_id INT AUTO_INCREMENT PRIMARY KEY,
                        mission_name VARCHAR(255) NOT NULL,
                        mission_budget INT NOT NULL,
                        mission_creation_date DATE NOT NULL,
                        mission_perform_date DATE NOT NULL
);

CREATE TABLE platform(
                        platform_id INT AUTO_INCREMENT PRIMARY KEY,
                        platform_model_name VARCHAR(255) NOT NULL,
                        platform_production_year INT NOT NULL,
                        platform_cost_per_launch INT
);

CREATE TABLE astronaut(
                        astronaut_id INT AUTO_INCREMENT PRIMARY KEY,
                        astronaut_name VARCHAR(255) NOT NULL,
                        astronaut_mail VARCHAR(255) NOT NULL,
                        astronaut_password VARCHAR(255) NOT NULL,
                        astronaut_age VARCHAR(255) NOT NULL,
                        astronaut_birthdate DATE NOT NULL,
                        astronaut_country VARCHAR(255) NOT NULL,
                        astronaut_salary INT NOT NULL
);

CREATE TABLE health_record(
                        health_record_id INT AUTO_INCREMENT PRIMARY KEY,
                        health_record_date DATE NOT NULL,
                        health_record_available TINYINT(1) NOT NULL,
                        health_record_weight VARCHAR(255) NOT NULL,
                        health_record_height VARCHAR(255) NOT NULL,
                        health_record_heart_rate VARCHAR(255) NOT NULL,
                        health_record_blood_pressure VARCHAR(255) NOT NULL
);

CREATE TABLE transaction(
                        transaction_id INT AUTO_INCREMENT PRIMARY KEY,
                        transaction_date DATE NOT NULL,
                        transaction_amount INT NOT NULL,
                        transaction_toCompany INT NOT NULL,
                        transaction_fromCompany INT NOT NULL
);

CREATE TABLE company(
                        company_id INT AUTO_INCREMENT PRIMARY KEY,
                        company_name VARCHAR(255) NOT NULL,
                        company_mail VARCHAR(255) NOT NULL,
                        company_password VARCHAR(255) NOT NULL,
                        company_country VARCHAR(255) NOT NULL,
                        company_budget INT NOT NULL,
                        company_type VARCHAR(255) NOT NULL

);

CREATE TABLE expert(
                        expert_id INT AUTO_INCREMENT PRIMARY KEY,
                        expert_name VARCHAR(255) NOT NULL,
                        expert_mail VARCHAR(255) NOT NULL,
                        expert_password VARCHAR(255) NOT NULL
);


ALTER TABLE transaction
    ADD FOREIGN KEY (transaction_toCompany) REFERENCES company(company_id),
    ADD FOREIGN KEY (transaction_fromCompany) REFERENCES company(company_id);