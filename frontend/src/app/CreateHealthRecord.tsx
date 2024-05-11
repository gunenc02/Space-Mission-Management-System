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
        //evaluate formData to ensure that retrieved input is okay
        if(formData.height !== '' && formData.weight != '' && formData.heartRate != '' && formData.bloodPressure != '' && formData.vaccinations != '' && formData.eligible != ''){
            setErrVisible(false);
            
        }
        else{
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