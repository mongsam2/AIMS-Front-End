import React from "react";
import styled from "styled-components";

const MainContainerTop = styled.div`
  width: 96%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1%;
`;

const Logo = styled.p`
  font-size: 2rem;
  color: white;
  font-family: "SBAggro", sans-serif;
`;

const LogoutButton = styled.button`
  font-size: 1.3rem;
  color: rgb(224, 224, 224);
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: transparent;

  &:hover {
    color: rgba(114, 152, 255, 0.3);
  }
`;

function MainPageTopBar() {
  const handleLogout = () => {
    window.location.href = "/login";
  };
  return (
    <MainContainerTop>
      <Logo>AIMS</Logo>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </MainContainerTop>
  );
}

export default MainPageTopBar;
