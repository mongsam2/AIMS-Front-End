import React from "react";
import styled from "styled-components";

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  width: 70%;
  height: 93%;
  background-color: #d3e3fe;
  border-radius: 8px;
  padding: 20px;
  position: relative;
`;

const PopupContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.5%;
`;

const PopupContentTopSubmit = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 50%;
  height: 100%;
  margin-left: 1.5%;
`;

const PopupContentTopSubmitButton = styled.button`
  width: auto;
  height: 100%;
  background-color: #edf0f5;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 5px 5px 0px 0px;
  padding: 0 20px 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 0.5%;
`;

const PopupContentTopRight = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 50%;
  height: 100%;
  gap: 2%;
`;

const PopupCloseButton = styled.button`
  width: 2rem;
  height: 2rem;
  background-color: #d3e3fe;
  border: none;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: 1000;
  color: rgba(0, 0, 0, 0.5);
`;

const PopupInnerContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 96%;
  border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
  background-color: white;
`;

const PopupInnerContentSet = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 95%;
`;

const PopupInnerContentPdf = styled.div`
  width: 55%;
  height: 100%;
  background-color: #d3e3fe;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
`;

const VisualizeDocumentPDF = styled.iframe`
  width: 70%;
  height: 100%;
`;

const PopupInnerContentInfo = styled.div`
  width: 25%;
  height: 100%;
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function DocumentReviewPopUp({ onClose }) {
  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <PopupContentTop>
          <PopupContentTopSubmit>
            <PopupContentTopSubmitButton>제출</PopupContentTopSubmitButton>
          </PopupContentTopSubmit>
          <PopupContentTopRight>
            <PopupCloseButton onClick={onClose}>X</PopupCloseButton>
          </PopupContentTopRight>
        </PopupContentTop>
        <PopupInnerContent>
          <PopupInnerContentSet>
            <VisualizeDocumentPDF
              title="PDF Viewer"
              src="https://arxiv.org/pdf/2005.11401"
            >
              이 브라우저는 PDF 파일을 지원하지 않습니다.
              <a href="https://arxiv.org/pdf/2005.11401">
                여기에서 PDF를 다운로드하세요.
              </a>
            </VisualizeDocumentPDF>
            <PopupInnerContentInfo>정보</PopupInnerContentInfo>
          </PopupInnerContentSet>
        </PopupInnerContent>
      </PopupContent>
    </PopupOverlay>
  );
}

export default DocumentReviewPopUp;
