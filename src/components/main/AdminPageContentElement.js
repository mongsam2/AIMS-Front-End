import React from "react";
import styled from "styled-components";
import helpicon from "../../assets/help_icon.png";
import icon from "../../assets/file.png";

const MainContainerInfoTop = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 97%;
  height: 6%;
`;

const AdminInfo = styled.p`
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
  font-size: 1.3rem;
`;

const HelpIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1.5rem;
`;

const MainInfoContainerText = styled.div`
  color: rgba(0, 0, 0, 1);
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
  width: 97%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainerContentChoice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 97%;
  height: 60%;
  gap: 6%;
`;

const MainContainerContentChoiceItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  width: 20%;
  height: 90%;
  gap: 1rem;
  border-radius: 2rem;
  cursor: pointer;

  &:hover {
    background-color: #a9d1f8;
    color: white;
  }

  &:active {
    transform: scale(0.95);
    transition: transform 0.1s ease;
  }
`;

const MainContainerContentChoiceItemLine = styled.div`
  width: 1px;
  height: 40%;
  background-color: #3c50aa;
`;

const MainPageItemIcon = styled.img`
  width: 50%;
  height: 40%;
  margin-bottom: 10%;
`;

const MainPageItemText = styled.p`
  color: rgba(0, 0, 0, 0.8);
  font-weight: bold;
  font-size: 2rem;
`;

function AdminPageContentElement({}) {
  const handleDocumentReviewClick = () => {
    document.getElementById("document-upload").click();
  };

  const handleStudentRecordClick = () => {
    document.getElementById("student-record-upload").click();
  };

  const handleEssayTestClick = () => {
    document.getElementById("essay-upload").click();
  };

  const handleFileChange = (event, type) => {
    const files = event.target.files;
    // 각 타입에 따라 다른 로직을 구현합니다.
    if (type === "document") {
      // 입학 서류 업로드 로직
      console.log("Document files:", files);
    } else if (type === "studentRecord") {
      // 생활기록부 업로드 로직
      console.log("Student record files:", files);
    } else if (type === "essay") {
      // 논술 업로드 로직
      console.log("Essay files:", files);
    }
  };

  return (
    <>
      <MainContainerInfoTop>
        <HelpIcon src={helpicon} alt="help-icon" />
        <AdminInfo>어드민님</AdminInfo>
      </MainContainerInfoTop>
      <MainInfoContainerText>담당 업무를 선택하세요</MainInfoContainerText>
      <MainContainerContentChoice>
        <MainContainerContentChoiceItem onClick={handleDocumentReviewClick}>
          <input
            type="file"
            id="document-upload"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, "document")}
          />
          <MainPageItemIcon src={icon} alt="icon" />
          <MainPageItemText>입학 서류 업로드</MainPageItemText>
        </MainContainerContentChoiceItem>
        <MainContainerContentChoiceItemLine />
        <MainContainerContentChoiceItem onClick={handleStudentRecordClick}>
          <input
            type="file"
            id="student-record-upload"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, "studentRecord")}
          />
          <MainPageItemIcon src={icon} alt="icon" />
          <MainPageItemText>생활기록부 업로드</MainPageItemText>
        </MainContainerContentChoiceItem>
        <MainContainerContentChoiceItemLine />
        <MainContainerContentChoiceItem onClick={handleEssayTestClick}>
          <input
            type="file"
            id="essay-upload"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, "essay")}
          />
          <MainPageItemIcon src={icon} alt="icon" />
          <MainPageItemText>논술 업로드</MainPageItemText>
        </MainContainerContentChoiceItem>
      </MainContainerContentChoice>
    </>
  );
}

export default AdminPageContentElement;
