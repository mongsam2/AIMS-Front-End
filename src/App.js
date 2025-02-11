import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./components/common/GlobalStyle";

import MainPage from "./pages/MainPage";
import StudentRecord from "./pages/StudentRecord";
import DocumentReview from "./pages/DocumentReview";
import EssayTest from "./pages/EssayTest";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

const FixedContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  overflow: auto;

  // 화면이 너무 작아질 때만 패딩 적용
  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
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
    </>
  );
}

export default App;
