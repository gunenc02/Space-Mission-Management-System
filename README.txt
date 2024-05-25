# Space Mission Management System

## Overview
The Space Mission Management System is a web application developed as part of the CS353 course at Bilkent University. This system aims to streamline the management of space missions by providing a unified platform for all stakeholders involved in space exploration. Our application supports a variety of users, including companies, astronauts, experts, space agencies, and administrators, each with specific functionalities tailored to their needs.

Companies can create and manage space missions, invite astronauts, submit bids for missions, and add new platforms. Astronauts can browse available missions, send join requests, update their profiles, and view their health records and past missions. Experts are responsible for creating and updating health records for astronauts, ensuring they are fit for their missions. Space agencies oversee and approve space missions and astronauts to ensure compliance with regulations. Administrators have the authority to manage users, missions, platforms, and other entities to ensure the smooth operation of the system.

## Technologies Used
- **Frontend**: TypeScript, React
- **Backend**: Java, Spring Boot
- **Database**: MySQL

## Getting Started

### Prerequisites
- Java 11 or higher
- MySQL
- Node.js
- npm (or yarn)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gunenc02/Space-Mission-Management-System.git
   cd Space-Mission-Management-System
   ```
   
2. **Backend Setup**

    Navigate to the backend directory
   ```bash
   cd backend
   ```





    Update the `backend/src/main/resources/application.properties` file with your MySQL database credentials.

    Build and run the Spring Boot application
    ```bash
       ./mvnw spring-boot:run
   ```

3. **Frontend Setup**

    Navigate to the frontend directory

    ```bash
    cd frontend
    ```

    Install dependencies and start the React application
    
    ```bash
    npm install
    npm start
    ```

### Contribution

**Team Members**

- Ahmet Reşat Demir
- Bahadır Günenc
- Emir Tuğlu
- Kanan Zeynalov
- Musa Yiğit Yayla

