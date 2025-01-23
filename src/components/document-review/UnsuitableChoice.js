import React, { useState } from "react";
import styled from "styled-components";

const TableSelect = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 4%;
  background-color: white;
`;

const Button = styled.button`
  width: 3.5%;
  height: 100%;
  font-size: 1.3rem;
  background-color: white;
  color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
  border: none;
  &.selected {
    color: #3c50aa;
    border-bottom: 3px solid #3c50aa;
  }
`;

const TableSelectBar = styled.span`
  width: 1px;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.5);
`;

function UnsuitableChoice() {
  const [selectedFilter, setSelectedFilter] = useState("unsuit");
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };
  return (
    <TableSelect>
      <Button
        className={selectedFilter === "unsuit" ? "selected" : ""}
        onClick={() => handleFilterClick("unsuit")}
      >
        부적합
      </Button>
      <TableSelectBar />
      <Button
        className={selectedFilter === "suit" ? "selected" : ""}
        onClick={() => handleFilterClick("suit")}
      >
        전체
      </Button>
    </TableSelect>
  );
}

export default UnsuitableChoice;
