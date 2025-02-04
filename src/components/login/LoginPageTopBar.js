import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SBAggroB';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroM.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;

const LoginPageContainerTop = styled.div`
  width: 96%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1%;
`;

const LoginPageContainerLogo = styled.p`
  font-size: 2rem;
  color: white;
  font-family: "SBAggroB", sans-serif;
`;

function LoginPageTopBar() {
  return (
    <>
      <GlobalStyle />
      <LoginPageContainerTop>
        <LoginPageContainerLogo>AIMS</LoginPageContainerLogo>
      </LoginPageContainerTop>
    </>
  );
}

export default LoginPageTopBar;
