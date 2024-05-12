import {useState, useEffect} from "react";
import {getCompanyProfile} from "../../calling/companyCaller.tsx";
import {Company} from "../../data-types/entities.tsx";
import {CompanyProfileProps} from "../../data-types/profile-props.tsx";
import {useParams} from "react-router-dom";


export default function CompanyProfile(){
    const { companyId } = useParams<{ id?: string }>();
    const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!companyId) return;

        getCompanyProfile(companyId, {token:""})
            .then(data => {
                setCompanyInfo(data);
                setError('');
            })
            .catch(err => {
                setError(err.message);
                setCompanyInfo(null);
            });
    }, [companyId, user]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!companyInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{companyInfo.name}</h1>
            <p>Email: {companyInfo.mail}</p>
            <p>Country: {companyInfo.country}</p>
            <img src={companyInfo.logo} alt={`${companyInfo.name} logo`} style={{ width: '100px' }} />
            <p>Budget: ${companyInfo.budget.toLocaleString()}</p>
        </div>
    );
}