import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import icon1 from "../../assets/aims1.png";
import icon2 from "../../assets/aims2.png";
import icon3 from "../../assets/aims3.png";
import arrow_down from "../../assets/arrow_down.png";

const MainContainerInfoTop = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 97%;
  height: 6%;
`;

const AdminInfo = styled.p`
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
  font-size: 1.3rem;
`;

const MainInfoContainerTextSet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 97%;
  height: 20%;
  gap: 2rem;
`;

const MainInfoContainerText = styled.div`
  color: rgba(0, 0, 0, 1);
  margin: 0;
  font-size: 2.8rem;
  font-weight: bold;
  width: 97%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainInfoContainerEssayText = styled.div`
  color: rgb(255, 90, 90);
  margin-top: 0.5rem;
  font-size: 1.6rem;
  font-weight: bold;
  width: 97%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainerEssayCriteria = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  width: 97%;
  height: 5%;
  margin-right: 33rem;
`;

const CriteriaSelectContainer = styled.div`
  position: relative;
  width: 20rem;
  height: 3rem;
  font-size: 1.5rem;
  font-weight: bold;
  border: 3px solid #ccc;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
`;

const CriteriaSelectList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 10rem;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  list-style: none;
  margin: 0;
  z-index: 1000;
`;

const CriteriaSelectListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 2px solid #ccc;
  font-size: 1.4rem;
  padding: 15px 0;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "500")};
  background-color: ${({ isSelected }) =>
    isSelected ? "#a9d1f8" : "transparent"};
  &:hover {
    background-color: #a9d1f8;
    font-weight: bold;
  }
`;

const ArrowIcon = styled.img`
  position: absolute;
  right: 1rem;
  width: 1.2rem;
  height: 1.2rem;
  transition: transform 0.3s ease;
  transform: rotate(${(props) => (props.isopen ? "180deg" : "0deg")});
`;

const MainContainerContentChoice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 97%;
  height: 60%;
  gap: 6%;
`;

const MainContainerContentChoiceItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  width: 20%;
  height: 90%;
  gap: 1rem;
  border-radius: 2rem;
  cursor: pointer;

  &:hover {
    background-color: #a9d1f8;
    color: white;
  }

  &:active {
    transform: scale(0.95);
    transition: transform 0.1s ease;
  }
`;

const MainContainerContentChoiceItemLine = styled.div`
  width: 1px;
  height: 40%;
  background-color: #3c50aa;
`;

const MainPageItemIcon = styled.img`
  width: 75%;
  height: 55%;
  margin-bottom: 10%;
`;

const MainPageItemText = styled.p`
  color: rgba(0, 0, 0, 0.8);
  font-weight: bold;
  font-size: 2.5rem;
