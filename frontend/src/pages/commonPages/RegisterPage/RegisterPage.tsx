import React from 'react';
import './Register.css'; // Update the path if necessary

interface UserType {
    value: string;
    label: string;
}

const userTypes: UserType[] = [
    { value: 'Agency', label: 'Agency' },
    { value: 'Company', label: 'Company' },
    { value: 'Astronaut', label: 'Astronaut' },
    { value: 'Expert', label: 'Expert' }
];

const RegistrationPage: React.FC = () => {
    const [activeUserType, setActiveUserType] = React.useState(userTypes[0].value);

    const handleUserTypeChange = (value: string) => {
        setActiveUserType(value);
    };

    const renderFormFields = () => {
        switch (activeUserType) {
            case 'Agency':
                return (
                    <>
                        <div className="input-group">
                            <label htmlFor="Name">Name</label>
                            <input type="text" id="Name" name="Name" required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="Country">Title</label>
                            <input type="text" id="Country" name="Country" required/>
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
                            <label htmlFor="Name">Department</label>
                            <input type="text" id="Name" name="Name" required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="Country">Specialization</label>
                            <input type="text" id="Country" name="Country" required/>
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
                            <label htmlFor="name">Department</label>
                            <input type="text" id="name" name="name" required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="birth">Specialization</label>
                            <input type="text" id="birth" name="birth" required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="Country">Specialization</label>
                            <input type="text" id="Country" name="Country" required/>
                        </div>
                    </>
                );
            case 'Expert':
                return (
                    <>
                        <div className="input-group">
                            <label htmlFor="name">Department</label>
                            <input type="text" id="name" name="name" required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="birth">Specialization</label>
                            <input type="text" id="birth" name="birth" required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="Country">Specialization</label>
                            <input type="text" id="Country" name="Country" required/>
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

                <form className="form-container">
                    <div className="form-fields">
                        <div className="left-form">
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" required />
                            </div>
                        </div>
                        <div className="right-form">
                            {renderFormFields()}
                        </div>
                    </div>
                    <button className="login-submit" >Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
