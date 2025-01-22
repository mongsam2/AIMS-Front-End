import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import StudentRecord from "./pages/StudentRecord";
import DocumentReview from "./pages/DocumentReview";
import EssayTest from "./pages/EssayTest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"/>
        <Route path="/login"/>

        <Route path="/main" element={<MainPage />} />
        <Route path="/document-review" element={<DocumentReview />} />
        <Route path="/student-record" element={<StudentRecord />} />
        <Route path="/essay-test" element={<EssayTest />} />
      </Routes>
    </Router>
  );
}

export default App;
