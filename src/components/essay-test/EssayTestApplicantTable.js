import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const RecordTableContainer = styled.div`
  width: 14%;
  height: 100%;
  background-color: rgba(185, 223, 255, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RecordReviewTable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  border-top: 2px solid rgba(50, 98, 255, 0.2);
  border-bottom: 3px solid rgba(50, 98, 255, 0.2);
  background-color: rgba(185, 223, 255, 0.25);
`;

const RecordTableHeaderCell = styled.div`
  display: flex;
  font-size: 1.6rem;
  justify-content: center;
  align-items: center;
  &.default-cell-header {
    width: 30%;
    height: 100%;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.65);
  }
  &.default-num-header {
    width: 70%;
    height: 100%;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.65);
  }
`;

const RecordTableCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: rgba(0, 0, 0, 0.6);
  &.default-cell {
    width: 30%;
    height: 100%;
    font-size: 1.6rem;
  }
  &.default-num {
    width: 70%;
    height: 100%;
    font-size: 1.6rem;
  }
`;

const RecordTableBody = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
    background: transparent; 
  }

  &:hover::-webkit-scrollbar {
    width: 0rem
  }
`;

const RecordTableRowSet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const RecordTableRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  height: 4.9rem;
  margin-top: 0.2rem;
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.2rem;
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #c5c8fd40;
    color: rgba(66, 94, 255, 0.35);
    font-weight: bold;
    font-size: 2rem;
  }
  &.selected {
    color: rgba(66, 94, 255, 0.35);
    font-size: 1.9rem;
    background-color: rgba(77, 163, 255, 0.11);
    font-weight: 600;
  }
`;

function EssayTestApplicantTable({ onRowSelect }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get("http://3.37.240.199/api/essays/")
      .then((response) => {
        const data = response.data.map((item, index) => ({
          id: `${item.id}`,
          num: `${index + 1}`,
        }));
        setTableData(data);

        if (data.length > 0) {
          setSelectedRow(0);
          onRowSelect(data[0].id);
        }
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
          <RecordTableHeaderCell className="default-cell-header">
            #
          </RecordTableHeaderCell>
          <RecordTableHeaderCell className="default-num-header">
            고유번호
          </RecordTableHeaderCell>
        </RecordTableHeader>

        <RecordTableBody>
          <RecordTableRowSet className="record-table-row-set">
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
                  {3407240 + row.id}
                </RecordTableCell>
              </RecordTableRow>
            ))}
          </RecordTableRowSet>
        </RecordTableBody>
      </RecordReviewTable>
    </RecordTableContainer>
  );
}

export default EssayTestApplicantTable;
