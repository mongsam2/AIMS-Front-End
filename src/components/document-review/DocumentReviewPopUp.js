import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

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
  width: 13%;
  height: 100%;
  background-color: #edf0f5;
  font-size: 1.5rem;
  font-weight: 600;
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
  background-color: #d3e3fe;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function DocumentReviewPopUp({ onClose, selectedId, documentType }) {
  const [fileUrl, setFileUrl] = useState("");
  const [reasons, setReasons] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);

  useEffect(() => {
    const LoadData = async () => {
      try {
        console.log("Selected ID:", selectedId);
        console.log("Document Type:", documentType);

        const response = await axios.get(
          `http://3.37.240.199/api/documents/${selectedId}/${documentType}/`
        );
        const data = response.data;

        // 모든 문서를 상태에 저장합니다.
        setDocuments(data);

        // 제일 첫 번째 제출된 서류를 기본으로 설정합니다.
        if (data.length > 0) {
          const firstDocument = data[0];
          setFileUrl(firstDocument.file_url);
          setReasons(firstDocument.reasons);
          setActiveButtonIndex(0);
        }
      } catch (error) {
        console.error("서류데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    LoadData();
  }, [selectedId, documentType]);

  const handleDocumentClick = (index) => {
    const document = documents[index];
    setFileUrl(document.file_url);
    setReasons(document.reasons);
    setActiveButtonIndex(index);
  };

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <PopupContentTop>
          <PopupContentTopSubmit>
            {documents
              .slice()
              .reverse()
              .map((doc, index, reversedDocs) => (
                <PopupContentTopSubmitButton
                  key={index}
                  onClick={() =>
                    handleDocumentClick(reversedDocs.length - 1 - index)
                  }
                  style={{
                    backgroundColor:
                      activeButtonIndex === reversedDocs.length - 1 - index
                        ? "#7696CF"
                        : "#edf0f5",
                    color:
                      activeButtonIndex === reversedDocs.length - 1 - index
                        ? "white"
                        : "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {index === 0 ? "제출" : `재제출${index}`}
                </PopupContentTopSubmitButton>
              ))}
          </PopupContentTopSubmit>
          <PopupContentTopRight>
            <PopupCloseButton onClick={onClose}>X</PopupCloseButton>
          </PopupContentTopRight>
        </PopupContentTop>
        <PopupInnerContent>
          <PopupInnerContentSet>
            <VisualizeDocumentPDF title="PDF Viewer" src={fileUrl}>
              이 브라우저는 PDF 파일을 지원하지 않습니다.
              <a href={fileUrl}>여기에서 PDF를 다운로드하세요.</a>
            </VisualizeDocumentPDF>
            <PopupInnerContentInfo>
              {reasons.map((reason, index) => (
                <div key={index}>
                  페이지: {reason.page}, 내용: {reason.content}
                </div>
              ))}
            </PopupInnerContentInfo>
          </PopupInnerContentSet>
        </PopupInnerContent>
      </PopupContent>
    </PopupOverlay>
  );
}

export default DocumentReviewPopUp;
