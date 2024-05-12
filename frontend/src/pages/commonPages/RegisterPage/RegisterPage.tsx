import React from 'react';
import './Register.css'; // Update the path if necessary

interface UserType {
    value: string;
    label: string;
}

const userTypes: UserType[] = [
    { value: 'type1', label: 'Type 1 User' },
    { value: 'type2', label: 'Type 2 User' },
    { value: 'type3', label: 'Type 3 User' }
];

const RegistrationPage: React.FC = () => {
    const [activeUserType, setActiveUserType] = React.useState(userTypes[0].value);

    const handleUserTypeChange = (value: string) => {
        setActiveUserType(value);
    };

    const renderFormFields = () => {
        switch (activeUserType) {
            case 'type1':
                return (
                    <>
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" required />
                        </div>
                    </>
                );
            case 'type2':
                return (
                    <>
                        <div className="input-group">
                            <label htmlFor="department">Department</label>
                            <input type="text" id="department" name="department" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="specialization">Specialization</label>
                            <input type="text" id="specialization" name="specialization" required />
                        </div>
                    </>
                );
            case 'type3':
                return (
                    <>
                        <div className="input-group">
                            <label htmlFor="department">Department</label>
                            <input type="text" id="department" name="department" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="specialization">Specialization</label>
                            <input type="text" id="specialization" name="specialization" required />
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
                    <button className="login-submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
