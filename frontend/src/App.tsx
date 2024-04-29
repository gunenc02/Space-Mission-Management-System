import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpaceMissions from "./app/SpaceMissions";
import Astronauts from "./app/Astronauts";
import Agencies from "./app/Agencies";
import Companies from "./app/Companies";
import Platform from "./app/Platform";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SpaceMissions />} />
        </Routes>
        <Routes>
          <Route path="/space-missions" element={<SpaceMissions />} />
        </Routes>
        <Routes>
          <Route path="/astronauts" element={<Astronauts />} />
        </Routes>
        <Routes>
          <Route path="/companies" element={<Companies />} />
        </Routes>
        <Routes>
          <Route path="/agencies" element={<Agencies />} />
        </Routes>
        <Routes> path="/platform" element={<Platform/>} </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
