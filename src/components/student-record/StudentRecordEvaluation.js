import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const EvaluationContainer = styled.div`
  width: 40%;
  height: 100%;
`;

const EvaluationChoose = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 4%;
`;

const EvaluationChooseButton = styled.button`
  width: 15%;
  height: 100%;
  background-color: ${(props) =>
    props.selected ? "#3c50aa" : "#edf0f5"}; /* 선택된 항목의 배경색 */
  color: ${(props) =>
    props.selected ? "white" : "rgba(0, 0, 0, 0.9)"}; /* 선택된 항목의 글자색 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 10px 10px 0px 0px;
  cursor: pointer;
  border: none;
  outline: none;
`;

const EvaluationSummary = styled.div`
  width: 100%;
  height: 41%;
  margin-bottom: 6%;
  border-radius: 0px 10px 10px 10px;
  background-color: #f9fafd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EvaluationDetail = styled.div`
  width: 100%;
  height: 47%;
  border-radius: 10px 10px 0px 0px;
  background-color: #f9fafd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  position: relative;
  width: 95%;
  height: 93%;
  background-color: white;
  color: rgba(0, 0, 0, 0.3);
  font-size: ${(props) => (props.large ? "1.8rem" : "1.2rem")};
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    resize: none;
    font-size: ${(props) => (props.large ? "1.8rem" : "1.2rem")};
    color: rgba(0, 0, 0, 0.9);
  }
`;

const SaveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #3c50aa;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1rem;
`;

function StudentRecordEvaluation({ content, question, memo, evaluation, id }) {
  const [selectedEvaluation, setSelectedEvaluation] = useState("record");
  const [selectedEvaluation2, setSelectedEvaluation2] = useState("evaluation");
  const [currentMemo, setCurrentMemo] = useState(memo || "");

  useEffect(() => {
    console.log("Student Record ID:", id);
  }, [id]);

  const handleEvaluationClick = (type) => {
    setSelectedEvaluation(type);
  };

  const handleEvaluationClick2 = (type) => {
    setSelectedEvaluation2(type);
  };

  const handleSaveMemo = async () => {
    try {
      const response = await axios.put(
        `http://3.37.240.199/api/documents/student-records/${id}/`,
        { memo: currentMemo }
      );
      console.log("Memo saved:", response.data);
      alert("메모가 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("메모 저장 실패:", error);
      alert("메모 저장에 실패했습니다.");
    }
  };

  return (
    <EvaluationContainer>
      <EvaluationChoose>
        <EvaluationChooseButton
          selected={selectedEvaluation === "record"}
          onClick={() => handleEvaluationClick("record")}
        >
          생활기록부 요약
        </EvaluationChooseButton>
        <EvaluationChooseButton
          selected={selectedEvaluation === "interview"}
          onClick={() => handleEvaluationClick("interview")}
        >
          추천 면접 질문
        </EvaluationChooseButton>
      </EvaluationChoose>
      <EvaluationSummary>
        <WhiteBox large>
          {selectedEvaluation === "record"
            ? content || "지원자를 클릭해주세요"
            : question || "지원자를 클릭해주세요"}
        </WhiteBox>
      </EvaluationSummary>
      <EvaluationChoose>
        <EvaluationChooseButton
          selected={selectedEvaluation2 === "evaluation"}
          onClick={() => handleEvaluationClick2("evaluation")}
        >
          점수 평가
        </EvaluationChooseButton>
        <EvaluationChooseButton
          selected={selectedEvaluation2 === "memo"}
          onClick={() => handleEvaluationClick2("memo")}
        >
          면접 참고 메모
        </EvaluationChooseButton>
      </EvaluationChoose>
      <EvaluationDetail>
        <WhiteBox large>
          {selectedEvaluation2 === "evaluation" ? (
            "점수 평가 페이지입니다"
          ) : (
            <>
              <div>{memo || "지원자를 클릭해주세요"}</div>
              <textarea
                value={currentMemo}
                onChange={(e) => setCurrentMemo(e.target.value)}
              />
              <SaveButton onClick={handleSaveMemo}>저장</SaveButton>
            </>
          )}
        </WhiteBox>
      </EvaluationDetail>
    </EvaluationContainer>
  );
}

export default StudentRecordEvaluation;
