import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/commonPages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/commonPages/RegisterPage/RegisterPage.tsx";
import SpaceMissions from "./app/pages/SpaceMissions";
import Astronauts from "./app/pages/Astronauts";
import Agencies from "./app/pages/Agencies";
import Companies from "./app/pages/Companies";
import Platform from "./app/pages/Platform";
import AstronautProfile from "./app/profiles/AstronautProfile";
import CompanyProfile from "./app/profiles/CompanyProfile.tsx";
import ExpertProfile from "./app/profiles/ExpertProfile.tsx";
import ReceivedBids from "./app/pages/ReceivedBids";
import Login from "./app/Login.tsx";
import OfferedBids from "./app/pages/OfferedBids.tsx";
import AgencyProfile from "./app/profiles/AgencyProfile.tsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SpaceMissions />} />
          <Route path="/space-missions" element={<SpaceMissions />} />
          <Route path="/astronauts" element={<Astronauts />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/agencies" element={<Agencies />} />
          <Route path="/platforms" element={<Platform />} />
          <Route path="/astronaut/:id" element={<AstronautProfile />}></Route>
          <Route path="/company/:id" element={<CompanyProfile />}></Route>
          <Route path="/agency/:id" element={<AgencyProfile />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/bid/receivedList/:id" element={<ReceivedBids />} />
          <Route path="/test" element={<Login />} />
          <Route path="/bid/offeredList/:id" element={<OfferedBids />} />
          <Route path="/expert/:id" element={<ExpertProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
