import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import DocumentReviewPopUp from "./DocumentReviewPopUp";

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

function DocumentReviewTable() {
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleExamineButtonClick = (status) => {
    if (status === "검토" || status === "제출") {
      setIsPopupOpen(true);
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
          acc[doc.document_type] = doc.status;
          return acc;
        }, {});

        return {
          id: item.student_id,
          name: item.name,
          department: item.department,
          phone: item.phone,
          record: documentStatus["학생생활기록부"] || "해당없음",
          exam: documentStatus["검정고시합격증명서"] || "해당없음",
          record_replacement:
            documentStatus["생활기록부대체양식"] || "해당없음",
          basicLiving: documentStatus["기초생활수급자증명서"] || "해당없음",
          identity_file: documentStatus["주민등록본"] || "해당없음",
          physical_100_file: documentStatus["국민체력100인증서"] || "해당없음",
          physical_100_result: documentStatus["체력평가"] || "해당없음",
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
            {tableData.map((row, index) => (
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
                    onClick={() => handleExamineButtonClick(row.record)}
                  >
                    {row.record}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.exam)}
                    onClick={() => handleExamineButtonClick(row.exam)}
                  >
                    {row.exam}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.record_replacement)}
                    onClick={() =>
                      handleExamineButtonClick(row.record_replacement)
                    }
                  >
                    {row.record_replacement}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.basicLiving)}
                    onClick={() => handleExamineButtonClick(row.basicLiving)}
                  >
                    {row.basicLiving}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.identity_file)}
                    onClick={() => handleExamineButtonClick(row.identity_file)}
                  >
                    {row.identity_file}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.physical_100_file)}
                    onClick={() =>
                      handleExamineButtonClick(row.physical_100_file)
                    }
                  >
                    {row.physical_100_file}
                  </TableButton>
                </TableCell>
                <TableCell width="10%">
                  <TableButton
                    {...getButtonStyles(row.physical_100_result)}
                    onClick={() =>
                      handleExamineButtonClick(row.physical_100_result)
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
      {isPopupOpen && <DocumentReviewPopUp onClose={handleClosePopup} />}
    </>
  );
}

export default DocumentReviewTable;
