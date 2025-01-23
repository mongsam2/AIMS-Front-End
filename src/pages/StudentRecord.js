import {
  Container,
  MainContent,
  StudentRecordContent,
} from "../components/common/Layout";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import ApplicantTable from "../components/common/ApplicantTable";
import StudentRecordPDFViewer from "../components/student-record/StudentRecordPDFViewer";
import StudentRecordEvaluation from "../components/student-record/StudentRecordEvaluation";

function StudentRecord() {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header title="생활기록부 및 면접 평가" />
        <StudentRecordContent>
          <ApplicantTable />
          <StudentRecordPDFViewer />
          <StudentRecordEvaluation />
        </StudentRecordContent>
      </MainContent>
    </Container>
  );
}

export default StudentRecord;
