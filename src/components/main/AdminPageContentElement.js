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
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    axios
      .get("http://3.37.240.199/api/essays/criterias/")
      .then((res) => setCriteriaList(res.data))
      .catch((err) => console.error("Error fetching criteria:", err));
  }, []);

  const triggerFileUpload = (id, callback) => {
    const input = document.getElementById(id);
    
    // 기존 이벤트 리셋
    input.value = ""; // 파일 선택 기록 초기화
    input.onchange = (e) => {
      callback(e);
      input.value = ""; // 다시 같은 파일 선택해도 작동되도록 초기화
    };

    input.click();
  };

  const uploadFile = async (url, file, extra = {}) => {
    const formData = new FormData();
    formData.append("file", file);
    for (const key in extra) {
      formData.append(key, extra[key]);
    }

    setIsUploading(true);

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
      setIsUploading(false);
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

    setIsUploading(true);

    try {
      const filenameWithoutExt = file.name.split(".")[0];
      const [student_id, student_name, department, application_type] = filenameWithoutExt.split("_");

      if (!student_id || !student_name || !department || !application_type) {
        throw new Error("파일명에서 학생 정보를 추출할 수 없습니다.");
      }
      // STEP 1: S3 Presigned URL 요청
      const presignRes = await axios.post("http://localhost:8000/api/aws/presigned-url/", {
        file_type: file.type,
        type: "student_record",
      });
      const s3Url = presignRes.data.url;

      // STEP 2: S3에 파일 업로드
      await axios.put(s3Url, file, {
        headers: { "Content-Type": file.type },
      });

      const s3FilePath = s3Url.split("?")[0]; // presigned url에서 실제 S3 경로 추출

      // STEP 3: OCR API 요청
      const ocrForm = new FormData();
      ocrForm.append("document", file);
      ocrForm.append("schema", "oac");
      ocrForm.append("model", "ocr-2.2.1");

      const ocrResponse = await fetch("https://api.upstage.ai/v1/document-digitization", {
        method: "POST",
        headers: {
          Authorization: `Bearer up_iEOr12RdbUKiMyAU2wI8OzrTfjOTk`, // API 키 입력
        },
        body: ocrForm,
      });

      const ocrData = await ocrResponse.json();
      const extractedText = ocrData.text;

      // STEP 4: student_record 백엔드로 POST
      const studentRecordPayload = {
        student_id,
        student_name,
        department,
        application_type,
        ocr_text: extractedText,
        file: s3FilePath,
        evaluation_category_id: 1,
      };

      const recordRes = await axios.post("http://localhost:8000/api/v2/student-records/", studentRecordPayload);

      if (recordRes.status === 201 || recordRes.status === 200) {
        setUploadMessage("생활기록부 업로드 및 분석이 완료되었습니다.");
        setMessageColor("blue");
      } else {
        throw new Error("학생 기록 등록 실패");
      }
    } catch (err) {
      console.error("오류 발생:", err);
      setUploadMessage("OCR 또는 업로드 중 오류가 발생했습니다.");
      setMessageColor("red");
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadMessage(""), 9000);
    }
  };

  const handleEssayUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // 파일명 예: 20250001_송재현_인공지능학과_생기부(면접형)_논술.pdf
      const filenameWithoutExt = file.name.split(".")[0];
      const [student_id, student_name, department, application_type] = filenameWithoutExt.split("_");

      if (!student_id || !student_name || !department || !application_type) {
        throw new Error("파일명에서 학생 정보를 추출할 수 없습니다.");
      }

      // STEP 1: S3 Presigned URL 요청
      const presignRes = await axios.post("http://localhost:8000/api/aws/presigned-url/", {
        file_type: file.type,
        type: "essay",
      });
      const s3Url = presignRes.data.url;
      const s3FilePath = s3Url.split("?")[0];

      // STEP 2: S3에 업로드
      await axios.put(s3Url, file, {
        headers: { "Content-Type": file.type },
      });

      // STEP 3: OCR 요청
      const ocrForm = new FormData();
      ocrForm.append("document", file);
      ocrForm.append("schema", "oac");
      ocrForm.append("model", "ocr-2.2.1");

      const ocrResponse = await fetch("https://api.upstage.ai/v1/document-digitization", {
        method: "POST",
        headers: {
          Authorization: `Bearer up_iEOr12RdbUKiMyAU2wI8OzrTfjOTk`, // 여기에 실제 API 키 입력
        },
        body: ocrForm,
      });

      const ocrData = await ocrResponse.json();
      const extractedText = ocrData.text;

      // STEP 4: 백엔드로 POST 요청
      const essayPayload = {
        student_id,
        student_name,
        department,
        application_type,
        ocr_text: extractedText,
        file: s3FilePath,
        evaluation_category_id: 1,
      };

      const res = await axios.post("http://localhost:8000/api/v2/essays/", essayPayload);

      if (res.status === 201 || res.status === 200) {
        setUploadMessage("논술 업로드 및 분석이 완료되었습니다.");
        setMessageColor("blue");
      } else {
        throw new Error("논술 등록 실패");
      }
    } catch (err) {
      console.error("논술 업로드 오류:", err);
      setUploadMessage("논술 업로드 중 오류가 발생했습니다.");
      setMessageColor("red");
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadMessage(""), 9000);
    }
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
      
      {isUploading && (
        <p style={{ color: "black", fontSize: "1.6rem", marginTop: "0.5rem" }}>
          파일 업로드 및 AI 판독 중...
        </p>
      )}

      {uploadMessage && (
        <p style={{ color: messageColor, fontSize: "1.8rem", marginTop: "0.5rem" }}>
          {uploadMessage}
        </p>
      )}
    </>
  );
}

export default AdminPageContentElement;
