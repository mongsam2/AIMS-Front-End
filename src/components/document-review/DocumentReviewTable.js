import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import DocumentReviewPopUp from "./DocumentReviewPopUp";
import BottomBar from "./DocumentBottomBar";
import sort from "../../assets/sort.png";

const TableContainer = styled.div`
  width: 100%;
  height: auto;
  overflow-x: auto;
  background-color: hwb(220 94% 2%);
`;

const ReviewTable = styled.div`
  display: table;
  width: 1200px; /* 고정 너비 최소 보장 */
  min-width: 1000px;
  border-top: 2px solid rgba(30, 120, 255, 0.3);
  border-bottom: 2px solid rgba(30, 120, 255, 0.3);
`;

const TableHeader = styled.div`
  display: table-row;
  background-color: rgba(105, 188, 255, 0.25);
  height: 60px;
`;

const TableCellHeader = styled.div`
  display: table-cell;
  min-width: ${({ width }) => width || "100px"};
  padding: 0 8px;
  font-weight: 600;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.75);
  white-space: nowrap; /* 줄바꿈 방지 */
  text-align: center;
  border-right: 1px solid rgba(30, 120, 255, 0.3);
  position: relative;
`;

const TableCell = styled.div`
  display: table-cell;
  min-width: ${({ width }) => width || "100px"};
  padding: 0 8px;
  font-weight: 500;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.75);
  text-align: center;
  white-space: nowrap;
  border-right: 1px solid rgba(222, 222, 222, 0.61);
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 95%;
`;

const TableRow = styled.div`
  display: table-row;
  background-color: ${({ isChecked }) => (isChecked ? "#d3e3fe" : "white")};
  height: 55px;
  border-bottom: 1px solid rgba(222, 222, 222, 0.61);
`;

const TableButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${({ bgColor }) => bgColor || "#f7f9fc"};
  color: ${({ color }) => color || "#c97a20"};
  border: none;
  border-radius: 0px;
  font-size: 1.45rem;
  font-weight: 500;
  cursor: pointer;
`;

const SortIcon = styled.img`
  width: 1.6rem;
  height: auto;
  margin-left: 5px;
