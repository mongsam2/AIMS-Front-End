import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const TableSelect = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 4.5%;
  background-color: white;
`;

const ButtonSet = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 400px;
  position: relative;
`;

const Button = styled.button`
  flex: 1;
  min-width: 100px;
  margin: 0 4px;
  width: 33%;
  height: 100%;
  font-size: 1.4rem;
  background-color: white;
  color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
  border: none;
  position: relative;

  &.selected {
    color: #3c50aa;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: transparent;
    transition: background-color 0.3s ease, transform 0.3s ease;
    transform: scaleX(0);
  }

  &.selected::after {
    background-color: #3c50aa;
    transform: scaleX(1);
  }
`;

const TableSelectBar = styled.span`
  width: 1px;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.1);
`;

function UnsuitableChoice({ onFilterChange }) {
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const underlineRef = useRef(null);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  useEffect(() => {
    const activeButton = document.querySelector(`.${selectedFilter}`);
    if (activeButton && underlineRef.current) {
      underlineRef.current.style.left = `${activeButton.offsetLeft}px`;
      underlineRef.current.style.width = `${activeButton.offsetWidth}px`;
    }
  }, [selectedFilter]);

  return (
    <TableSelect>
      <ButtonSet>
        <Button
          className={`전체 ${selectedFilter === "전체" ? "selected" : ""}`}
          onClick={() => handleFilterClick("전체")}
        >
          전체
        </Button>
        <TableSelectBar />
        <Button
          className={`적합 ${selectedFilter === "적합" ? "selected" : ""}`}
          onClick={() => handleFilterClick("적합")}
        >
          적합
        </Button>
        <TableSelectBar />
        <Button
          className={`부적합 ${selectedFilter === "부적합" ? "selected" : ""}`}
          onClick={() => handleFilterClick("부적합")}
        >
          부적합
        </Button>
        <div
          ref={underlineRef}
          style={{
            position: "absolute",
            bottom: 0,
            height: "3px",
            backgroundColor: "#3c50aa",
            transition: "left 0.3s ease, width 0.3s ease",
          }}
        />
      </ButtonSet>
    </TableSelect>
  );
}

export default UnsuitableChoice;
