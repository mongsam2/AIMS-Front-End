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

function StudentRecordPDFViewer({ fileUrl }) {
  const baseUrl = "http://3.37.240.199"; // 서버의 도메인 이름

  return (
    <VisualizeStudentRecord>
      <VisualizeStudentRecordPDF
        title="PDF Viewer"
        src={
          fileUrl
            ? `${baseUrl}${fileUrl}`
            : "http://3.37.240.199/media/documents/%EB%85%BC%EC%88%A0/1.%E1%84%89%E1%85%A6%E1%84%8C%E1%85%A9%E1%86%BC%E1%84%83%E1%85%A2_%E1%84%90%E1%85%B3%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC%E1%84%92%E1%85%AA%E1%84%80%E1%85%A9%E1%84%80%E1%85%AD%E1%84%8C%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%8C%E1%85%A1%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%80%E1%85%A8%E1%84%8B%E1%85%A7%E1%86%AF%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%AD%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%92%E1%85%AA%E1%86%A8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A5%E1%84%86%E1%85%B5%E1%86%BE%E1%84%80%E1%85%B5%E1%84%8C%E1%85%AE%E1%86%AB%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%AA%E1%84%8B%E1%85%A1%E1%86%AB%E1%84%82%E1%85%A2%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89.pdf"
        }
        width="100%"
        height="600px"
      >
        이 브라우저는 PDF 파일을 지원하지 않습니다.
        <a
          href={
            fileUrl
              ? `${baseUrl}${fileUrl}`
              : "https://arxiv.org/pdf/2005.11401"
          }
        >
          여기에서 PDF를 다운로드하세요.
        </a>
      </VisualizeStudentRecordPDF>
    </VisualizeStudentRecord>
  );
}

export default StudentRecordPDFViewer;
