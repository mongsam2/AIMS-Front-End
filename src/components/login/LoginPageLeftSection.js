import React from "react";
import styled from "styled-components";
import logoicon from "../../assets/aims_logo.png";

const LoginContainerContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
`;

const LoginContainerContentLogoIcon = styled.img`
  width: 23%;
  height: 23%;
`;

const LoginContainerContentLeftTitleSet = styled.div`
  width: 50%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const LoginContainerContentLeftTitle = styled.div`
  font-size: 5rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  font-family: "SBAggro", sans-serif;
`;

const LoginContainerContentLeftUnviName = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
`;

const LoginContainerContentLeftUnviTextSet = styled.div`
  width: 50%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const LoginContainerContentLeftUnviEnText = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
`;

const LoginContainerContentLeftUnviKoText = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
`;

function LoginPageLeftSection() {
  return (
    <LoginContainerContentLeft>
      <LoginContainerContentLogoIcon src={logoicon} alt="logoicon" />
      <LoginContainerContentLeftTitleSet>
        <LoginContainerContentLeftTitle>AIMS</LoginContainerContentLeftTitle>
        <LoginContainerContentLeftUnviName>
          한국대학교
        </LoginContainerContentLeftUnviName>
      </LoginContainerContentLeftTitleSet>
      <LoginContainerContentLeftUnviTextSet>
        <LoginContainerContentLeftUnviEnText>
          Admission Information Management System
        </LoginContainerContentLeftUnviEnText>
        <LoginContainerContentLeftUnviKoText>
          한국대학교 입학 정보 관리 시스템
        </LoginContainerContentLeftUnviKoText>
      </LoginContainerContentLeftUnviTextSet>
    </LoginContainerContentLeft>
  );
}

export default LoginPageLeftSection;
