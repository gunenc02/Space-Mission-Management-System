// UNUSED FILE, LET IT STAY JUST IN CASE WE DECIDE TO GO BACK TO SEPARATE REGISTRATION
export default function AstronautRegister(){
    return (
        <div>
            <div>
                <h1>Astronaut Registration</h1> <br></br>
                <h3>Welcome, to the place where you will take a step for new horizons!</h3>
            </div>
            <div>
                <label htmlFor="email">E-mail Adress</label>
                <input type="mail" id="email"></input> <br></br>
                <label htmlFor="fullname">Full Name</label>
                <input type="text" id="fullname"></input> <br></br>
                <label htmlFor="pw">Password</label>
                <input type="password" id="pw"></input> <br></br>
                <label htmlFor="dob">Date of birth</label> 
                <input type="text" id="dob"></input> <br></br>
                <label htmlFor="country">Country</label> 
                <input type="text" id="country"></input>
                <button type="button" style={{backgroundColor: 'cyan', color: 'white'}}>Submit</button>
            </div>
        </div>
    );
}