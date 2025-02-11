import React, { useEffect, useState, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import axios from "axios";
import xicon from "../../assets/X.png";

const shrinkExpand = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.90);
  }
  100% {
    transform: scale(1);
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  width: 70%;
  height: 93%;
  background-color: white;
  border-radius: 5px 5px 0 0;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PopupContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 97%;
  height: 5%;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
`;

const PopupContentTopSubmit = styled.div`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 50%;
  height: 100%;
  gap: 1rem;
`;

const PopupContentTopSubmitButton = styled.button`
  width: auto%;
  height: 100%;
  font-size: 2rem;
  font-weight: 600;
  border: none;
  border-radius: 5px 5px 0px 0px;
  padding: 0 20px;
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? "white" : "white")};
  color: ${({ isSelected }) =>
    isSelected ? "rgb(66, 84, 166)" : "rgba(0, 0, 0, 0.3)"};
  position: relative;
  transition: background-color 0.3s ease, color 0.3s ease;

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: rgba(0, 0, 0, 0.8);
    `};
`;

const PopupContentTopRight = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 49%;
  height: 100%;
  gap: 2%;
`;

const PopupContentTopRightX = styled.img`
  width: 2.2rem;
  height: auto;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const PopupInnerContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 96%;
  background-color: none;
`;

const PopupInnerContentSet = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 97%;
  height: 95%;
`;

const VisualizeDocumentPDFBox = styled.div`
  width: 60%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.18);
`;

const VisualizeDocumentPDF = styled.iframe`
  width: 98%;
  height: 98%;
`;

const PopupInnerContentUserInfoSet = styled.div`
  width: 38%;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: column;
  gap: 7rem;
  background-color: rgba(185, 223, 255, 0.25);
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
`;

const ApplySet = styled.div`
  width: 100%;
  height: 40%;
  background-color: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ReasonsSet = styled.div`
  width: 100%;
  height: 45%;
  background-color: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ApplyInfo = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20%;
  border: none;
  font-size: 2rem;
  font-weight: 600;
  background-color: none;
  border-bottom: 3px solid rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;
`;

const ApplyInfoText = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: auto;
  height: 100%;
  background-color: none;
  border-bottom: 3px solid rgb(66, 84, 166);
`;

const PopupInnerContentText = styled.div`
  width: 80%;
  height: 50%;
  padding: 2rem;
  box-shadow: 0px 3px 10px 2px rgba(11, 7, 7, 0.18);
  font-size: 1.8rem;
  font-weight: 500;
  background-color: white;
  resize: none;
  border: none;
  gap: 2rem;
  div {
    width: 100%;
    height: 22%;
  }
`;

const PopupInnerContentInfoDiv = styled.div`
  width: 85%;
  height: 80%;
  color: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  box-shadow: 0px 3px 10px 2px rgba(0, 0, 0, 0.18);
  font-size: 1.8rem;
  font-weight: 500;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
`;

const PopupInnerContentInfoText = styled.textarea`
  width: 80%;
  height: 80%;
  padding: 2rem;
  box-shadow: 0px 3px 10px 2px rgba(0, 0, 0, 0.18);
  font-size: 1.7rem;
  font-weight: 500;
  background-color: white;
  resize: none;
  border: none;
  letter-spacing: 0px;
`;

const SMSButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 60%;
  background-color: ${({ smsSent }) =>
    smsSent ? "rgba(0, 0, 0, 0.05)" : "rgb(255, 192, 192)"};
  color: rgba(0, 0, 0, 1);
  font-size: 1.6rem;
  font-weight: 600;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ smsSent }) =>
      smsSent ? "rgba(0, 0, 0, 0.05)" : "rgb(226, 226, 226)"};
  }
`;

const SaveButton = styled.button`
  margin-top: 2rem;
  padding: 0.5rem 2rem;
  background-color: rgb(196, 207, 255);
  color: white;
  border: none;
  width: 89.5%;
  height: 10%;
  border-radius: 3px;
  font-size: 1.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(142, 163, 255);
  }
