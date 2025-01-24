import React, { useState } from "react";
import {
  Container,
  MainContent,
  StudentRecordContent,
} from "../components/common/Layout";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import StudentRecordApplicantTable from "../components/student-record/StudentRecordApplicantTable";
import StudentRecordPDFViewer from "../components/student-record/StudentRecordPDFViewer";
import StudentRecordEvaluation from "../components/student-record/StudentRecordEvaluation";
import axios from "axios";

function StudentRecord() {
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedMemo, setSelectedMemo] = useState(null);

  const handleRowSelect = (id) => {
    axios
      .get(`http://3.37.240.199/api/documents/student-records/${id}/`)
      .then((response) => {
        setSelectedFileUrl(response.data.file_url);
        setSelectedContent(response.data.content);
        setSelectedQuestion(response.data.question);
        setSelectedMemo(response.data.memo);
      })
      .catch((error) => {
        console.error("API 호출 중 오류가 발생했습니다:", error);
      });
  };

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header title="생활기록부 및 면접 평가" />
        <StudentRecordContent>
          <StudentRecordApplicantTable onRowSelect={handleRowSelect} />
          <StudentRecordPDFViewer fileUrl={selectedFileUrl} />
          <StudentRecordEvaluation
            content={selectedContent}
            question={selectedQuestion}
            memo={selectedMemo}
          />
        </StudentRecordContent>
      </MainContent>
    </Container>
  );
}

export default StudentRecord;
