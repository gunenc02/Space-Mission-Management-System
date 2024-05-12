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
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
