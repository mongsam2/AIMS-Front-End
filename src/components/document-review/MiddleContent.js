import React, { useState } from "react";
import styled from "styled-components";
import searchicon from "../../assets/search_icon.png";

const MiddleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 7%;
`;

const Dropdown = styled.select`
  width: 8%;
  font-size: 1.375rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  margin-left: 30px;
  height: 50%;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 50%;
  margin-right: 1.875rem;
`;

const SearchDropdown = styled.select`
  width: 30%;
  height: 100%;
  font-size: 1.1rem;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 0px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px 0px 0px 10px;
  padding-left: 5px;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const SearchInput = styled.input`
  font-size: 1.1rem;
  height: 100%;
  width: 50%;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 0px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 0px solid rgba(0, 0, 0, 0.2);
  padding: 0px;
  padding-left: 15px;
  color: rgba(0, 0, 0, 0.5);
`;

const SearchButton = styled.button`
  font-size: 1.1rem;
  height: 100%;
  width: 20%;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 0px solid rgba(0, 0, 0, 0.2);
  border-radius: 0px 10px 10px 0px;
  color: rgba(0, 0, 0, 0.5);
`;

const SearchIcon = styled.img`
  width: 40%;
  height: auto;
  &:hover {
    cursor: pointer;
  }
`;

function MiddleContent({ onSearchTermChange, onSearchCriteriaChange }) {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [localSearchCriteria, setLocalSearchCriteria] = useState("name");

  const handleSearchClick = () => {
    onSearchTermChange(localSearchTerm);
    onSearchCriteriaChange(localSearchCriteria);
  };

  return (
    <MiddleBar>
      <Dropdown
        name="admissionType"
        onChange={(e) => setLocalSearchCriteria(e.target.value)}
      >
        <option value="name">이름</option>
        <option value="id">수험번호</option>
      </Dropdown>
      <SearchContainer>
        <SearchDropdown
          onChange={(e) => setLocalSearchCriteria(e.target.value)}
        >
          <option value="name">이름</option>
          <option value="id">수험번호</option>
        </SearchDropdown>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          onChange={(e) => setLocalSearchTerm(e.target.value)}
        />
        <SearchButton onClick={handleSearchClick}>
          <SearchIcon src={searchicon} alt="search-icon" />
        </SearchButton>
      </SearchContainer>
    </MiddleBar>
  );
}

export default MiddleContent;
