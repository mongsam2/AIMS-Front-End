import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo_3d1.png";
import icon1 from "../../assets/aims1.png";
import icon2 from "../../assets/aims2.png";
import icon3 from "../../assets/aims3.png";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 4.2%;
  min-width: 80px; /* 최소 너비 지정 */
  background-color: #112059;
  height: 100vh;
  border-radius: 0 1rem 0rem 0;
  overflow-y: auto;

  @media (max-width: 1400px) {
    width: 80px; /* 고정 너비 */
  }
`;

const SidebarLogo = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  margin-top: 30%;
  img {
    width: 70%;
    cursor: pointer;
  }
`;

const SidebarMenu = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem; /* ✅ 고정 간격 대신 유연한 간격 유지 */
  padding: 1rem 0;
`;

const SidebarButton1 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  border-radius: 10px;
  border: none;
  background-color: #7696cf;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    background-color: #7696cf;
  }
`;

const SidebarButton2 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  border-radius: 10px;
  border: none;
  background-color: #7696cf;
  transition: transform 0.2s;
`;

const SidebarButton3 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  border-radius: 10px;
  border: none;
  background-color: #7696cf;
  transition: transform 0.2s;
`;

const ButtonIcon = styled.img`
  width: 3.2rem;
  height: auto;

  @media (max-height: 700px) {
    width: 2.6rem;
  }

  @media (max-height: 500px) {
    width: 2.2rem;
  }
`;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate("/main");
  };

  const handleSideButtonClick1 = () => {
    navigate("/document-review");
  };

  const handleSideButtonClick2 = () => {
    navigate("/student-record");
  };

  const handleSideButtonClick3 = () => {
    navigate("/essay-test");
  };

  const getButtonBackgroundColor = (path) => {
    return location.pathname === path ? "#7696cf" : "#182044";
  };

  return (
    <SidebarContainer>
      <SidebarLogo>
        <img src={logo} alt="logo" onClick={handleLogoClick} />
      </SidebarLogo>
      <SidebarMenu>
        <SidebarButton1
          onClick={handleSideButtonClick1}
          style={{
            backgroundColor: getButtonBackgroundColor("/document-review"),
          }}
        >
          <ButtonIcon src={icon2} alt="icon" />
        </SidebarButton1>
        <SidebarButton2
          onClick={handleSideButtonClick2}
          style={{
            backgroundColor: getButtonBackgroundColor("/student-record"),
          }}
        >
          <ButtonIcon src={icon1} alt="icon" />
        </SidebarButton2>
        <SidebarButton3
          onClick={handleSideButtonClick3}
          style={{ backgroundColor: getButtonBackgroundColor("/essay-test") }}
        >
          <ButtonIcon src={icon3} alt="icon" />
        </SidebarButton3>
      </SidebarMenu>
    </SidebarContainer>
  );
}

export default Sidebar;
