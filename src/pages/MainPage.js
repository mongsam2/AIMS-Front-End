import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuButton from "../components/MenuButton";

import load_data_icon from "../assets/load_data.png";
import document_icon from "../assets/document.png";
import essay_icon from "../assets/essay.png";
import student_record_icon from "../assets/student_record.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 0px 20px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  padding: 40px 0px;
`;

const Button = styled.a`
  color: #868FA0;
  font-size: 14px;
  font-weight: bold;  
`;

const MenuButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
`; 

function MainPage() {
  

  return (
    <Container>
      <Header>
        <Button>로그아웃</Button>
        <Button>나교육님</Button>
      </Header>
      <Title>담당 업무를 선택하세요</Title>
      <MenuButtonContainer>
        <MenuButton title="데이터 불러오기" icon={load_data_icon} />
        <Link to="/document-review">
          <MenuButton title="입학 서류 검토" icon={document_icon} />
        </Link>
        <Link to="/student-record">
          <MenuButton title="학교생활기록부" icon={student_record_icon} />
        </Link>
        <Link to="/essay-test">
          <MenuButton title="논술" icon={essay_icon} />
        </Link>
      </MenuButtonContainer>
    </Container>
  );
}

export default MainPage;
