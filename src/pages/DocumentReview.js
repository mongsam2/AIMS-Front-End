import { Container, MainContent } from "../components/common/Layout";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import MiddleContent from "../components/document-review/MiddleContent";
import UnsuitableChoice from "../components/document-review/UnsuitableChoice";
import DocumentReviewTable from "../components/document-review/DocumentReviewTable";
import { useState } from "react";

function DocumentReview() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header title="입학 서류 검토" />
        <MiddleContent onSearchTermChange={setSearchTerm} />
        <UnsuitableChoice />
        <DocumentReviewTable searchTerm={searchTerm} />
      </MainContent>
    </Container>
  );
}

export default DocumentReview;
