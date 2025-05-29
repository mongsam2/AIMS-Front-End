import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import axios from "axios";
import searchicon from "../../assets/search_icon.png";
import arrow_down from "../../assets/arrow_down.png";
import alert from "../../assets/siren.png";
import ReclassifyPopUp from "./ReclassifyPopUp";

const shrinkExpand = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.90);
  }
  100% {
    transform: scale(1);
  }
`;

const MiddleBar = styled.div`
  overflow: visible;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7%;
  background-color: white;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 30%;
  height: 100%;
  margin-left: 2rem;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-right: 2rem;

  @media (max-width: 1200px) {
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    margin: 0 auto;
    width: 100%;
    padding: 0 1rem;
  }
`;

const SearchGroup = styled.div`
  display: flex;
  border: 1.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  height: 40px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const LeftSection = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 50%;
  height: 100%;
`;

const CustomDropdown = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 90px;
  max-width: 120px;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: white;
  color: rgba(0, 0, 0, 0.7);
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-right: 1.5px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px 10px 0 0;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 9999;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
`;

const DropdownListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ isSelected }) => (isSelected ? "#c5c8fd40" : "white")};
  color: ${({ isSelected }) =>
    isSelected ? "rgba(7, 0, 111, 0.9)" : "rgba(0, 0, 0, 0.7)"};
  &:hover {
    background-color: #c5c8fd40;
    color: rgba(7, 0, 111, 0.9);
    font-weight: 600;
  }
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "400")};
  border: none;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  font-size: 1.1rem;
  font-weight: 500;
  border: none;
  padding-left: 10px;
  outline: none;
  color: rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const SearchButton = styled.button`
  width: 40px;
  min-width: 40px;
  background-color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f0f0ff;
  }

  @media (max-width: 768px) {
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0 0 10px 10px;
  }
`;

const SearchIcon = styled.img`
  width: 18px;
  height: auto;
`;

const SearchTag = styled.div`
  white-space: nowrap;
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
  font-weight: 700;
  color: rgba(7, 0, 111, 0.59);
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: rgba(0, 0, 0, 0.9);
  font-size: 1rem;
  cursor: pointer;
  font-weight: 700;
`;

const CustomDropdownContainer = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 220px;
  height: 40px;
  font-size: 1.2rem;
  border: 1.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: white;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: pointer;
  z-index: 999;

  @media (max-width: 1200px) {
    width: 160px;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
  }
`;

const AdmissionTypeText = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const CustomDropdownArrowImg = styled.img`
  width: 1.5rem;
  height: auto;
  transition: transform 0.05s ease;
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(-180deg);
    `}
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
  font-size: 1.2rem; /* 🔽 기존 1.4rem → 줄임 */
  padding: 0.7rem 1rem; /* 🔽 기존 padding: 1rem */
  font-weight: 500;
  background-color: ${({ isSelected }) => (isSelected ? "#c5c8fd40" : "white")};
  color: ${({ isSelected }) =>
    isSelected ? "rgba(7, 0, 111, 0.9)" : "rgba(0, 0, 0, 0.7)"};

  &:hover {
    background-color: #c5c8fd40;
    color: rgba(7, 0, 111, 0.9);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.6rem 0.8rem;
  }
`;

const DropdownArrowImg = styled.img`
  width: 1.3rem;
  height: auto;
  transition: transform 0.3s ease;
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(-180deg);
    `}
`;

const SelectedOptionText = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const ReclassifyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27%;
  height: 55%;
  margin-right: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  padding: 30px 0px;
  border: 4px solid rgba(253, 147, 144, 0.73);
  border-radius: 5px;
  background-color: rgba(255, 173, 170, 0.51);

  &:hover {
    background-color: rgba(255, 173, 170, 0.86);
  }
  &:active {
    animation: ${shrinkExpand} 0.3s ease;
  }
`;

function MiddleContent({ onSearchTermChange, onAdmissionTypeChange }) {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [admissionType, setAdmissionType] = useState("전체");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("이름");
  const [isCustomDropdownOpen, setIsCustomDropdownOpen] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showReclassifyButton, setShowReclassifyButton] = useState(false);

  useEffect(() => {
    axios
      .get("http://3.37.240.199/api/students/")
      .then((response) => {
        const students = response.data;
        const targetStudent = students.find(
          (student) => student.id === "20250000"
        );
        if (targetStudent && targetStudent.documents) {
          const shouldShow = Object.values(targetStudent.documents).some(
            (status) => status !== "미제출"
          );
          setShowReclassifyButton(shouldShow);
        } else {
          setShowReclassifyButton(false);
        }
      })
      .catch((error) => {
        console.error("데이터 로드 실패:", error);
        setShowReclassifyButton(false);
      });
  }, []);

  const handleReclassifyClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

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
        displayType = "국방시스템특별전형";
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
        <LeftSection>
          <DropdownContainer>
            <CustomDropdownContainer onClick={toggleCustomDropdown}>
              <AdmissionTypeText>{admissionType}</AdmissionTypeText>
              <CustomDropdownArrowImg
                src={arrow_down}
                alt="arrow_down"
                isOpen={isCustomDropdownOpen}
              />
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
                  국방시스템특별전형
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
        </LeftSection>
        <SearchContainer>
          {showReclassifyButton && (
          <ReclassifyButton onClick={handleReclassifyClick}>
            <img
              style={{
                width: "1.8rem",
                height: "auto",
                marginRight: "1rem",
              }}
              src={alert}
              alt="alert"
            />
            분류 실패 서류
          </ReclassifyButton>
          )}
          <CustomDropdown onClick={toggleDropdown}>
            <SelectedOptionText>{selectedOption}</SelectedOptionText>
            <DropdownArrowImg
              src={arrow_down}
              alt="arrow_down"
              isOpen={isDropdownOpen}
            />
            {/* 드롭다운 메뉴는 Dropdown 내부 마지막에 위치 */}
            <DropdownList style={{ display: isDropdownOpen ? "flex" : "none" }}>
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
          </CustomDropdown>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchClick();
            }}}
          />
          <SearchButton onClick={handleSearchClick}>
            <SearchIcon src={searchicon} alt="search-icon" />
          </SearchButton>
        </SearchContainer>
      </MiddleBar>
      {isPopupOpen && <ReclassifyPopUp onClose={handleClosePopup} />}
    </>
  );
}

export default MiddleContent;
