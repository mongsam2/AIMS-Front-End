import {
  LoginPageContainer,
  LoginPageContent,
} from "../components/common/Layout";
import LoginPageTopBar from "../components/login/LoginPageTopBar";
import LoginPageLeftSection from "../components/login/LoginPageLeftSection";
import LoginPageRightSection from "../components/login/LoginPageRightSection";

function Login() {
  return (
    <LoginPageContainer>
      <LoginPageTopBar />
      <LoginPageContent>
        <LoginPageLeftSection />
        <LoginPageRightSection />
      </LoginPageContent>
    </LoginPageContainer>
  );
}

export default Login;
