import {useState, useEffect} from "react";
import {getCompanyProfile} from "../../calling/companyCaller";
import {Company} from "../../data-types/entities";
import {useParams} from "react-router-dom";

export default function CompanyProfile() {
    const { companyId } = useParams<{ companyId?: string }>(); // Correctly extract companyId from the URL
    const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
    const [error, setError] = useState('');

    console.log("companyId:", companyId); // Check what companyId is being received
    useEffect(() => {
        if (!companyId) {
            setError("Company ID is missing");
            return; // Exit if no companyId is provided
        }

        const numericCompanyId = parseInt(companyId, 10); // Convert companyId to a number
        if (isNaN(numericCompanyId)) {
            setError("Invalid Company ID");
            return; // Handle non-numeric companyId
        }

        const token = ""; // Assuming token management
        const user = { token }; // Create user object for API call
        console.log("here");
        getCompanyProfile(numericCompanyId, user)
            .then(data => {
                setCompanyInfo(data);
                setError('');
                console.log("Data received:", data); // Log the received data
            })
            .catch(err => {
                setError(err.message);
                setCompanyInfo(null);
                console.error("API error:", err); // Log any errors
            });
    }, [companyId]); // Dependency on companyId from URL

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!companyInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{companyInfo.name}</h1>
            <p>Email: {companyInfo.userMail}</p>
            <p>Country: {companyInfo.country}</p>
            <img src={companyInfo.logo} alt={`${companyInfo.name} logo`} style={{ width: '100px' }} />
            <p>Budget: ${companyInfo.money.toLocaleString()}</p>
        </div>
    );
}