`;

function DocumentReviewPopUp({
  onClose,
  selectedId,
  documentType,
  name,
  department,
  applicant_type,
  id,
}) {
  const [fileUrl, setFileUrl] = useState("");
  const [reasons, setReasons] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [inputText, setInputText] = useState("");
  const [activeDocumentState, setActiveDocumentState] = useState("");
  const underlineRef = useRef(null);

  useEffect(() => {
    const LoadData = async () => {
      try {
        console.log("Selected ID:", selectedId);
        console.log("Document Type:", documentType);

        const response = await axios.get(
          `http://3.37.240.199/api/students/${selectedId}/${documentType}/`
        );
        const data = response.data;

        setDocuments(data);

        if (data.length > 0) {
          const firstDocument = data[0];
          setFileUrl(firstDocument.file);
          setReasons(
            firstDocument.document_pass_fails.map((fail) => ({
              page: fail.page,
              content: fail.failed_condition,
            }))
          );
          setActiveButtonIndex(0);
          setActiveDocumentState(firstDocument.state);
        }
      } catch (error) {
        console.error("서류데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    LoadData();
  }, [selectedId, documentType]);

  useEffect(() => {
    if (reasons && reasons.length > 0) {
      const defaultText = reasons.map((reason) => reason.content).join("\n");
      setInputText(defaultText);
    } else {
      setInputText("");
    }
  }, [reasons]);

  useEffect(() => {
    const activeButton = document.querySelector(
      `#submit-button-${activeButtonIndex}`
    );
    if (activeButton && underlineRef.current) {
      underlineRef.current.style.left = `${activeButton.offsetLeft}px`;
      underlineRef.current.style.width = `${activeButton.offsetWidth}px`;
    }
  }, [activeButtonIndex]);

  const handleDocumentClick = (index) => {
    const document = documents[index];
    setFileUrl(document.file);
    setReasons(
      document.document_pass_fails.map((fail) => ({
        page: fail.page,
        content: fail.failed_condition,
      }))
    );
    setActiveButtonIndex(index);
    setActiveDocumentState(document.state);
    setIsSelected(true);
  };

  const handleSave = async () => {
    try {
      console.log("저장할 서류 부적합 사유:", inputText);
      alert("저장이 완료되었습니다!");
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("저장 실패");
    }
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
                  id={`submit-button-${reversedDocs.length - 1 - index}`}
                  key={index}
                  isSelected={
                    activeButtonIndex === reversedDocs.length - 1 - index
                  }
                  onClick={() =>
                    handleDocumentClick(reversedDocs.length - 1 - index)
                  }
                >
                  {index === 0 ? "제출" : `재제출${index}`}
                </PopupContentTopSubmitButton>
              ))}
            <div
              ref={underlineRef}
              style={{
                position: "absolute",
                bottom: 0,
                height: "3px",
                backgroundColor: "rgb(66, 84, 166)",
                transition: "left 0.3s ease, width 0.3s ease",
              }}
            />
          </PopupContentTopSubmit>
          <PopupContentTopRight>
            <PopupContentTopRightX src={xicon} alt="X" onClick={onClose} />
          </PopupContentTopRight>
        </PopupContentTop>
        <PopupInnerContent>
          <PopupInnerContentSet>
            <VisualizeDocumentPDFBox>
              <VisualizeDocumentPDF
                title="PDF Viewer"
                src={fileUrl ? `${fileUrl}#toolbar=0&zoom=130` : "about:blank"}
                width="100%"
                height="100%"
              >
                이 브라우저는 PDF 파일을 지원하지 않습니다.
                <a href={fileUrl}>여기에서 PDF를 다운로드하세요.</a>
              </VisualizeDocumentPDF>
            </VisualizeDocumentPDFBox>
            <PopupInnerContentUserInfoSet>
              <ApplySet>
                <ApplyInfo>
                  <ApplyInfoText>지원자 정보</ApplyInfoText>
                </ApplyInfo>
                <PopupInnerContentText>
                  <div>이름ㅤㅤ ㅤ: ㅤ{name}</div>
                  <div>수험번호 ㅤ: ㅤ{id}</div>
                  <div>학과 ㅤㅤㅤ: ㅤ{department}</div>
                  <div>전형ㅤㅤㅤ : ㅤ{applicant_type}</div>
                  <div>서류ㅤㅤㅤ :ㅤ {documentType}</div>
                </PopupInnerContentText>
              </ApplySet>
              <ReasonsSet>
                <ApplyInfo>
                  <ApplyInfoText>서류 부적합 사유</ApplyInfoText>
                  {activeDocumentState === "검토" && (
                    <SMSButton
                      smsSent={smsSent}
                      onClick={() => setSmsSent(true)}
                    >
                      {smsSent ? "전송 완료" : "재제출 문자 전송"}
                    </SMSButton>
                  )}
                </ApplyInfo>
                {activeDocumentState === "제출" ? (
                  <PopupInnerContentInfoDiv>
                    {inputText.trim() === "" ? "없음" : inputText}
                  </PopupInnerContentInfoDiv>
                ) : (
                  <PopupInnerContentInfoText
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="서류 부적합 사유를 입력해주세요."
                  />
                )}
                {activeDocumentState !== "제출" && (
                  <SaveButton onClick={handleSave}>저장</SaveButton>
                )}
              </ReasonsSet>
            </PopupInnerContentUserInfoSet>
          </PopupInnerContentSet>
        </PopupInnerContent>
      </PopupContent>
    </PopupOverlay>
  );
}

export default DocumentReviewPopUp;
