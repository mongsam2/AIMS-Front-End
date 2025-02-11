import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import logoicon from "../../assets/logo_3d1.png";

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
  margin-left: 40px;
  width: 23%;
  height: auto;
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

const LoginContainerContentLeftTitleSet1 = styled.div`
  display: flex;
  flex-direction: row;
`;

const LoginContainerContentLeftTitle1 = styled.div`
  font-size: 4.5rem;
  font-weight: bold;
  color: #0070ce;
  font-family: "SBAggroB", sans-serif;
  width: auto;
`;

const LoginContainerContentLeftTitle2 = styled.div`
  font-size: 4.5rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  font-family: "SBAggroB", sans-serif;
  width: auto;
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
  font-size: 2rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);

  span {
    font-weight: bold;
    font-size: 2.2rem;
  }
`;

const LoginContainerContentLeftUnviKoText = styled.div`
  font-size: 1.75rem;
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
          <LoginContainerContentLeftTitleSet1>
            <LoginContainerContentLeftTitle1>
              AI
            </LoginContainerContentLeftTitle1>
            <LoginContainerContentLeftTitle2>
              MS
            </LoginContainerContentLeftTitle2>
          </LoginContainerContentLeftTitleSet1>
          <LoginContainerContentLeftUnviName>
            업스대학교
          </LoginContainerContentLeftUnviName>
        </LoginContainerContentLeftTitleSet>
        <LoginContainerContentLeftUnviTextSet>
          <LoginContainerContentLeftUnviEnText>
            <span>A</span>dmission <span>I</span>nformation <span>M</span>
            anagement <span>S</span>ystem
          </LoginContainerContentLeftUnviEnText>
          <LoginContainerContentLeftUnviKoText>
            업스대학교 입학 정보 관리 시스템
          </LoginContainerContentLeftUnviKoText>
        </LoginContainerContentLeftUnviTextSet>
      </LoginContainerContentLeft>
    </>
  );
}

export default LoginPageLeftSection;
