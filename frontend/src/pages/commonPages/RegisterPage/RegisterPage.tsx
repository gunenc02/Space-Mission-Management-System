import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

interface UserType {
  value: string;
  label: string;
}

const userTypes: UserType[] = [
  { value: "Agency", label: "Agency" },
  { value: "Company", label: "Company" },
  { value: "Astronaut", label: "Astronaut" },
];

const RegistrationPage: React.FC = () => {
  const [activeUserType, setActiveUserType] = useState(userTypes[0].value);
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
    agencyName: "",
    companyName: "",
    name: "",
    country: "",
    dateOfBirth: "",
    money: "",
    image: "",
    logo: "",
  });

  const history = useNavigate();

  const handleUserTypeChange = (value: string) => {
    setActiveUserType(value);
    setFormData({
      email: "",
      password: "",
      agencyName: "",
      companyName: "",
      name: "",
      country: "",
      dateOfBirth: "",
      money: "",
      image: "",
      logo: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id == "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Image = base64String.split(",")[1];
        setFormData({
          ...formData,
          ["image"]: base64Image,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let endpoint = "";
    let imageText = "";
    switch (activeUserType) {
      case "Agency":
        endpoint = "/account/registerAgency";
        imageText = "logo";
        break;
      case "Company":
        endpoint = "/account/registerCompany";
        imageText = "logo";
        break;
      case "Astronaut":
        endpoint = "/account/registerAstronaut";
        imageText = "image";
        break;
      default:
        return;
    }

    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData));

      if (response.ok) {
        alert("Registration successful!");
        history("/login");
      } else {
        throw new Error(`Registration failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + (error as Error).message);
    }
  };

  const renderFormFields = () => {
    switch (activeUserType) {
      case "Agency":
        return (
          <>
            <div className="input-group">
              <label htmlFor="agencyName">Agency Name</label>
              <input
                type="text"
                id="agencyName"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/jpeg, image/png"
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      case "Company":
        return (
          <>
            <div className="input-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="money">Money</label>
              <input
                type="number"
                id="money"
                name="money"
                value={formData.money}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/jpeg, image/png"
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      case "Astronaut":
        return (
          <>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/jpeg, image/png"
                onChange={handleInputChange}
              />
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
                className={activeUserType === userType.value ? "active" : ""}
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
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="right-form">{renderFormFields()}</div>
            </div>
            <div className="button-container">
              <button className="login-submit" type="submit">
                Register
              </button>
              <button
                type="button"
                className="back-to-login"
                onClick={() => history("/login")}
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
