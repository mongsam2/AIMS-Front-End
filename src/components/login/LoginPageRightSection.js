import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const LoginContainerContentRight = styled.div`
  width: 40%;
  max-width: 700px;
  min-width: 400px;
  height: 100%;
  min-height: 460px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #182044, #3c50aa);
  border-radius: 0 32px 32px 0;
  padding: 40px 20px;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const LoginContainerContentRightTitle = styled.div`
  width: 100%;
  margin-bottom: 30px;
  font-size: clamp(24px, 2.5vw, 36px);
  font-weight: bold;
  color: #ffffff;
  text-align: left;
`;

const FieldSet = styled.div`
  width: 100%;
  max-width: 480px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  width: 100%;
  border: none;
  border-radius: 8px;
  background-color: #d3e3fe;
`;

const ButtonSet = styled.div`
  width: 100%;
  max-width: 480px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  background-color: #3c50aa;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.95);
  }
`;

const MessageSet = styled.div`
  width: 100%;
  max-width: 480px;
  text-align: center;
`;

const Message = styled.div`
  font-size: 16px;
  color: rgb(249, 118, 118);
`;

function LoginPageRightSection() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const getCSRFToken = async () => {
    const response = await axios.get("http://3.37.240.199/api/users/csrf/", {
      withCredentials: true,
    });
    return response.data.csrfToken;
  };

  const handleLoginClick = async () => {
    window.location.href = "/main";
  };

  const handleAdminClick = async () => {
    window.location.href = "/admin";
  };

  return (
    <LoginContainerContentRight>
      <LoginContainerContentRightTitle>로그인</LoginContainerContentRightTitle>

      <FieldSet>
        <Label>ID</Label>
        <Input
          placeholder="아이디를 입력하시오"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FieldSet>

      <FieldSet>
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="비밀번호를 입력하시오"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FieldSet>

      <ButtonSet>
        <Button onClick={handleLoginClick}>로그인</Button>
      </ButtonSet>

      <ButtonSet>
        <Button onClick={handleAdminClick}>관리자 로그인</Button>
      </ButtonSet>

      <MessageSet>
        <Message>{loginMessage}</Message>
      </MessageSet>
    </LoginContainerContentRight>
  );
}

export default LoginPageRightSection;