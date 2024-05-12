import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpaceMissions from "./app/pages/SpaceMissions";
import Astronauts from "./app/pages/Astronauts";
import Agencies from "./app/pages/Agencies";
import Companies from "./app/pages/Companies";
import Platform from "./app/pages/Platform";
import CreateHealthRecord from "./app/modals/CreateHealthRecord";
import AstronautProfile from "./app/profiles/AstronautProfile";
import CompanyProfile from "./app/profiles/CompanyProfile.tsx";

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
          <Route path="/companyProfile/:companyId" element={<CompanyProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