`;

function AdminPageContentElement({}) {
  const [uploadMessage, setUploadMessage] = useState("");
  const [messageColor, setMessageColor] = useState("blue");
  const [criteriaList, setCriteriaList] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await axios.get(
          "http://3.37.240.199/api/essays/criterias/"
        );
        setCriteriaList(response.data);
      } catch (error) {
        console.error("Error fetching criteria:", error);
      }
    };

    fetchCriteria();
  }, []);

  const handleDocumentReviewClick = () => {
    const inputElement = document.getElementById("document-upload");
    inputElement.click();
    inputElement.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axios.post(
            "http://3.37.240.199/api/documents/",
            formData
          );

          if (response.status !== 201) {
            throw new Error("파일 업로드 실패");
          }
          setUploadMessage("파일이 업로드 되었습니다.");
          setMessageColor("blue");
        } catch (error) {
          console.error("Error:", error);
          setUploadMessage("파일 업로드 중 오류가 발생했습니다.");
          setMessageColor("red");
        } finally {
          setTimeout(() => {
            setUploadMessage("");
          }, 9000);
        }
      }
    };
  };

  const handleStudentRecordClick = () => {
    const inputElement = document.getElementById("student-record-upload");
    inputElement.click();
    inputElement.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axios.post(
            "http://3.37.240.199/api/student-records/",
            formData
          );

          if (response.status !== 201) {
            throw new Error("파일 업로드 실패");
          }
          setUploadMessage("파일이 업로드 되었습니다.");
          setMessageColor("blue");
        } catch (error) {
          console.error("Error:", error);
          if (error.response && error.response.status === 406) {
            setUploadMessage("이미 제출한 지원자의 파일이 포함되어있습니다.");
            setMessageColor("red");
          } else {
            setUploadMessage("파일 업로드 중 오류가 발생했습니다.");
            setMessageColor("red");
          }
        } finally {
          setTimeout(() => {
            setUploadMessage("");
          }, 9000);
        }
      }
    };
  };

  const handleEssayTestClick = () => {
    document.getElementById("essay-upload").click();
  };

  const handleEssayUpload = async (event) => {
    const file = event.target.files[0];
    if (!selectedCriteria) {
      setUploadMessage("논술 평가 기준을 선택해주세요.");
      setMessageColor("red");
      setTimeout(() => {
        setUploadMessage("");
      }, 6000);
      return;
    }
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("criteria", selectedCriteria);

      try {
        const response = await axios.post(
          "http://3.37.240.199/api/essays/",
          formData
        );

        if (response.status !== 201) {
          throw new Error("파일 업로드 실패");
        }
        setUploadMessage("파일이 업로드 되었습니다.");
        setMessageColor("blue");
      } catch (error) {
        console.error("Error:", error);
        setUploadMessage("파일 업로드 중 오류가 발생했습니다.");
        setMessageColor("red");
      } finally {
        setTimeout(() => {
          setUploadMessage("");
        }, 9000);
      }
    }
  };

  const handleCriteriaSelect = (criteriaId) => {
    setSelectedCriteria(criteriaId);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <MainContainerInfoTop>
        <AdminInfo>어드민님</AdminInfo>
      </MainContainerInfoTop>
      <MainInfoContainerTextSet>
        <MainInfoContainerText>
          업로드 할 파일을 선택해주세요
        </MainInfoContainerText>
        <MainInfoContainerEssayText>
          논술 답안지 업로드 시 논술 평가 기준을 먼저 선택해주세요
        </MainInfoContainerEssayText>
      </MainInfoContainerTextSet>
      <MainContainerEssayCriteria>
        <CriteriaSelectContainer
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>
            {selectedCriteria
              ? criteriaList.find((c) => c.id === selectedCriteria)?.title
              : "평가 기준을 선택하세요"}
          </span>
          <ArrowIcon
            isopen={isDropdownOpen}
            src={arrow_down}
            alt="드롭다운 화살표"
          />
          {isDropdownOpen && (
            <CriteriaSelectList>
              {criteriaList.map((criteria) => (
                <CriteriaSelectListItem
                  key={criteria.id}
                  isSelected={criteria.id === selectedCriteria}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCriteriaSelect(criteria.id);
                  }}
                >
                  {criteria.title}
                </CriteriaSelectListItem>
              ))}
            </CriteriaSelectList>
          )}
        </CriteriaSelectContainer>
      </MainContainerEssayCriteria>
      <MainContainerContentChoice>
        <MainContainerContentChoiceItem onClick={handleDocumentReviewClick}>
          <input
            type="file"
            id="document-upload"
            multiple
            style={{ display: "none" }}
          />
          <MainPageItemIcon src={icon2} alt="icon" />
          <MainPageItemText>입학 서류 업로드</MainPageItemText>
        </MainContainerContentChoiceItem>
        <MainContainerContentChoiceItemLine />
        <MainContainerContentChoiceItem onClick={handleStudentRecordClick}>
          <input
            type="file"
            id="student-record-upload"
            multiple
            style={{ display: "none" }}
          />
          <MainPageItemIcon src={icon1} alt="icon" />
          <MainPageItemText>생활기록부 업로드</MainPageItemText>
        </MainContainerContentChoiceItem>
        <MainContainerContentChoiceItemLine />
        <MainContainerContentChoiceItem onClick={handleEssayTestClick}>
          <input
            type="file"
            id="essay-upload"
            multiple
            style={{ display: "none" }}
            onChange={handleEssayUpload}
          />
          <MainPageItemIcon src={icon3} alt="icon" />
          <MainPageItemText>논술 답안지 업로드</MainPageItemText>
        </MainContainerContentChoiceItem>
      </MainContainerContentChoice>

      {uploadMessage && (
        <p
          style={{
            color: messageColor,
            fontSize: "1.8rem",
            marginTop: "0.5rem",
          }}
        >
          {uploadMessage}
        </p>
      )}
    </>
  );
}

export default AdminPageContentElement;
