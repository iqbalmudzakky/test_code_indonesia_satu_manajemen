import { BrowserRouter, Route, Routes } from "react-router";

import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import AddPage from "./pages/AddPage.jsx";
import ScorePage from "./pages/ScorePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/score/:noAplikasi" element={<ScorePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
