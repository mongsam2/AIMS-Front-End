import { Container, MainContent } from "../components/common/Layout";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import MiddleContent from "../components/document-review/MiddleContent";
import UnsuitableChoice from "../components/document-review/UnsuitableChoice";
import DocumentReviewTable from "../components/document-review/DocumentReviewTable";
import { useState } from "react";

function DocumentReview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [admissionType, setAdmissionType] = useState("전체");
  const [filter, setFilter] = useState("unsuit");

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header title="입학 서류 검토" />
        <MiddleContent
          onSearchTermChange={setSearchTerm}
          onAdmissionTypeChange={setAdmissionType}
        />
        <UnsuitableChoice onFilterChange={setFilter} />
        <DocumentReviewTable
          searchTerm={searchTerm}
          admissionType={admissionType}
          filter={filter}
        />
      </MainContent>
    </Container>
  );
}

export default DocumentReview;
