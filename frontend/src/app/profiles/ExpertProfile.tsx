import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getExpertById, getHealthRecordsByExpertId } from "../../calling/expertCaller";
import { Expert, HealthRecordForListing } from "../../data-types/entities";

export default function expertProfile() {
    const { id } = useParams<{ id?: string }>();
    const [expertInfo, setExpertInfo] = useState<Expert | null>(null);
    const [healthRecords, setHealthRecords] = useState<HealthRecordForListing[] | null>(null);
    const [error, setError] = useState('');

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
                console.log(data)
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!expertInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{expertInfo.name}</h1>
            <p>Email: {expertInfo.userMail}</p>
            <p>Role: {expertInfo.userRole}</p>
            <img src={expertInfo.companyLogo} alt={`${expertInfo.companyName} logo`} style={{ width: '100px' }} />
            <p>Company: {expertInfo.companyName}</p>
            {healthRecords ? (
                <div>
                    <h2>Health Records</h2>
                    <ul>
                        {healthRecords.map(record => (
                            <li key={record.id}>
                                <p>Date: {record.date.toLocaleDateString()}</p>
                                <p>Astronaut: {record.astronautName}</p>
                                <p>Notes: {record.notes}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>Loading health records...</div>
            )}
        </div>
    );
}
