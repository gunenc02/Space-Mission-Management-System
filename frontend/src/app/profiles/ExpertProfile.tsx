import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getExpertById, getHealthRecordsByExpertId } from "../../calling/expertCaller";
import { Expert, HealthRecordForListing } from "../../data-types/entities";
import Header from "../../components/Header.tsx";
import Navbar from "../../components/Navbar.tsx";
import HealthRecordDetails from "../modals/HealthRecordDetails";

export default function ExpertProfile() {
    const { id } = useParams<{ id?: string }>();
    const [expertInfo, setExpertInfo] = useState<Expert | null>(null);
    const [healthRecords, setHealthRecords] = useState<HealthRecordForListing[] | null>(null);
    const [error, setError] = useState('');
    const [openRecordId, setOpenRecordId] = useState<number | null>(null);

    useEffect(() => {
        if (!id) {
            setError("Expert ID is missing");
            return;
        }

        const numericExpertId = parseInt(id, 10);
        if (isNaN(numericExpertId)) {
            setError("Invalid Expert ID");
            return;
        }

        const token = ""; // Assuming token management
        const user = { token };

        getExpertById(numericExpertId, user)
            .then(data => {
                setExpertInfo(data);
                return getHealthRecordsByExpertId(numericExpertId, user);
            })
            .then(recordsData => {
                if (!Array.isArray(recordsData)) {
                    throw new Error("Received data is not an array");
                }
                const recordsWithDates = recordsData.map((record: HealthRecordForListing) => ({
                    ...record,
                    date: new Date(record.date)
                }));
                setHealthRecords(recordsWithDates);
                setError('');
            })
            .catch(err => {
                setError(err.message);
                setExpertInfo(null);
                setHealthRecords(null);
                console.error("API error:", err);
            });
    }, [id]);

    const toggleRecordDetails = (recordId: number) => {
        setOpenRecordId(openRecordId === recordId ? null : recordId);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!expertInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="outer">
            <Header />
            <Navbar />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-image">
                        <img src={expertInfo.companyLogo} alt={`${expertInfo.companyName} logo`} style={{ width: '100px' }} />
                    </div>
                    <div className="profile-info">
                        <h1>{expertInfo.name}</h1>
                        <p>Email: {expertInfo.userMail}</p>
                        <p>Role: {expertInfo.userRole}</p>
                        <p>Company: {expertInfo.companyName}</p>
                    </div>
                </div>
                <div className="profile-details">
                    <div className="health-section">
                        <h2>Health Records</h2>
                        {healthRecords ? (
                            <ul>
                                {healthRecords.map(record => (
                                    <li key={record.id}>
                                        <p>Date: {record.date.toLocaleDateString()}</p>
                                        <p>Astronaut: {record.astronautName}</p>
                                        <p>Notes: {record.notes}</p>
                                        <button onClick={() => toggleRecordDetails(record.id)}>
                                            {openRecordId === record.id ? "Hide Details" : "View Details"}
                                        </button>
                                        {openRecordId === record.id && (
                                            <HealthRecordDetails
                                                healthRecord={record}
                                                onClose={() => setOpenRecordId(null)}
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>Loading health records...</div>
                        )}
                    </div>
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
                    display: block;
                    text-decoration: none;
                    color: black;
                }
                .button-bar {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    margin-top: 10px;
                }
                .top-button {
                    padding: 8px 16px;
                    margin: 0 10px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    width: fit-content;
                    align-self: flex-end;
                }
                .top-button:hover {
                    background-color: #0056b3;
                }
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .modal-outer {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    width: 80%;
                    max-width: 500px;
                }
                .modal-title {
                    font-size: 1.5em;
                    margin-bottom: 10px;
                }
                .modal-input-container {
                    margin-bottom: 10px;
                }
                .modal-label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                .modal-button-container {
                    text-align: right;
                }
                .modal-button {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}
