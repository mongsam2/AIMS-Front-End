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

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  height: 100%;
`;

const Dropdown = styled.select`
  width: 16%;
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

const SearchTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d3e3fe70;
  border-radius: 10px;
  margin-left: 1%;
  padding: 0 0.5% 0 1%;
  width: auto;
  height: 50%;
`;

const SearchTagText = styled.span`
  margin-right: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #112059;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 700;
`;

function MiddleContent({ onSearchTermChange, onAdmissionTypeChange }) {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [admissionType, setAdmissionType] = useState("전체");

  const handleSearchClick = () => {
    if (localSearchTerm) {
      onSearchTermChange(localSearchTerm);
      setSearchTerm(localSearchTerm);
      setLocalSearchTerm("");
    }
  };

  const handleClearSearch = () => {
    onSearchTermChange("");
    setSearchTerm("");
  };

  const handleAdmissionTypeChange = (event) => {
    const selectedType = event.target.value;
    setAdmissionType(selectedType);
    onAdmissionTypeChange(selectedType);
  };

  return (
    <>
      <MiddleBar>
        <DropdownContainer>
          <Dropdown name="admissionType" onChange={handleAdmissionTypeChange}>
            <option value="전체">전체</option>
            <option value="면접">학생부종합(면접형)</option>
            <option value="서류">학생부종합(서류형)</option>
            <option value="국방">학생부종합(국방시스템특별전형)</option>
            <option value="논술">논술</option>
          </Dropdown>
          {searchTerm && (
            <SearchTag>
              <SearchTagText>{searchTerm}</SearchTagText>
              <ClearButton onClick={handleClearSearch}>X</ClearButton>
            </SearchTag>
          )}
        </DropdownContainer>
        <SearchContainer>
          <SearchDropdown>
            <option value="name">이름</option>
            <option value="id">수험번호</option>
          </SearchDropdown>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
          <SearchButton onClick={handleSearchClick}>
            <SearchIcon src={searchicon} alt="search-icon" />
          </SearchButton>
        </SearchContainer>
      </MiddleBar>
    </>
  );
}

export default MiddleContent;
