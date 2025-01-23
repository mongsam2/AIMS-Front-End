import { Container, MainContent } from "../components/common/Layout";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import MiddleContent from "../components/document-review/MiddleContent";
import UnsuitableChoice from "../components/document-review/UnsuitableChoice";
import DocumentReviewTable from "../components/document-review/DocumentReviewTable";
import BottomBar from "../components/document-review/BottomBar";

function DocumentReview() {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header title="입학 서류 검토" />
        <MiddleContent />
        <UnsuitableChoice />
        <DocumentReviewTable />
        <BottomBar />
      </MainContent>
    </Container>
  );
}

export default DocumentReview;
