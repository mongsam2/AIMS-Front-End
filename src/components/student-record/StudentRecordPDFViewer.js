import styled from "styled-components";

const VisualizeStudentRecord = styled.div`
  width: 40%;
  height: 100%;
  background-color: #f9fafd;
  color: rgba(0, 0, 0, 0.3);
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VisualizeStudentRecordPDF = styled.iframe`
  width: 100%;
  height: 100%;
`;

function StudentRecordPDFViewer() {
  return (
    <VisualizeStudentRecord>
      <VisualizeStudentRecordPDF
        title="PDF Viewer"
        src="https://arxiv.org/pdf/2005.11401"
        width="100%"
        height="600px"
      >
        이 브라우저는 PDF 파일을 지원하지 않습니다.
        <a href="https://arxiv.org/pdf/2005.11401">
          여기에서 PDF를 다운로드하세요.
        </a>
      </VisualizeStudentRecordPDF>
    </VisualizeStudentRecord>
  );
}

export default StudentRecordPDFViewer;
