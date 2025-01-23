import React from "react";
import styled from "styled-components";

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
  font-family: "SBAggro", sans-serif;
`;

function LoginPageTopBar() {
  return (
    <LoginPageContainerTop>
      <LoginPageContainerLogo>AIMS</LoginPageContainerLogo>
    </LoginPageContainerTop>
  );
}

export default LoginPageTopBar;
