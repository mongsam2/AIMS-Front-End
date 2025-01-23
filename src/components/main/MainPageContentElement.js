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

function MainPageContentElement({}) {
  const handleDocumentReviewClick = () => {
    window.location.href = "/document-review";
  };

  const handleStudentRecordClick = () => {
    window.location.href = "/student-record";
  };

  const handleEssayTestClick = () => {
    window.location.href = "/essay-test";
  };
  return (
    <>
      <MainContainerInfoTop>
        <HelpIcon src={helpicon} alt="help-icon" />
        <AdminInfo>차은우님</AdminInfo>
      </MainContainerInfoTop>
      <MainInfoContainerText>담당 업무를 선택하세요</MainInfoContainerText>
      <MainContainerContentChoice>
        <MainContainerContentChoiceItem onClick={handleDocumentReviewClick}>
          <MainPageItemIcon src={icon} alt="icon" />
          <MainPageItemText>입학 서류 검토</MainPageItemText>
        </MainContainerContentChoiceItem>
        <MainContainerContentChoiceItemLine />
        <MainContainerContentChoiceItem onClick={handleStudentRecordClick}>
          <MainPageItemIcon src={icon} alt="icon" />
          <MainPageItemText>생활기록부 및 면접 평가</MainPageItemText>
        </MainContainerContentChoiceItem>
        <MainContainerContentChoiceItemLine />
        <MainContainerContentChoiceItem onClick={handleEssayTestClick}>
          <MainPageItemIcon src={icon} alt="icon" />
          <MainPageItemText>논술</MainPageItemText>
        </MainContainerContentChoiceItem>
      </MainContainerContentChoice>
    </>
  );
}

export default MainPageContentElement;
