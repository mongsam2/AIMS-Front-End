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

  const handleRowSelect = (essayId) => {
    axios
      .get(`http://3.37.240.199/api/documents/essays/${essayId}/`)
      .then((response) => {
        setFileUrl(response.data.file_url);
        setContent(response.data.content);
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
          <EssayTestEvaluation content={content} />
        </EssayTestContent>
      </MainContent>
    </Container>
  );
}

export default EssayTest;
