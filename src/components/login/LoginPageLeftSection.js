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
  margin-left: 2vw;
  width: clamp(100px, 15vw, 200px);
  height: auto;
`;

const LoginContainerContentLeftTitleSet = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: clamp(1rem, 2vw, 2rem);
  margin-top: 2vh;
`;

const LoginContainerContentLeftTitleSet1 = styled.div`
  display: flex;
  flex-direction: row;
`;

const LoginContainerContentLeftTitle1 = styled.div`
  font-size: clamp(2.5rem, 4vw, 4.5rem);
  font-weight: bold;
  color: #0070ce;
  font-family: "SBAggroB", sans-serif;
`;

const LoginContainerContentLeftTitle2 = styled.div`
  font-size: clamp(2.5rem, 4vw, 4.5rem);
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  font-family: "SBAggroB", sans-serif;
`;

const LoginContainerContentLeftUnviName = styled.div`
  font-size: clamp(1.2rem, 2vw, 2rem);
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
`;

const LoginContainerContentLeftUnviTextSet = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: clamp(1rem, 1.5vh, 2rem);
  margin-top: 2vh;
`;

const LoginContainerContentLeftUnviEnText = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: clamp(1rem, 1.8vw, 2rem);
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
`;

const LoginContainerContentLeftUnviKoText = styled.div`
  font-size: clamp(1rem, 1.5vw, 1.75rem);
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
`;

const AimsTextSpanContainer = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: bold;
    font-size: clamp(1.2rem, 2vw, 2.2rem);
  }
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
            <AimsTextSpanContainer><span>A</span>dmission <span>I</span>nformation</AimsTextSpanContainer>
            <AimsTextSpanContainer><span>M</span>anagement <span>S</span>ystem</AimsTextSpanContainer>
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
