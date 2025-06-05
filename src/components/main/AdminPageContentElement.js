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
  align-items: center;
  justify-content: center;
  width: 97%;
  height: 20%;
  gap: 2rem;
`;

const MainInfoContainerText = styled.div`
  color: #000;
  font-size: clamp(20px, 2vw, 32px);
  font-weight: bold;
  width: 100%;
  text-align: center;
`;

const MainInfoContainerEssayText = styled.div`
  color: rgb(255, 90, 90);
  margin-top: 0.5rem;
  font-size: clamp(15px, 2vw, 22px);
  font-weight: bold;
  width: 100%;
  text-align: center;
`;

const MainContainerEssayCriteria = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 97%;
  height: auto;
  margin-bottom: 2rem;
`;

const CriteriaSelectContainer = styled.div`
  position: relative;
  width: clamp(160px, 15vw, 280px);
  height: clamp(15px, 15vw, 42px);
  font-size: clamp(0.9rem, 1.2vw, 1,2rem);
  font-weight: bold;
  border: 3px solid #ccc;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 10px;
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
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 97%;
  gap: clamp(1rem, 4vw, 4rem);
  overflow-x: auto;
  padding-bottom: 1rem;
`;

const MainContainerContentChoiceItem = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  min-height: 220px;
  width: clamp(200px, 22vw, 240px);
  height: clamp(220px, 28vh, 280px);
  padding: 1.2rem;
  gap: clamp(0.8rem, 2vh, 1.5rem);
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    background-color: #a9d1f8;
    color: white;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const MainPageItemIcon = styled.img`
  width: 60%;
  height: auto;
`;

const MainPageItemText = styled.p`
  color: rgba(0, 0, 0, 0.8);
  font-weight: bold;
  font-size: clamp(1rem, 1.6vw, 1.5rem);
  margin: 0;
`;

function AdminPageContentElement() {
  const [uploadMessage, setUploadMessage] = useState("");
  const [messageColor, setMessageColor] = useState("blue");
  const [criteriaList, setCriteriaList] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://3.37.240.199/api/essays/criterias/")
      .then((res) => setCriteriaList(res.data))
      .catch((err) => console.error("Error fetching criteria:", err));
  }, []);

  const triggerFileUpload = (id, callback) => {
    const input = document.getElementById(id);
    input.click();
    input.onchange = callback;
  };

  const uploadFile = async (url, file, extra = {}) => {
    const formData = new FormData();
    formData.append("file", file);
    for (const key in extra) {
      formData.append(key, extra[key]);
    }

    try {
      const res = await axios.post(url, formData);
      if (res.status !== 201) throw new Error("업로드 실패");
      setUploadMessage("파일이 업로드 되었습니다.");
      setMessageColor("blue");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 406) {
        setUploadMessage("이미 제출한 지원자의 파일이 포함되어있습니다.");
      } else {
        setUploadMessage("파일 업로드 중 오류가 발생했습니다.");
      }
      setMessageColor("red");
    } finally {
      setTimeout(() => setUploadMessage(""), 9000);
    }
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) uploadFile("http://3.37.240.199/api/documents/", file);
  };

  const handleStudentRecordUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // 1. presigned URL 요청
      const presignRes = await axios.post("http://localhost:8000/api/aws/presigned-url/", {
        file_type: file.type,
        type: "student_record",
      });

      const { url, key } = presignRes.data;

      // 2. S3로 파일 업로드 (PUT 요청)
      const uploadRes = await axios.put(`${url}${key}`, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (uploadRes.status !== 200) throw new Error("S3 업로드 실패");

      setUploadMessage("파일이 업로드 되었습니다.");
      setMessageColor("blue");
    } catch (err) {
      console.error(err);
      setUploadMessage("파일 업로드 중 오류가 발생했습니다.");
      setMessageColor("red");
    } finally {
      setTimeout(() => setUploadMessage(""), 9000);
    }
  };

  const handleEssayUpload = (e) => {
    const file = e.target.files[0];
    if (!selectedCriteria) {
      setUploadMessage("논술 평가 기준을 선택해주세요.");
      setMessageColor("red");
      setTimeout(() => setUploadMessage(""), 6000);
      return;
    }
    if (file)
      uploadFile("http://3.37.240.199/api/essays/", file, {
        criteria: selectedCriteria,
      });
  };

  return (
    <>
      <MainContainerInfoTop>
        <AdminInfo>어드민님</AdminInfo>
      </MainContainerInfoTop>
      <MainInfoContainerTextSet>
        <MainInfoContainerText>업로드 할 파일을 선택해주세요</MainInfoContainerText>
        <MainInfoContainerEssayText>
          논술 답안지 업로드 시 논술 평가 기준을 먼저 선택해주세요
        </MainInfoContainerEssayText>
      </MainInfoContainerTextSet>
      <MainContainerEssayCriteria>
        <CriteriaSelectContainer onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <span>
            {selectedCriteria
              ? criteriaList.find((c) => c.id === selectedCriteria)?.title
              : "평가 기준을 선택하세요"}
          </span>
          <ArrowIcon isopen={isDropdownOpen} src={arrow_down} alt="arrow" />
          {isDropdownOpen && (
            <CriteriaSelectList>
              {criteriaList.map((c) => (
                <CriteriaSelectListItem
                  key={c.id}
                  isSelected={c.id === selectedCriteria}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCriteria(c.id);
                    setIsDropdownOpen(false);
                  }}
                >
                  {c.title}
                </CriteriaSelectListItem>
              ))}
            </CriteriaSelectList>
          )}
        </CriteriaSelectContainer>
      </MainContainerEssayCriteria>

      <MainContainerContentChoice>
        <MainContainerContentChoiceItem onClick={() => triggerFileUpload("document-upload", handleDocumentUpload)}>
          <input id="document-upload" type="file" multiple style={{ display: "none" }} />
          <MainPageItemIcon src={icon2} alt="document" />
          <MainPageItemText>입학 서류 업로드</MainPageItemText>
        </MainContainerContentChoiceItem>

        <MainContainerContentChoiceItem onClick={() => triggerFileUpload("student-record-upload", handleStudentRecordUpload)}>
          <input id="student-record-upload" type="file" multiple style={{ display: "none" }} />
          <MainPageItemIcon src={icon1} alt="record" />
          <MainPageItemText>생활기록부 업로드</MainPageItemText>
        </MainContainerContentChoiceItem>

        <MainContainerContentChoiceItem onClick={() => triggerFileUpload("essay-upload", handleEssayUpload)}>
          <input id="essay-upload" type="file" multiple style={{ display: "none" }} />
          <MainPageItemIcon src={icon3} alt="essay" />
          <MainPageItemText>논술 답안지 업로드</MainPageItemText>
        </MainContainerContentChoiceItem>
      </MainContainerContentChoice>

      {uploadMessage && (
        <p style={{ color: messageColor, fontSize: "1.8rem", marginTop: "0.5rem" }}>
          {uploadMessage}
        </p>
      )}
    </>
  );
}

export default AdminPageContentElement;
