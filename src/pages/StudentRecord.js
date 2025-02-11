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
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedScore1, setSelectedScore1] = useState(null);
  const [selectedScore2, setSelectedScore2] = useState(null);
  const [selectedScore3, setSelectedScore3] = useState(null);
  const [selectedScore4, setSelectedScore4] = useState(null);

  const handleRowSelect = (id) => {
    setSelectedId(id);
    axios
      .get(`http://3.37.240.199/api/student-records/${id}/`)
      .then((response) => {
        const data = response.data;
        setSelectedFileUrl(data.file);
        setSelectedContent(data.summarization.content);
        setSelectedQuestion(data.summarization.question);
        setSelectedMemo(data.memo);
        setSelectedScore1(data.score1);
        setSelectedScore2(data.score2);
        setSelectedScore3(data.score3);
        setSelectedScore4(data.score4);
      })
      .catch((error) => {
        console.error("API 호출 중 오류가 발생했습니다:", error);
      });
  };

  const updateMemo = (newMemo, selectedId) => {
    axios
      .patch(`http://3.37.240.199/api/student-records/${selectedId}/memo/`, {
        memo: newMemo,
      })
      .then((response) => {
        setSelectedMemo(response.data.memo);
      })
      .catch((error) => {
        console.error("메모 업데이트 중 오류가 발생했습니다:", error);
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
            evaluation={selectedEvaluation}
            onUpdateMemo={updateMemo}
            id={selectedId}
            score1={selectedScore1}
            score2={selectedScore2}
            score3={selectedScore3}
            score4={selectedScore4}
          />
        </StudentRecordContent>
      </MainContent>
    </Container>
  );
}

export default StudentRecord;
