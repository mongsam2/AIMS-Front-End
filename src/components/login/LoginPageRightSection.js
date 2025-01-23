import React from "react";
import styled from "styled-components";

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
  font-size: 1.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
`;

const LoginContainerContentLoginSetIdInput = styled.input`
  padding-left: 1rem;
  font-size: 1.4rem;
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
  font-size: 1.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
`;

const LoginContainerContentLoginSetPwInput = styled.input`
  padding-left: 1rem;
  font-size: 1.4rem;
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
  const handleLoginClick = () => {
    window.location.href = "/main";
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
        <LoginContainerContentLoginSetIdInput placeholder="아이디를 입력하시오" />
      </LoginContainerContentLoginSetIdSet>
      <LoginContainerContentLoginSetPwSet>
        <LoginContainerContentLoginSetPwSetPwText>
          Password
        </LoginContainerContentLoginSetPwSetPwText>
        <LoginContainerContentLoginSetPwInput
          type="password"
          placeholder="비밀번호를 입력하시오"
        />
      </LoginContainerContentLoginSetPwSet>
      <LoginContainerContentLoginSetLoginButtonSet>
        <LoginContainerContentLoginSetLoginButton onClick={handleLoginClick}>
          로그인
        </LoginContainerContentLoginSetLoginButton>
      </LoginContainerContentLoginSetLoginButtonSet>
      <LoginContainerContentLoginFalseTextSet>
        <LoginContainerContentLoginFalseText>
          로그인에 실패하였습니다.
        </LoginContainerContentLoginFalseText>
      </LoginContainerContentLoginFalseTextSet>
    </LoginContainerContentRight>
  );
}

export default LoginPageRightSection;
