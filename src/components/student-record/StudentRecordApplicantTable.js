import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const RecordTableContainer = styled.div`
  width: 15%;
  height: 100%;
`;

const RecordReviewTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const RecordTableHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 4%;
  background-color: #f7f9fc;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
`;

const RecordTableCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  &.default-cell {
    width: 30%;
    height: 100%;
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.6);
  }
  &.default-num {
    width: 70%;
    height: 100%;
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.6);
  }
  &.default-cell-header {
    width: 30%;
    height: 100%;
    font-size: 1.2rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
  }
  &.default-num-header {
    width: 70%;
    height: 100%;
    font-size: 1.2rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const RecordTableBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 96%;
  overflow-y: auto;
`;

const RecordTableRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70px;
  &:hover {
    background-color: #c5c8fd40;
    color: rgba(0, 0, 0, 0.9);
  }
  &.selected {
    background-color: #c5c8fd40;
    color: rgba(0, 0, 0, 0.9);
  }
`;

function StudentRecordApplicantTable({ onRowSelect }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get("http://3.37.240.199/api/documents/student-records/")
      .then((response) => {
        const ids = response.data; // 서버에서 받은 데이터
        const data = ids.map((id, index) => ({
          id: `${id}`,
          num: `${index + 1}`,
        }));
        setTableData(data);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      });
  }, []);

  const handleRowClick = (index) => {
    setSelectedRow(index);
    onRowSelect(tableData[index].id);
  };

  return (
    <RecordTableContainer>
      <RecordReviewTable>
        <RecordTableHeader>
          <RecordTableCell className="default-cell-header">#</RecordTableCell>
          <RecordTableCell className="default-num-header">
            고유번호
          </RecordTableCell>
        </RecordTableHeader>
        <RecordTableBody>
          <div className="record-table-row-set">
            {tableData.map((row, index) => (
              <RecordTableRow
                className={selectedRow === index ? "selected" : ""}
                key={index}
                onClick={() => handleRowClick(index)}
              >
                <RecordTableCell className="default-cell">
                  {row.num}
                </RecordTableCell>
                <RecordTableCell className="default-num">
                  {row.id}
                </RecordTableCell>
              </RecordTableRow>
            ))}
          </div>
        </RecordTableBody>
      </RecordReviewTable>
    </RecordTableContainer>
  );
}

export default StudentRecordApplicantTable;
