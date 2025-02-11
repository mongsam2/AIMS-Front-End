import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 7%;
`;

const Title = styled.h1`
  color: var(--Gray-900, #222834);
  font-size: 2.6rem;
  font-weight: 700;
  margin-left: 30px;
`;

const TopBarRight = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 30px;
  width: 20%;
  height: 100%;
`;

const ProfileName = styled.span`
  font-size: 1.5rem;
  color: var(--Gray-900, #222834);
  width: 88px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3%;
  gap: 0.1em;
`;

const LogoutButton = styled.button`
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.7);
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 120px;
  height: 30px;
  &:hover {
    color: rgba(0, 0, 0, 1);
    font-weight: 600;
  }
`;

function Header({ title }) {
  const navigate = useNavigate();
  const [profileUsername, setProfileUsername] = useState("");

  useEffect(() => {
    axios
      .get("http://3.37.240.199/api/users/profile/", { withCredentials: true })
      .then((response) => setProfileUsername(response.data.username))
      .catch((error) =>
        console.error("프로필 정보를 가져오는 중 오류 발생:", error)
      );
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <TopBarContainer>
      <Title>{title}</Title>
      <TopBarRight>
        <ProfileName>
          {profileUsername ? `${profileUsername}` : "이름없음"}
          <p style={{ color: "rgb(0,0,0,0.7)" }}>님</p>
        </ProfileName>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </TopBarRight>
    </TopBarContainer>
  );
}

export default Header;
