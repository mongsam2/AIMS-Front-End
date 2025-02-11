import React from "react";
import styled from "styled-components";

const VisualizeEssayTest = styled.div`
  width: 49%;
  height: 100%;
  background-color: #f9fafd;
  color: rgba(0, 0, 0, 0.3);
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VisualizeEssayTestPDF = styled.iframe`
  width: 100%;
  height: 100%;
`;

function EssayTestPDFViewer({ fileUrl }) {
  return (
    <VisualizeEssayTest>
      <VisualizeEssayTestPDF
        title="PDF Viewer"
        src={fileUrl ? `${fileUrl}#toolbar=0&zoom=37.8` : "about:blank"}
        width="100%"
        height="600px"
      >
        {fileUrl ? "이 브라우저는 PDF 파일을 지원하지 않습니다." : "None"}
        <a href={fileUrl ? `${fileUrl}` : "https://arxiv.org/pdf/2005.11401"}>
          여기에서 PDF를 다운로드하세요.
        </a>
      </VisualizeEssayTestPDF>
    </VisualizeEssayTest>
  );
}

export default EssayTestPDFViewer;
