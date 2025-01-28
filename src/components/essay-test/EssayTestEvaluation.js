import React from "react";
import styled from "styled-components";
import { useState } from "react";

const EssayTestEvaluationContainer = styled.div`
  width: 40%;
  height: 100%;
`;

const EvaluationSummary = styled.div`
  width: 100%;
  height: 46%;
  margin-bottom: 5%;
  border-radius: 0px 10px 10px 10px;
  background-color: #f9fafd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EvaluationDetail = styled.div`
  width: 100%;
  height: 46.3%;
  border-radius: 10px 10px 0px 0px;
  background-color: #f9fafd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  width: 95%;
  height: 93%;
  background-color: white;
  color: rgba(0, 0, 0, 0.3);
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EvaluationChoose = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 4%;
`;

const EvaluationChooseButton = styled.button`
  width: 17%;
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

function EssayTestEvaluation({ content }) {
  const [selectedEvaluation, setSelectedEvaluation] = useState("record");

  const handleEvaluationClick = (evaluation) => {
    setSelectedEvaluation(evaluation);
  };

  return (
    <EssayTestEvaluationContainer>
      <EvaluationChoose>
        <EvaluationChooseButton
          selected={selectedEvaluation === "record"}
          onClick={() => handleEvaluationClick("record")}
        >
          논술 답안지 요약
        </EvaluationChooseButton>
        <EvaluationChooseButton
          selected={selectedEvaluation === "interview"}
          onClick={() => handleEvaluationClick("interview")}
        >
          논술 답안지 평가
        </EvaluationChooseButton>
      </EvaluationChoose>
      <EvaluationSummary>
        <WhiteBox large>{content || "지원자를 클릭해주세요"}</WhiteBox>
      </EvaluationSummary>
      <EvaluationDetail>
        <WhiteBox>지원자를 클릭해주세요</WhiteBox>
      </EvaluationDetail>
    </EssayTestEvaluationContainer>
  );
}

export default EssayTestEvaluation;
