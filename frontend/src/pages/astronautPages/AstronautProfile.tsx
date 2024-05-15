import { Link } from 'react-router-dom';
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";

export default function AstronautProfile() {
    const spaceMissions = [
        { id: 1, name: 'YAKBE-2024, SpaceY' }
    ];

    const healthRecords = [
        { id: 1, date: '25.03.2024', doctor: 'Dr. OZ' },
        { id: 2, date: '25.03.2024', doctor: 'Dr. OZ' }
    ];

    return (
        <div className="outer">
            <Header />
            <Navbar />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-image">
                        <img src="astronaut-image.png" alt="Astronaut" style={{ width: '150px', height: '150px' }} />
                    </div>
                    <div className="profile-info">
                        <h1>Bahadır Günenç</h1>
                        <p>Country: Türkiye</p>
                        <p>Date of Birth: 01.01.1700</p>
                        <p>Status: On Mission</p>
                    </div>
                </div>
                <div className="profile-details">
                    <div className="missions-section">
                        <h2>Space Missions</h2>
                        {spaceMissions.map(mission => (
                            <Link to="/missions" key={mission.id} className="mission-entry">
                                {mission.name}
                            </Link>
                        ))}
                    </div>
                    <div className="health-section">
                        <h2>Health Records</h2>
                        {healthRecords.map(record => (
                            <Link to={`/health-records/${record.id}`} key={record.id} className="health-record">
                                {record.date}, {record.doctor}
                            </Link>
                        ))}
                    </div>
                </div>
                <style>{`
                    .profile-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 20px;
                        max-width: 800px;
                        margin: auto;
                    }
                    .profile-header {
                        display: flex;
                        justify-content: space-around;
                        width: 100%;
                        margin-bottom: 20px;
                    }
                    .profile-info {
                        margin-left: 20px;
                    }
                    .profile-details {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                    }
                    .missions-section, .health-section {
                        flex: 1;
                        padding: 10px;
                        margin: 5px;
                        background: #f0f0f0;
                        border: 1px solid #ccc;
                    }
                    .mission-entry, .health-record {
                        padding: 8px;
                        margin: 5px 0;
                        background: white;
                        border: 1px solid #ddd;
                        display: block; /* Make the link fill the container */
                        text-decoration: none; /* Remove the default link decoration */
                        color: black; /* Set a neutral color for the text */
                    }
                `}</style>
            </div>
        </div>
    );
}
