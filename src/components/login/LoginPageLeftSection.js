import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import logoicon from "../../assets/aims_logo.png";

// 글로벌 스타일로 웹 폰트 정의
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SBAggroB';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroM.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;

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
  gap: 1.5rem;
`;

const LoginContainerContentLeftTitle = styled.div`
  font-size: 4.5rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  font-family: "SBAggroB", sans-serif;
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
  gap: 1.5rem;
`;

const LoginContainerContentLeftUnviEnText = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);

  span {
    font-weight: bold;
  }
`;

const LoginContainerContentLeftUnviKoText = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
`;

function LoginPageLeftSection() {
  return (
    <>
      <GlobalStyle />
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
            <span>A</span>dmission <span>I</span>nformation <span>M</span>
            anagement <span>S</span>ystem
          </LoginContainerContentLeftUnviEnText>
          <LoginContainerContentLeftUnviKoText>
            한국대학교 입학 정보 관리 시스템
          </LoginContainerContentLeftUnviKoText>
        </LoginContainerContentLeftUnviTextSet>
      </LoginContainerContentLeft>
    </>
  );
}

export default LoginPageLeftSection;
