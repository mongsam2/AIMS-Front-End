import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: hwb(220 94% 2%);
  width: 100%;
  height: 6%;
`;

const Title = styled.h1`
  color: var(--Gray-900, #222834);
  font-size: 2.4rem;
  font-weight: 700;
  padding-left: 30px;
`;

const TopBarRight = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 25px;
  width: 20%;
  height: 100%;
`;

const Icon = styled.img`
  cursor: pointer;
  width: ${(props) => (props.type === "refresh" ? "7.5%" : "6.5%")};
  height: auto;
  margin-right: 8%;
`;

const ProfileName = styled.span`
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.7);
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2%;
`;

const LogoutButton = styled.button`
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.7);
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

function Header({ title }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <TopBarContainer>
      <Title>{title}</Title>
      <TopBarRight>
        <ProfileName>차은우님</ProfileName>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </TopBarRight>
    </TopBarContainer>
  );
}

export default Header;
