import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpaceMissions from "./app/SpaceMissions";
import Astronauts from "./app/Astronauts";
import Agencies from "./app/Agencies";
import Companies from "./app/Companies";
import Platform from "./app/Platform";
import CreateHealthRecord from "./app/CreateHealthRecord";

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
          <Route path="/modal" element={<CreateHealthRecord/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
