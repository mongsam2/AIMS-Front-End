import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import DocumentReviewPopUp from "./DocumentReviewPopUp";
import BottomBar from "./DocumentBottomBar";

const TableContainer = styled.div`
  width: 100%;
  height: 71%;
  overflow-x: auto;
  overflow-y: auto;
`;

const ReviewTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  background-color: #f2f2f2;
  height: 5%;
`;

const TableCellHeader = styled.div`
  width: ${({ width }) => width || "auto"};
  height: 100%;
  border: 1px solid #f7f9fc;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 1.2rem;
  color: ${({ color }) => color || "rgba(0, 0, 0, 0.9)"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor || "#F7F9FCCC"};
`;

const TableCell = styled.div`
  width: ${({ width }) => width || "auto"};
  height: 100%;
  border: 1px solid #f7f9fc;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 1.2rem;
  color: ${({ color }) => color || "rgba(0, 0, 0, 0.7)"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor || "white"};
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 95%;
`;

const TableRow = styled.div`
  display: flex;
  background-color: ${({ isChecked }) => (isChecked ? "#d3e3fe" : "white")};
  border-bottom: 1px solid #ddd;
  height: 10%;
`;

const TableButton = styled.button`
  width: 40%;
  height: 50%;
  background-color: ${({ bgColor }) => bgColor || "#f7f9fc"};
  color: ${({ color }) => color || "#c97a20"};
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
`;

function getButtonStyles(status) {
  switch (status) {
    case "미제출":
      return { bgColor: "#ffedef", color: "#ef5466" };
    case "검토":
      return { bgColor: "#fcf2e6", color: "#c97a20" };
    case "제출":
      return { bgColor: "#e1fcef", color: "#38a06c" };
    case "해당없음":
      return { bgColor: "#f9fafd", color: "rgba(0, 0, 0, 0.6)" };
    default:
      return { bgColor: "#f9fafd", color: "rgba(0, 0, 0, 0.6)" };
  }
}

function DocumentReviewTable({ searchTerm, searchCriteria }) {
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 페이지당 항목 수

  const handleExamineButtonClick = (status, id, documentType) => {
    if (status === "검토" || status === "제출") {
      setIsPopupOpen(true);
      setSelectedId(id);
      console.log("Document Type:", documentType);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;
    const updatedTableData = [...tableData];
    updatedTableData[index].isChecked = isChecked;
    setTableData(updatedTableData);
  };

  const loadData = async () => {
    try {
      const response = await axios.get("http://3.37.240.199/api/applicants/");
      const results = response.data.results.map((item) => {
        const documentStatus = item.documents.reduce((acc, doc) => {
          acc[doc.document_type] = { status: doc.status, id: doc.id };
          return acc;
        }, {});

        return {
          id: item.student_id,
          name: item.name,
          department: item.department,
          phone: item.phone,
          record: documentStatus["학생생활기록부"]?.status || "해당없음",
          record_id: documentStatus["학생생활기록부"]?.id,
          exam: documentStatus["검정고시합격증명서"]?.status || "해당없음",
          exam_id: documentStatus["검정고시합격증명서"]?.id,
          record_replacement:
            documentStatus["생활기록부대체양식"]?.status || "해당없음",
          record_replacement_id: documentStatus["생활기록부대체양식"]?.id,
          basicLiving:
            documentStatus["기초생활수급자증명서"]?.status || "해당없음",
          basicLiving_id: documentStatus["기초생활수급자증명서"]?.id,
          identity_file: documentStatus["주민등록본"]?.status || "해당없음",
          identity_file_id: documentStatus["주민등록본"]?.id,
          physical_100_file:
            documentStatus["국민체력100인증서"]?.status || "해당없음",
          physical_100_file_id: documentStatus["국민체력100인증서"]?.id,
          physical_100_result: documentStatus["체력평가"]?.status || "해당없음",
          physical_100_result_id: documentStatus["체력평가"]?.id,
          isChecked: false,
        };
      });

      setTableData(results);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = tableData.filter((item) => {
    if (searchCriteria === "name") {
      return item.name.includes(searchTerm);
    } else if (searchCriteria === "id") {
      return item.id.includes(searchTerm);
    }
    return true;
  });

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(tableData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <TableContainer>
        <ReviewTable>
          <TableHeader>
            <TableCellHeader width="4%">
              <input type="checkbox" className="table-checkbox" />
            </TableCellHeader>
            <TableCellHeader width="9%">수험번호</TableCellHeader>
            <TableCellHeader width="7%">이름</TableCellHeader>
            <TableCellHeader width="15%">학과</TableCellHeader>
            <TableCellHeader width="10%">전화번호</TableCellHeader>
            <TableCellHeader width="10%">학생생활기록부</TableCellHeader>
            <TableCellHeader width="10%">검정고시합격증명서</TableCellHeader>
            <TableCellHeader width="10%">생활기록부대체양식서</TableCellHeader>
            <TableCellHeader width="10%">기초생활수급자증명서</TableCellHeader>
            <TableCellHeader width="10%">주민등록표초본</TableCellHeader>
            <TableCellHeader width="10%">국민체력100인증서</TableCellHeader>
            <TableCellHeader width="10%">체력평가결과지</TableCellHeader>
          </TableHeader>
          <TableBody>
            {currentItems.map((row, index) => (
              <TableRow key={index} isChecked={row.isChecked}>
                <TableCell width="4%">
                  <input
                    type="checkbox"
                    className="table-checkbox"
                    checked={row.isChecked}
                    onChange={(event) => handleCheckboxChange(event, index)}
                  />
                </TableCell>
                <TableCell width="9%">{row.id}</TableCell>
                <TableCell width="7%">{row.name}</TableCell>
                <TableCell width="15%">{row.department}</TableCell>
                <TableCell width="10%">{row.phone}</TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.record)}
                    onClick={() =>
                      handleExamineButtonClick(
                        row.record,
                        row.record_id,
                        "학생생활기록부"
                      )
                    }
                  >
                    {row.record}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.exam)}
                    onClick={() =>
                      handleExamineButtonClick(
                        row.exam,
                        row.exam_id,
                        "검정고시합격증명서"
                      )
                    }
                  >
                    {row.exam}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.record_replacement)}
                    onClick={() =>
                      handleExamineButtonClick(
                        row.record_replacement,
                        row.record_replacement_id,
                        "생활기록부대체양식"
                      )
                    }
                  >
                    {row.record_replacement}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.basicLiving)}
                    onClick={() =>
                      handleExamineButtonClick(
                        row.basicLiving,
                        row.basicLiving_id,
                        "기초생활수급자증명서"
                      )
                    }
                  >
                    {row.basicLiving}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.identity_file)}
                    onClick={() =>
                      handleExamineButtonClick(
                        row.identity_file,
                        row.identity_file_id,
                        "주민등록본"
                      )
                    }
                  >
                    {row.identity_file}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.physical_100_file)}
                    onClick={() =>
                      handleExamineButtonClick(
                        row.physical_100_file,
                        row.physical_100_file_id,
                        "국민체력100인증서"
                      )
                    }
                  >
                    {row.physical_100_file}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.physical_100_result)}
                    onClick={() =>
                      handleExamineButtonClick(
                        row.physical_100_result,
                        row.physical_100_result_id,
                        "체력평가"
                      )
                    }
                  >
                    {row.physical_100_result}
                  </TableButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ReviewTable>
      </TableContainer>
      {isPopupOpen && (
        <DocumentReviewPopUp
          onClose={handleClosePopup}
          selectedId={selectedId}
        />
      )}
      <BottomBar
        currentPage={currentPage}
        totalPages={Math.ceil(tableData.length / itemsPerPage)}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        currentItemsRange={`${indexOfFirstItem + 1}-${Math.min(
          indexOfLastItem,
          tableData.length
        )}`}
        totalItemsCount={tableData.length}
      />
    </>
  );
}

export default DocumentReviewTable;
