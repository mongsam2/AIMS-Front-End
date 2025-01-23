import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

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

const TableCell = styled.div`
  width: ${({ width }) => width || "auto"};
  height: 100%;
  border: 1px solid #f7f9fc;
  box-sizing: border-box;
  font-weight: 500;
  color: ${({ color }) => color || "rgba(0, 0, 0, 0.6)"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor || "#f9fafd"};
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

function DocumentReviewTable() {
  const [tableData, setTableData] = useState([]);

  const handleExamineButtonClick = () => {
    // 팝업 열기 로직
  };

  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;
    const updatedTableData = [...tableData];
    updatedTableData[index].isChecked = isChecked;
    setTableData(updatedTableData);
  };

  const loadData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/applicants/");
      const results = response.data.results.map((item) => ({
        id: item.student_id,
        name: item.name,
        department: item.department,
        phone: item.phone,
        record: "생활기록부",
        exam: "검토",
        foreignSchool: "검토",
        basicLiving: "검토",
        lowIncome: "검토",
        rural: "",
        isChecked: false,
      }));
      setTableData(results);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <TableContainer>
      <ReviewTable>
        <TableHeader>
          <TableCell width="4%">
            <input type="checkbox" className="table-checkbox" />
          </TableCell>
          <TableCell width="9%">수험번호</TableCell>
          <TableCell width="7%">이름</TableCell>
          <TableCell width="15%">학과</TableCell>
          <TableCell width="10%">전화번호</TableCell>
          <TableCell width="10%">학생생활기록부</TableCell>
          <TableCell width="10%">검정고시</TableCell>
          <TableCell width="10%">국외고등학교</TableCell>
          <TableCell width="10%">기초생활수급자</TableCell>
          <TableCell width="10%">차상위 계층</TableCell>
          <TableCell width="10%">농어촌확인서</TableCell>
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
                <TableButton bgColor="#e1fcef" color="#38a06c">
                  {row.record}
                </TableButton>
              </TableCell>
              <TableCell width="10%">
                <TableButton bgColor="#ffedef" color="#ef5466">
                  {row.exam}
                </TableButton>
              </TableCell>
              <TableCell width="10%">
                <TableButton
                  bgColor="#fcf2e6"
                  color="#c97a20"
                  onClick={handleExamineButtonClick}
                >
                  {row.foreignSchool}
                </TableButton>
              </TableCell>
              <TableCell width="10%">
                <TableButton
                  bgColor="#fcf2e6"
                  color="#c97a20"
                  onClick={handleExamineButtonClick}
                >
                  {row.basicLiving}
                </TableButton>
              </TableCell>
              <TableCell width="10%">
                <TableButton
                  bgColor="#fcf2e6"
                  color="#c97a20"
                  onClick={handleExamineButtonClick}
                >
                  {row.lowIncome}
                </TableButton>
              </TableCell>
              <TableCell width="10%">
                <TableButton>{row.rural}</TableButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ReviewTable>
    </TableContainer>
  );
}

export default DocumentReviewTable;
