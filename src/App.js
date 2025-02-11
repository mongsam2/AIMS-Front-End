import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import MainPage from "./pages/MainPage";
import StudentRecord from "./pages/StudentRecord";
import DocumentReview from "./pages/DocumentReview";
import EssayTest from "./pages/EssayTest";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

const FixedContainer = styled.div`
  width: auto;
  height: auto;
  margin: 0 auto;
  overflow: auto;
`;

function App() {
  return (
    <FixedContainer>
      <Router>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/document-review" element={<DocumentReview />} />
          <Route path="/student-record" element={<StudentRecord />} />
          <Route path="/essay-test" element={<EssayTest />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </FixedContainer>
  );
}

export default App;
