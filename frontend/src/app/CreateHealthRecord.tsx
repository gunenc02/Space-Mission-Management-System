import { useState } from "react";
import React from 'react';

const CHR_WIDTH = 400;
const CHR_HEIGHT = 600;


function cancelHandler(){

}

function modalClose(){

}
function fetchSuccess(){

}

export default function CreateHealthRecord(astronautId){
    const [errVisible, setErrVisible] = useState<boolean>(false);
    
    const registerHandler = function (){
        console.log("CHR debug: registerHandler invoked");
        const formData = {
            height: document.getElementById('tfHeight')?.nodeValue || '', //?.nodeValue syntax allows us to avoid generating errors if the input is null
            weight: document.getElementById('tfWeight')?.nodeValue || '',
            heartRate: document.getElementById('tfHeartRate')?.nodeValue || '',
            bloodPressure: document.getElementById('tfBloodPressure')?.nodeValue || '',
            vaccinations: (document.getElementById('tfVaccinations') as HTMLTextAreaElement)?.value || '',
            notes: (document.getElementById('tfNotes') as HTMLTextAreaElement)?.value || '',
            eligible: (document.querySelector('input[name="eligible"]:checked') as HTMLInputElement)?.value || ''
        };
        //console.log("CHR debug formData is: " + formData.toString());
        //evaluate formData to ensure that retrieved input is okay
        console.log("Debug CHR:" + formData.height + "" + formData.weight);
        if(formData.height !== '' && formData.weight != '' && formData.heartRate != '' && formData.bloodPressure != '' && formData.vaccinations != '' && formData.eligible != ''){
            setErrVisible(false);
            const castedHeight = parseFloat(formData.height);
            const castedWeight = parseFloat(formData.weight);
            const castedHeartRate = parseInt(formData.heartRate);
            
            if(castedHeight == 0 || castedWeight == 0 || castedHeartRate === 0){
                setErrVisible(true);
            }
            else{
                //we can register the healthRecord to backend now
                const postUrl = `http://localhost:8080/healthRecord/create`;
                
                const currDate = new Date();
                const day = currDate.getDate();
                const month = currDate.getMonth() + 1;
                const year = currDate.getFullYear();
                const dateStr = year + "-" + month + "-" + day;

                const requestBody = {
                    height: castedHeight,
                    weight: castedWeight,
                    heartRate: castedHeartRate,
                    bloodPressure: formData.bloodPressure,
                    vaccinations: formData.vaccinations,
                    notes: formData.notes,
                    availibilityForMission: formData.eligible,
                    date: dateStr
                };

                // Send a POST request to register the health record
                fetch(postUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                        console.log("Debug CHR: first then if");
                    }
                    else{
                        //close the modal, the health record has been registered
                        modalClose();
                    }
                })
                .catch(error => {
                    // Handle errors here
                    console.error('There was a problem with the fetch operation:', error);
                });
            }
        }
        
        else{
            console.log("Debug CHR: outer else");
            setErrVisible(true);
        }
    }    
    return(
        <div style={{width: CHR_WIDTH, height: CHR_HEIGHT}}>
            <label htmlFor="tfHeight">Height:</label> <br></br>
            <input type="text" id="tfHeight"></input> <br></br>
            <label htmlFor="tfWeight">Weight:</label> <br></br>
            <input type="text" id="tfWeight"></input> <br></br>

            <label htmlFor="tfHeartRate">Heart Rate:</label> <br></br>
            <input type="text" id="tfHeartRate"></input> <br></br>
            <label htmlFor="tfBloodPressure">Blood Pressure:</label> <br></br>
            <input type="text" id="tfBloodPressure"></input> <br></br>

            <label htmlFor="tfVaccinations">Vaccinations (, separated list)</label> <br></br>
            <textarea id="tfVaccinations"></textarea> <br></br>

            <label htmlFor="tfNotes">Notes</label> <br></br>
            <textarea id="tfNotes"></textarea> <br></br>

            <h3>Astronaut Eligibility</h3> <br></br>
            <input type="radio" id="radioYes" name="eligible"></input>
            <input type="radio" id="radiono" name="eligible"></input> <br></br>
            <label htmlFor="radioYes">Yes</label>
            <label htmlFor="radioNo">No</label> <br></br>
            <h5 style={{ color: 'red', visibility: errVisible ? 'visible' : 'hidden' }}>Fields (except notes) cannot be empty</h5>

            <button onClick={cancelHandler} style={{backgroundColor: 'red', color: 'white'}}>Cancel</button>
            <button onClick={registerHandler} style={{backgroundColor: 'green', color: 'white'}}>Register</button>
        </div>
    );
}
