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
  padding-left: 30px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 50%;
  margin-right: 1.875rem;
`;

const CustomDropdown = styled.div`
  position: relative;
  width: 30%;
  height: 100%;
  font-size: 1.1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px 0px 0px 00px;
  background-color: white;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #c5c8fd40;
  }
`;

const DropdownList = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1000;
`;

const DropdownListItem = styled.li`
  padding: 10px;
  background-color: ${({ isSelected }) => (isSelected ? "#c5c8fd40" : "white")};
  color: ${({ isSelected }) =>
    isSelected ? "rgba(7, 0, 111, 0.9)" : "rgba(0, 0, 0, 0.5)"};
  &:hover {
    background-color: #c5c8fd40;
    color: rgba(7, 0, 111, 0.9);
  }
  border: none;
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
  margin: 0px;
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
  border-radius: 0px 10px 0px 0px;
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
  border-radius: 10px 10px 0px 0px;
  margin-left: 1%;
  padding: 0 0.5% 0 1%;
  width: auto;
  height: 50%;
`;

const SearchTagText = styled.span`
  margin-right: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(7, 0, 111, 0.59);
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: rgba(197, 0, 0, 0.65);
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 700;
`;

const CustomDropdownContainer = styled.div`
  position: relative;
  width: 16%;
  height: 50%;
  font-size: 1.3rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px 10px 0 0;
  background-color: white;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #c5c8fd40;
  }
`;

const CustomDropdownList = styled.ul`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CustomDropdownListItem = styled.li`
  font-size: 1.2rem;
  padding: 1rem;
  background-color: ${({ isSelected }) => (isSelected ? "#c5c8fd40" : "white")};
  color: ${({ isSelected }) =>
    isSelected ? "rgba(7, 0, 111, 0.9)" : "rgba(0, 0, 0, 0.5)"};
  &:hover {
    background-color: #c5c8fd40;
    color: rgba(7, 0, 111, 0.9);
  }
`;

function MiddleContent({ onSearchTermChange, onAdmissionTypeChange }) {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [admissionType, setAdmissionType] = useState("전체");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("이름");
  const [isCustomDropdownOpen, setIsCustomDropdownOpen] = useState(false);

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

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const toggleCustomDropdown = () =>
    setIsCustomDropdownOpen(!isCustomDropdownOpen);

  const handleCustomDropdownSelect = (type) => {
    let displayType;
    switch (type) {
      case "면접":
        displayType = "학생부종합(면접형)";
        break;
      case "서류":
        displayType = "학생부종합(서류형)";
        break;
      case "국방":
        displayType = "학생부종합(국방시스템특별전형)";
        break;
      default:
        displayType = type;
    }
    setAdmissionType(displayType);
    onAdmissionTypeChange(type);
    setIsCustomDropdownOpen(false);
  };

  return (
    <>
      <MiddleBar>
        <DropdownContainer>
          <CustomDropdownContainer onClick={toggleCustomDropdown}>
            {admissionType}
            <CustomDropdownList isOpen={isCustomDropdownOpen}>
              <CustomDropdownListItem
                isSelected={admissionType === "전체"}
                onClick={() => handleCustomDropdownSelect("전체")}
              >
                전체
              </CustomDropdownListItem>
              <CustomDropdownListItem
                isSelected={admissionType === "면접"}
                onClick={() => handleCustomDropdownSelect("면접")}
              >
                학생부종합(면접형)
              </CustomDropdownListItem>
              <CustomDropdownListItem
                isSelected={admissionType === "서류"}
                onClick={() => handleCustomDropdownSelect("서류")}
              >
                학생부종합(서류형)
              </CustomDropdownListItem>
              <CustomDropdownListItem
                isSelected={admissionType === "국방"}
                onClick={() => handleCustomDropdownSelect("국방")}
              >
                학생부종합(국방시스템특별전형)
              </CustomDropdownListItem>
              <CustomDropdownListItem
                isSelected={admissionType === "논술"}
                onClick={() => handleCustomDropdownSelect("논술")}
              >
                논술
              </CustomDropdownListItem>
            </CustomDropdownList>
          </CustomDropdownContainer>
          {searchTerm && (
            <SearchTag>
              <SearchTagText>{searchTerm}</SearchTagText>
              <ClearButton onClick={handleClearSearch}>X</ClearButton>
            </SearchTag>
          )}
        </DropdownContainer>
        <SearchContainer>
          <CustomDropdown onClick={toggleDropdown}>
            {selectedOption}
            {isDropdownOpen && (
              <DropdownList>
                <DropdownListItem
                  isSelected={selectedOption === "이름"}
                  onClick={() => handleOptionSelect("이름")}
                >
                  이름
                </DropdownListItem>
                <DropdownListItem
                  isSelected={selectedOption === "수험번호"}
                  onClick={() => handleOptionSelect("수험번호")}
                >
                  수험번호
                </DropdownListItem>
              </DropdownList>
            )}
          </CustomDropdown>
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
