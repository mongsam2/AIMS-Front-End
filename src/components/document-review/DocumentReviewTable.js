import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import DocumentReviewPopUp from "./DocumentReviewPopUp";
import BottomBar from "./DocumentBottomBar";

const TableContainer = styled.div`
  width: 100%;
  height: 80%;
  overflow-x: auto;
  overflow-y: auto;
  background-color: hwb(220 94% 2%);
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
  font-size: 1.3rem;
  color: ${({ color }) => color || "rgba(0, 0, 0, 0.9)"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor || "#F7F9FCCC"};
  input.table-checkbox {
    width: 100%;
    height: 21%;
  }
`;

const TableCell = styled.div`
  width: ${({ width }) => width || "auto"};
  height: 100%;
  border: 1px solid #f7f9fc;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 1.4rem;
  color: ${({ color }) => color || "rgba(0, 0, 0, 0.6)"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor || "white"};
  input.table-checkbox {
    width: 100%;
    height: 21%;
  }
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
  height: 6.6%;
`;

const TableButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${({ bgColor }) => bgColor || "#f7f9fc"};
  color: ${({ color }) => color || "#c97a20"};
  border: none;
  border-radius: 5px;
  font-size: 1.3rem;
  font-weight: 500;
  cursor: pointer;
`;

function getButtonStyles(status) {
  switch (status) {
    case "미제출":
      return { bgColor: "rgba(255, 136, 123, 0.42)", color: "#c97a20" };
    case "검토":
      return {
        bgColor: "rgba(252, 183, 33, 0.45)",
        color: "rgba(66, 44, 1, 0.59)",
      };
    case "제출":
      return {
        bgColor: "rgba(197, 200, 253, 0.23)",
        color: "rgba(7, 0, 111, 0.48)",
      };
    case "해당없음":
      return { bgColor: "white", color: "rgba(0, 0, 0, 0.2)" };
    default:
      return { bgColor: "#f9fafd", color: "rgba(0, 0, 0, 0.6)" };
  }
}

function DocumentReviewTable({ searchTerm, admissionType, filter }) {
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 페이지당 항목 수
  const [documentType, setDocumentType] = useState(null);
  const [totalItemsCount, setTotalItemsCount] = useState(0); // 총 항목 수 상태 추가
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  }); // 정렬 상태 추가

  const handleExamineButtonClick = (status, id, documentType) => {
    if (status === "검토" || status === "제출") {
      setIsPopupOpen(true);
      setSelectedId(id);
      setDocumentType(documentType);
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

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
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
          applicant_type: item.applicant_type,
          record: documentStatus["학생생활기록부"]?.status || "",
          exam: documentStatus["검정고시합격증명서"]?.status || "",
          record_replacement:
            documentStatus["생활기록부대체양식"]?.status || "",
          basicLiving: documentStatus["수급자증명서"]?.status || "",
          identity_file: documentStatus["주민등록본"]?.status || "",
          physical_100_file: documentStatus["국민체력100인증서"]?.status || "",
          physical_100_result: documentStatus["체력평가"]?.status || "",
          isChecked: false,
        };
      });

      setTableData(results);
      setTotalItemsCount(response.data.count); // 총 항목 수 설정
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = tableData.filter((item) => {
    const matchesSearchTerm =
      item.name.includes(searchTerm) || item.id.includes(searchTerm);
    const matchesAdmissionType =
      admissionType === "전체" || item.applicant_type === admissionType;

    let matchesFilter = true;
    if (filter === "unsuit") {
      matchesFilter = Object.values(item).some(
        (status) => status === "미제출" || status === "검토"
      );
    } else if (filter === "suitable") {
      matchesFilter = Object.values(item).some(
        (status) => status === "제출" || status === null
      );
    }

    return matchesSearchTerm && matchesAdmissionType && matchesFilter;
  });

  const totalFilteredItemsCount = filteredItems.length; // 필터링된 항목 수

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...filteredItems];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredItems, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalFilteredItemsCount / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <TableContainer>
        <ReviewTable>
          <TableHeader>
            <TableCellHeader width="4%">#</TableCellHeader>
            <TableCellHeader width="9%" onClick={() => handleSort("id")}>
              수험번호
            </TableCellHeader>
            <TableCellHeader width="7%" onClick={() => handleSort("name")}>
              이름
            </TableCellHeader>
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
                <TableCell width="4%">{indexOfFirstItem + index + 1}</TableCell>
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
                        row.id,
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
                        row.id,
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
                        row.id,
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
                        row.id,
                        "수급자증명서"
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
                        row.id,
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
                        row.id,
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
                        row.id,
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
          documentType={documentType}
        />
      )}
      <BottomBar
        currentPage={currentPage}
        totalPages={Math.ceil(totalFilteredItemsCount / itemsPerPage)} // 필터링된 총 페이지 수 계산
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        currentItemsRange={`${indexOfFirstItem + 1}-${Math.min(
          indexOfLastItem,
          totalFilteredItemsCount
        )}`} // 필터링된 항목 범위
        totalItemsCount={totalFilteredItemsCount} // 필터링된 총 항목 수 전달
      />
    </>
  );
}

export default DocumentReviewTable;
