import React, { useState } from "react";
import {
  Container,
  MainContent,
  EssayTestContent,
} from "../components/common/Layout";
import Header from "../components/common/Header";
import EssayTestApplicantTable from "../components/essay-test/EssayTestApplicantTable";
import EssayTestPDFViewer from "../components/essay-test/EssayTestPDFViewer";
import EssayTestEvaluation from "../components/essay-test/EssayTestEvaluation";
import Sidebar from "../components/common/Sidebar";
import axios from "axios";

function EssayTest() {
  const [fileUrl, setFileUrl] = useState(null);
  const [content, setContent] = useState(null);
  const [score, setScore] = useState(null);
  const [criteria, setCriteria] = useState(null);
  const [essayId, setEssayId] = useState(null);

  const handleRowSelect = (essayId) => {
    setEssayId(essayId);
    axios
      .get(`http://3.37.240.199/api/essays/${essayId}/`)
      .then((response) => {
        setFileUrl(response.data.file);
        setContent(response.data.evaluation);
        setScore(response.data.score_by_length);
        setCriteria(response.data.criteria);
      })
      .catch((error) => {
        console.error("API 호출 중 오류가 발생했습니다:", error);
      });
  };

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header title="논술 채점" />
        <EssayTestContent>
          <EssayTestApplicantTable onRowSelect={handleRowSelect} />
          <EssayTestPDFViewer fileUrl={fileUrl} />
          <EssayTestEvaluation
            content={content}
            score={score}
            criteria={criteria}
            essayId={essayId}
          />
        </EssayTestContent>
      </MainContent>
    </Container>
  );
}

export default EssayTest;
