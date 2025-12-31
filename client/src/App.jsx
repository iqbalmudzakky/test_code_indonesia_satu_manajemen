import { BrowserRouter, Route, Routes } from "react-router";

import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import CreatePersonalInformationPage from "./pages/CreatePersonalInformationPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<CreatePersonalInformationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
