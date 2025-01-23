import {
  MainPageContainer,
  MainPageContent,
} from "../components/common/Layout";
import MainPageTopBar from "../components/main/MainPageTopBar";
import MainPageContentElement from "../components/main/MainPageContentElement";

function MainPage() {
  return (
    <MainPageContainer>
      <MainPageTopBar />
      <MainPageContent>
        <MainPageContentElement />
      </MainPageContent>
    </MainPageContainer>
  );
}

export default MainPage;
