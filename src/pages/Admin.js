import {
  MainPageContainer,
  MainPageContent,
} from "../components/common/Layout";
import MainPageTopBar from "../components/main/MainPageTopBar";
import AdminPageContentElement from "../components/main/AdminPageContentElement";

function MainPage() {
  return (
    <MainPageContainer>
      <MainPageTopBar />
      <MainPageContent>
        <AdminPageContentElement />
      </MainPageContent>
    </MainPageContainer>
  );
}

export default MainPage;
