import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const MainContent = styled.div`
  width: 100%; 
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  gap: 0px;
  justify-content: left;
  background-color: rgba(0, 0, 0, 0.04);
`;

export const EssayTestContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 94%;
`;

export const StudentRecordContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 94%;
  background-color: white;
`;

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background: linear-gradient(to bottom, #3c50aa, #182044);
  box-sizing: border-box;
`;

export const MainPageContent = styled.div`
  width: 100%;
  max-width: 1280px;
  min-height: 430px;
  min-width: 800px;
  height: 80%;
  border-radius: 32px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 1000px rgba(0, 0, 0, 0.6);
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
`;


export const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #3c50aa, #182044);
`;

export const LoginPageContent = styled.div`
  width: 90%;
  height: 80%;
  border-radius: 2rem;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 0 1000px rgba(0, 0, 0, 0.6);
`;
