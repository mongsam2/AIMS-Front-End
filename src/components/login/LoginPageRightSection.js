import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const LoginContainerContentRight = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #182044, #3c50aa);
  border-radius: 0 2rem 2rem 0;
`;

const LoginContainerContentRightTitle = styled.div`
  width: 80%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  font-size: 2.8rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
`;

const LoginContainerContentLoginSetIdSet = styled.div`
  width: 80%;
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: left;
`;

const LoginContainerContentLoginSetIdText = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
`;

const LoginContainerContentLoginSetIdInput = styled.input`
  padding-left: 1rem;
  font-size: 1.6rem;
  width: 90%;
  height: 35%;
  border: none;
  border-radius: 0.5rem;
  background-color: #d3e3fe;
`;

const LoginContainerContentLoginSetPwSet = styled.div`
  width: 80%;
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: left;
`;

const LoginContainerContentLoginSetPwSetPwText = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
`;

const LoginContainerContentLoginSetPwInput = styled.input`
  padding-left: 1rem;
  font-size: 1.6rem;
  width: 90%;
  height: 35%;
  border: none;
  border-radius: 0.5rem;
  background-color: #d3e3fe;
`;

const LoginContainerContentLoginSetLoginButtonSet = styled.div`
  width: 80%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;

const LoginContainerContentLoginSetLoginButton = styled.button`
  width: 90%;
  height: 70%;
  font-size: 1.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background-color: #3c50aa;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.95);
  }
`;

const LoginContainerContentLoginFalseTextSet = styled.div`
  width: 80%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginContainerContentLoginFalseText = styled.div`
  font-size: 1.5rem;
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
    try {
      const csrfToken = await getCSRFToken(); 
      const response = await axios.post(
        "http://3.37.240.199/api/users/login/",
        {
          username,
          password,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );

      if (response && response.data) {
        setLoginMessage(response.data.message);
        if (username === "aims") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/main";
        }
      } else {
        setLoginMessage("서버로부터 유효한 응답을 받지 못했습니다.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setLoginMessage("아이디 또는 비밀번호가 틀렸습니다.");
      } else {
        setLoginMessage("로그인 요청 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <LoginContainerContentRight>
      <LoginContainerContentRightTitle>
        <div className="login-container-content-right-title-text">로그인</div>
      </LoginContainerContentRightTitle>
      <LoginContainerContentLoginSetIdSet>
        <LoginContainerContentLoginSetIdText>
          ID
        </LoginContainerContentLoginSetIdText>
        <LoginContainerContentLoginSetIdInput
          placeholder="아이디를 입력하시오"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </LoginContainerContentLoginSetIdSet>
      <LoginContainerContentLoginSetPwSet>
        <LoginContainerContentLoginSetPwSetPwText>
          Password
        </LoginContainerContentLoginSetPwSetPwText>
        <LoginContainerContentLoginSetPwInput
          type="password"
          placeholder="비밀번호를 입력하시오"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </LoginContainerContentLoginSetPwSet>
      <LoginContainerContentLoginSetLoginButtonSet>
        <LoginContainerContentLoginSetLoginButton onClick={handleLoginClick}>
          로그인
        </LoginContainerContentLoginSetLoginButton>
      </LoginContainerContentLoginSetLoginButtonSet>
      <LoginContainerContentLoginFalseTextSet>
        <LoginContainerContentLoginFalseText>
          {loginMessage}
        </LoginContainerContentLoginFalseText>
      </LoginContainerContentLoginFalseTextSet>
    </LoginContainerContentRight>
  );
}

export default LoginPageRightSection;
