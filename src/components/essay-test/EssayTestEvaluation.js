import React from "react";
import styled from "styled-components";

const EssayTestEvaluationContainer = styled.div`
  width: 40%;
  height: 100%;
`;

const EvaluationSummary = styled.div`
  width: 100%;
  height: 50%;
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

function EssayTestEvaluation() {
  return (
    <EssayTestEvaluationContainer>
      <EvaluationSummary>
        <WhiteBox>None</WhiteBox>
      </EvaluationSummary>
      <EvaluationDetail>
        <WhiteBox>None</WhiteBox>
      </EvaluationDetail>
    </EssayTestEvaluationContainer>
  );
}

export default EssayTestEvaluation; 