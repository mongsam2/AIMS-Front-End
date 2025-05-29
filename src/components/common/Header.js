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
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-left: 2rem;

  @media (max-width: 1200px) {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
    margin-left: 0;
  }
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
  font-size: 1.3rem;
  color: #222834;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  margin-right: 1rem;

  @media (max-width: 1400px) {
    font-size: 1.1rem;
  }

  @media (max-width: 1200px) {
    font-size: 1rem;
  }

  @media (max-width: 1000px) {
    font-size: 0.9rem;
  }
`;


const LogoutButton = styled.button`
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.7);
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    color: rgba(0, 0, 0, 1);
    font-weight: 600;
  }

  @media (max-width: 1400px) {
    font-size: 1.1rem;
  }

  @media (max-width: 1200px) {
    font-size: 1rem;
  }

  @media (max-width: 1000px) {
    font-size: 0.9rem;
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
          {profileUsername ? `${profileUsername}` : "이재효"}
          <p style={{ color: "rgb(0,0,0,0.7)" }}>님</p>
        </ProfileName>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </TopBarRight>
    </TopBarContainer>
  );
}

export default Header;
