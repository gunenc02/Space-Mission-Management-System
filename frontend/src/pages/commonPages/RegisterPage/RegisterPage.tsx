import React, { useState } from 'react';
import './Register.css'; // Update the path if necessary

interface UserType {
    value: string;
    label: string;
}

const userTypes: UserType[] = [
    { value: 'Agency', label: 'Agency' },
    { value: 'Company', label: 'Company' },
    { value: 'Astronaut', label: 'Astronaut' }
];

const RegistrationPage: React.FC = () => {
    const [activeUserType, setActiveUserType] = useState(userTypes[0].value);
    const [formData, setFormData] = useState<any>({
        email: '',
        password: '',
        agencyName: '',
        companyName: '',
        name: '',
        country: '',
        dateOfBirth: '',
        money: ''
    });

    const handleUserTypeChange = (value: string) => {
        setActiveUserType(value);
        setFormData({
            email: '',
            password: '',
            agencyName: '',
            companyName: '',
            name: '',
            country: '',
            dateOfBirth: '',
            money: ''
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let endpoint = '';
        switch (activeUserType) {
            case 'Agency':
                endpoint = '/account/registerAgency';
                break;
            case 'Company':
                endpoint = '/account/registerCompany';
                break;
            case 'Astronaut':
                endpoint = '/account/registerAstronaut';
                break;
            default:
                return;
        }

        try {
            const response = await fetch(`http://localhost:8080${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Registration successful!');
            } else {
                throw new Error(`Registration failed: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred: ' + (error as Error).message);
        }
    };

    const renderFormFields = () => {
        switch (activeUserType) {
            case 'Agency':
                return (
                    <>
                        <div className="input-group">
                            <label htmlFor="agencyName">Agency Name</label>
                            <input type="text" id="agencyName" name="agencyName" value={formData.agencyName} onChange={handleInputChange} required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="photoUpload">Upload Photo</label>
                            <input type="file" id="photoUpload" name="photo" accept="image/jpeg, image/png"/>
                        </div>
                    </>
                );
            case 'Company':
                return (
                    <>
                        <div className="input-group">
                            <label htmlFor="companyName">Company Name</label>
                            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="money">Money</label>
                            <input type="number" id="money" name="money" value={formData.money} onChange={handleInputChange} required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="photoUpload">Upload Photo</label>
                            <input type="file" id="photoUpload" name="photo" accept="image/jpeg, image/png"/>
                        </div>
                    </>
                );
            case 'Astronaut':
                return (
                    <>
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} required/>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="main-container">
            <div className="title-container">
                <h1 className="main-header">Space Mission Management System</h1>
            </div>
            <div className="card">
                <div className="registration-container">
                    <ul className="user-type-tabs">
                        {userTypes.map((userType) => (
                            <li
                                key={userType.value}
                                className={activeUserType === userType.value ? 'active' : ''}
                                onClick={() => handleUserTypeChange(userType.value)}
                            >
                                {userType.label}
                            </li>
                        ))}
                    </ul>

                    <form className="form-container" onSubmit={handleSubmit}>
                        <div className="form-fields">
                            <div className="left-form">
                                <div className="input-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className="right-form">
                                {renderFormFields()}
                            </div>
                        </div>
                        <button className="login-submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
