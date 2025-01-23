import {
    Container,
    MainContent,
    EssayTestContent,
  } from "../components/common/Layout";
  import Header from "../components/common/Header";
  import ApplicantTable from "../components/common/ApplicantTable";
  import EssayTestPDFViewer from "../components/essay-test/EssayTestPDFViewer";
  import EssayTestEvaluation from "../components/essay-test/EssayTestEvaluation";
  import Sidebar from "../components/common/Sidebar";
  
  function EssayTest() {
    return (
      <Container>
        <Sidebar />
        <MainContent>
          <Header title="논술 채점" />
          <EssayTestContent>
            <ApplicantTable />
            <EssayTestPDFViewer />
            <EssayTestEvaluation />
          </EssayTestContent>
        </MainContent>
      </Container>
    );
  }
  
  export default EssayTest;
  