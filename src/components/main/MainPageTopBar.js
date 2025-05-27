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

const MainContainerTop = styled.div`
  width: 100%;
  max-width: 1240px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.p`
  font-size: 28px;
  color: white;
  font-family: "SBAggroB", sans-serif;
  margin: 0;
`;

const LogoutButton = styled.button`
  font-size: 16px;
  color: rgb(224, 224, 224);
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: transparent;
  &:hover {
    color: rgba(114, 152, 255, 0.7);
  }
`;

function MainPageTopBar() {
  const handleLogout = () => {
    window.location.href = "/";
  };
  return (
    <>
      <GlobalStyle />
      <MainContainerTop>
        <Logo>AIMS</Logo>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </MainContainerTop>
    </>
  );
}

export default MainPageTopBar;