import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/App.css";

export default function Settings() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleChangePassword = (event: React.FormEvent) => {
    event.preventDefault();
    if (password != confirmPassword) {
      alert("Password does not match");
      setPassword("");
      setConfirmPassword("");
    }

    const putUrl =
      `http://localhost:8080/account/alterUser/` +
      localStorage.getItem("userId");

    const requestBody = {
      username: null,
      password: password,
    };

    fetch(putUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          alert("Change is successful");
          window.location.href = "/space-missions";
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleChangeEmail = (event: React.FormEvent) => {
    event.preventDefault();
    if (password != confirmPassword) {
      alert("Password does not match");
      setPassword("");
      setConfirmPassword("");
    }

    const putUrl =
      `http://localhost:8080/account/alterUser/` +
      localStorage.getItem("userId");

    const requestBody = {
      username: email,
      password: null,
    };

    fetch(putUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          alert("Change is successful");
          window.location.href = "/space-missions";
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div className="outer">
      <Navbar />
      <div className=" mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Settings</h1>
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 ">
          <div className="flex flex-row">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Change Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 settings-input"
                required
              />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Change Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className=" mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 settings-input"
                required
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="mt-6  ml-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out settings-button"
            >
              Change Pass
            </button>
          </div>

          <div className="flex flex-row">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Change Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 settings-input"
                required
              />
            </div>
            <button
              onClick={handleChangeEmail}
              className="mt-6  ml-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out settings-button"
            >
              Change Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