`;

function getButtonStyles(status) {
  switch (status) {
    case "미제출":
      return {
        bgColor: "rgba(237, 237, 237, 0.57)",
        color: "rgba(140, 140, 140, 0.7)",
      };
    case "검토":
      return {
        bgColor: "rgba(255, 60, 60, 0.45)",
        color: "rgba(66, 44, 1, 0.59)",
      };
    case "제출":
      return {
        bgColor: "rgba(197, 200, 253, 0.4)",
        color: "rgba(7, 0, 111, 0.48)",
      };
    case "해당없음":
      return {
        bgColor: "rgb(0, 0, 0,0.02)",
        color: "rgba(0, 0, 0, 0)",
      };
    default:
      return { bgColor: "#f9fafd", color: "rgba(0, 0, 0, 0.6)" };
  }
}

function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return "";
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}

function DocumentReviewTable({ searchTerm, admissionType, filter }) {
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;  
  const [documentType, setDocumentType] = useState(null);
  const [totalItemsCount, setTotalItemsCount] = useState(0); 
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  }); 
  const [selectedName, setSelectedName] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedApplicantType, setSelectedApplicantType] = useState(null);
  const [selectedPhone, setSelectedPhone] = useState(null);

  const getDisplayText = (status) => {
    return status === "제출" ? "완료" : status;
  };

  const handleExamineButtonClick = (
    status,
    id,
    documentType,
    name,
    department,
    applicant_type,
    phone
  ) => {
    if (status === "검토" || status === "제출") {
      setIsPopupOpen(true);
      setSelectedId(id);
      setDocumentType(documentType);
      setSelectedName(name);
      setSelectedDepartment(department);
      setSelectedApplicantType(applicant_type);
      setSelectedPhone(phone);
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
      const response = await axios.get("http://3.37.240.199/api/students/");
      const results = response.data.map((item) => {
        const documentStatus = {
          학생생활기록부: item.documents["학생생활기록부"] || "해당없음",
          검정고시합격증명서:
            item.documents["검정고시합격증명서"] || "해당없음",
          생활기록부대체양식:
            item.documents["생활기록부대체양식"] || "해당없음",
          기초생활수급자증명서:
            item.documents["기초생활수급자증명서"] || "해당없음",
          주민등록초본: item.documents["주민등록초본"] || "해당없음",
          국민체력100: item.documents["국민체력100"] || "해당없음",
          체력평가: item.documents["체력평가"] || "해당없음",
        };

        return {
          id: item.id,
          name: item.name,
          department: item.department,
          phone: item.phone,
          applicant_type: item.applicant_type,
          record: documentStatus["학생생활기록부"],
          exam: documentStatus["검정고시합격증명서"],
          record_replacement: documentStatus["생활기록부대체양식"],
          basicLiving: documentStatus["기초생활수급자증명서"],
          identity_file: documentStatus["주민등록초본"],
          physical_100_file: documentStatus["국민체력100"],
          physical_100_result: documentStatus["체력평가"],
          isChecked: false,
        };
      });

      setTableData(results);
      setTotalItemsCount(response.data.length); 
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = tableData.filter((item) => {
    if (item.id === "20250000") return false;

    const matchesSearchTerm =
      item.name.includes(searchTerm) || item.id.includes(searchTerm);
    const matchesAdmissionType =
      admissionType === "전체" || item.applicant_type === admissionType;

    let matchesFilter = true;
    const docStatuses = [
      item.record,
      item.exam,
      item.record_replacement,
      item.basicLiving,
      item.identity_file,
      item.physical_100_file,
      item.physical_100_result,
    ];

    if (filter === "부적합") {
      matchesFilter = docStatuses.some(
        (status) => status === "미제출" || status === "검토"
      );
    } else if (filter === "적합") {
      matchesFilter = docStatuses.every(
        (status) => status !== "미제출" && status !== "검토"
      );
    }

    return matchesSearchTerm && matchesAdmissionType && matchesFilter;
  });

  const totalFilteredItemsCount = filteredItems.length;

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
            <TableCellHeader
              width="8%"
              onClick={() => handleSort("id")}
              className={
                sortConfig.key === "id" && sortConfig.direction === "ascending"
                  ? "sorted-asc"
                  : ""
              }
            >
              수험번호
              <SortIcon src={sort} alt="sort icon" className="sort-icon" />
            </TableCellHeader>
            <TableCellHeader
              width="6%"
              onClick={() => handleSort("name")}
              className={
                sortConfig.key === "name" &&
                sortConfig.direction === "ascending"
                  ? "sorted-asc"
                  : ""
              }
            >
              이름
              <SortIcon src={sort} alt="sort icon" className="sort-icon" />
            </TableCellHeader>
            <TableCellHeader width="11%">학과</TableCellHeader>
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
                <TableCell width="8%">{row.id}</TableCell>
                <TableCell width="6%">{row.name}</TableCell>
                <TableCell width="11%">{row.department}</TableCell>
                <TableCell width="10%">
                  {formatPhoneNumber(row.phone)}
                </TableCell>
                <TableCell width="10%">
                  <TableButton {...getButtonStyles(row.record)}>
                    {getDisplayText(row.record)}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.exam)}
                    onClick={() =>
                      handleExamineButtonClick(
                        row.exam,
                        row.id,
                        "검정고시합격증명서",
                        row.name,
                        row.department,
                        row.applicant_type,
                        row.phone
                      )
                    }
                  >
                    {getDisplayText(row.exam)}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.record_replacement)}
                    onClick={() =>
                      handleExamineButtonClick(
                        row.record_replacement,
                        row.id,
                        "생활기록부대체양식",
                        row.name,
                        row.department,
                        row.applicant_type,
                        row.phone
                      )
                    }
                  >
                    {getDisplayText(row.record_replacement)}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.basicLiving)}
                    onClick={() =>
                      handleExamineButtonClick(
                        row.basicLiving,
                        row.id,
                        "기초생활수급자증명서",
                        row.name,
                        row.department,
                        row.applicant_type,
                        row.phone
                      )
                    }
                  >
                    {getDisplayText(row.basicLiving)}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.identity_file)}
                    onClick={() =>
                      handleExamineButtonClick(
                        row.identity_file,
                        row.id,
                        "주민등록초본",
                        row.name,
                        row.department,
                        row.applicant_type,
                        row.phone
                      )
                    }
                  >
                    {getDisplayText(row.identity_file)}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.physical_100_file)}
                    onClick={() =>
                      handleExamineButtonClick(
                        row.physical_100_file,
                        row.id,
                        "국민체력100",
                        row.name,
                        row.department,
                        row.applicant_type,
                        row.phone
                      )
                    }
                  >
                    {getDisplayText(row.physical_100_file)}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.physical_100_result)}
                    onClick={() =>
                      handleExamineButtonClick(
                        row.physical_100_result,
                        row.id,
                        "체력평가",
                        row.name,
                        row.department,
                        row.applicant_type,
                        row.phone
                      )
                    }
                  >
                    {getDisplayText(row.physical_100_result)}
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
          name={selectedName}
          department={selectedDepartment}
          applicant_type={selectedApplicantType}
          id={selectedId}
        />
      )}
      <BottomBar
        currentPage={currentPage}
        totalPages={Math.ceil(totalFilteredItemsCount / itemsPerPage)}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        currentItemsRange={`${indexOfFirstItem + 1}-${Math.min(
          indexOfLastItem,
          totalFilteredItemsCount
        )}`}
        totalItemsCount={totalFilteredItemsCount}
      />
    </>
  );
}

export default DocumentReviewTable;
