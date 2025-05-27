import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import icon1 from "../../assets/aims1.png";
import icon2 from "../../assets/aims2.png";
import icon3 from "../../assets/aims3.png";

const MainContainerInfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
`;

const AdminInfo = styled.p`
  color: rgba(0, 0, 0, 0.7);
  margin: 0 4px;
  font-size: 16px;
`;

const MainInfoContainerText = styled.div`
  color: #000;
  font-size: clamp(20px, 2vw, 32px);
  font-weight: bold;
  width: 100%;
  text-align: center;
`;

const MainContainerContentChoice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 40px;
  flex-wrap: wrap;
`;

const MainContainerContentChoiceItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 200px;
  gap: 12px;
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #a9d1f8;
    color: white;
  }

  &:active {
    transform: scale(0.95);
    transition: transform 0.1s ease;
  }
`;

const MainPageItemIcon = styled.img`
  width: clamp(100px, 10vw, 140px);
  height: clamp(100px, 10vw, 140px);
`;

const MainPageItemText = styled.p`
  color: rgba(0, 0, 0, 0.8);
  font-weight: bold;
  font-size: clamp(16px, 1.6vw, 22px);
  text-align: center;
  margin: 0;
`;

const MainContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 70%;
  width: 100%;
`;

function MainPageContentElement() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get("http://3.37.240.199/api/users/profile/", { withCredentials: true })
      .then((response) => setUsername(response.data.username))
      .catch((error) => console.error("Error fetching user profile:", error));
  }, []);

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
        <AdminInfo>{username}</AdminInfo>
        <AdminInfo></AdminInfo>
      </MainContainerInfoTop>
      <MainContentGroup>
        <MainInfoContainerText>담당 업무를 선택하세요</MainInfoContainerText>
      <MainContainerContentChoice>
        <MainContainerContentChoiceItem onClick={handleDocumentReviewClick}>
          <MainPageItemIcon src={icon2} alt="icon" />
          <MainPageItemText>입학 서류 검토</MainPageItemText>
        </MainContainerContentChoiceItem>
        <MainContainerContentChoiceItem onClick={handleStudentRecordClick}>
          <MainPageItemIcon src={icon1} alt="icon" />
          <MainPageItemText>생활기록부 및 면접 평가</MainPageItemText>
        </MainContainerContentChoiceItem>
        <MainContainerContentChoiceItem onClick={handleEssayTestClick}>
          <MainPageItemIcon src={icon3} alt="icon" />
          <MainPageItemText>논술</MainPageItemText>
        </MainContainerContentChoiceItem>
      </MainContainerContentChoice>
      </MainContentGroup>
    </>
  );
}

export default MainPageContentElement;