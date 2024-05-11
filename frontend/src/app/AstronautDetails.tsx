import { useEffect, useState } from 'react';
import Header from "../components/Header.tsx";
import Navbar from "../components/Navbar.tsx";

export default function AstronautDetails() {
    const [astronaut, setAstronaut] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/astronaut/profile/1`,{
            method:'GET',
            headers:{
                contentType:'application/json',
            }
        })
            .then(response => {
                if (!response.ok) { // This checks if the HTTP response is 2xx
                    throw new Error(`Data cannot be fetched, status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setAstronaut(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }); // Ensure 'id' is used as a dependency in the effect

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="outer">
            <Header />
            <Navbar />
            <h1>Astronaut Details</h1>
            {astronaut && (
                <div>
                    <p>Name: {astronaut.name}</p>
                    <p>Email: {astronaut.mail}</p>
                    <p>Location: {astronaut.country}</p>
                    <p>Date of Birth: {astronaut.dateOfBirth}</p>
                    <p>Image URL: {astronaut.image}</p>
                    <p>Salary: {astronaut.salary}</p>
                    <p>On Duty: {astronaut.onDuty ? "Yes" : "No"}</p>
                </div>
            )}
        </div>
    );
}