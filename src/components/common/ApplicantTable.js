import React, { useState } from "react";
import styled from "styled-components";

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
    background-color: #b4b5b6;
    color: rgba(0, 0, 0, 0.9);
  }
  &.selected {
    background-color: #b4b5b6;
    color: rgba(0, 0, 0, 0.9);
  }
`;

function ApplicantTable() {
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const tableData = Array.from({ length: 30 }, (_, index) => ({
    id: `${index + 1}`,
    num: `${index + 31293423}`,
  }));
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
                  {row.id}
                </RecordTableCell>
                <RecordTableCell className="default-num">
                  {row.num}
                </RecordTableCell>
              </RecordTableRow>
            ))}
          </div>
        </RecordTableBody>
      </RecordReviewTable>
    </RecordTableContainer>
  );
}

export default ApplicantTable;
