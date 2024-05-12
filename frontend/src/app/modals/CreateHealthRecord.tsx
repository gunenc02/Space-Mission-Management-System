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
function handleChange(){
    //empty function
}

export default function CreateHealthRecord(astronautId){
    const [errVisible, setErrVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        height: '',
        weight: '',
        heartRate: '',
        bloodPressure: '',
        vaccinations: '',
        notes: '',
        eligible: ''
    });

    const updateForm = function(e){
        console.log("CHR debug: updateForm invoked");
        //this will simply update formData when a change occurs in one of our input elements
        const { id, value } = e.target;
        console.log(id + "," + value);
        setFormData(prevState => ({
            ...prevState, //preserve the unchanged attributes of prevState
            [id]: value
        }));
    };
    const radioChange = function(e){
        setFormData(prevState => ({
            ...prevState,
            eligible: e.value
        }));
    }
    const registerHandler = function(){
        console.log("CHR debug: registerHandler invoked");
        
        //console.log("CHR debug formData is: " + formData.toString());
        //evaluate formData to ensure that retrieved input is okay
        console.log("Debug CHR:" + formData.height + "" + formData.weight);
        if(formData.height !== '' && formData.weight !== '' && formData.heartRate !== '' && formData.bloodPressure !== '' && formData.vaccinations !== '' && formData.eligible !== ''){
            setErrVisible(false);
            const castedHeight = parseFloat(formData.height);
            const castedWeight = parseFloat(formData.weight);
            const castedHeartRate = parseInt(formData.heartRate);
            
            if(castedHeight == 0 || castedWeight == 0 || castedHeartRate === 0){
                setErrVisible(true);
            }
            else{
                console.log("CHR debug: about to send the post request");
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
            <label htmlFor="height">Height:</label> <br></br>
            <input type="text" value={formData.height} onChange={updateForm} id="height"></input> <br></br>
            <label htmlFor="weight">Weight:</label> <br></br>
            <input type="text" value={formData.weight} onChange={updateForm} id="weight"></input> <br></br>

            <label htmlFor="heartRate">Heart Rate:</label> <br></br>
            <input type="text" value={formData.heartRate} onChange={updateForm} id="heartRate"></input> <br></br>
            <label htmlFor="bloodPressure">Blood Pressure:</label> <br></br>
            <input type="text" value={formData.bloodPressure} onChange={updateForm} id="bloodPressure"></input> <br></br>

            <label htmlFor="vaccinations">Vaccinations (, separated list)</label> <br></br>
            <textarea id="vaccinations" value={formData.vaccinations} onChange={updateForm}></textarea> <br></br>

            <label htmlFor="notes">Notes</label> <br></br>
            <textarea id="notes" value={formData.notes} onChange={updateForm}></textarea> <br></br>

            <h3>Astronaut Eligibility</h3> <br></br>
            <input type="radio" id="radioYes" value="yes" name="eligible" onChange={radioChange}></input>
            <input type="radio" id="radiono" value="no" name="eligible" onChange={radioChange}></input> <br></br>
            <label htmlFor="radioYes">Yes</label>
            <label htmlFor="radioNo">No</label> <br></br>
            <h5 style={{ color: 'red', visibility: errVisible ? 'visible' : 'hidden' }}>Fields (except notes) cannot be empty</h5>

            <button onClick={cancelHandler} style={{backgroundColor: 'red', color: 'white'}}>Cancel</button>
            <button onClick={registerHandler} style={{backgroundColor: 'green', color: 'white'}}>Register</button>
        </div>
    );
}