import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import axios from "axios";

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

const EssayTestEvaluationContainer = styled.div`
  width: 37%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  background-color: rgba(204, 232, 255, 0.25);
`;

const EvaluationChoose = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 7%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2%;
`;

const EvaluationChooseButton = styled.div`
  width: auto%;
  height: 100%;
  color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 1.9rem;
  font-weight: 600;
  border-radius: 10px 10px 0px 0px;
  cursor: pointer;
  border: none;
  outline: none;
  border-bottom: 3px solid rgb(66, 84, 166);
`;

const EvaluationScoreChooseButton = styled.div`
  width: auto;
  height: 100%;
  color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.9rem;
  font-weight: 600;
  border-radius: 10px 10px 0px 0px;
  cursor: pointer;
  border: none;
  outline: none;
  border-bottom: 3px solid rgb(66, 84, 166);
`;

const EvaluationSummary = styled.div`
  width: 90%;
  height: 48%;
  margin-bottom: 2%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.18);
  flex-direction: column;
  margin-bottom: 2rem;
`;

const EvaluationSummaryTextBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ;
  color: rgba(0, 0, 0, 0.7);
  overflow: auto;
`;

const EvaluationSummaryText = styled.p`
  width: 90%;
  height: 100%;
  background-color: white;
  color: rgba(0, 0, 0, 0.8);
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  justify-content: left;
  align-items: flex-start;
  flex-direction: column;
  gap: 5%;
  overflow: auto;
  line-height: 1.5;
  margin-top: 6%;
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    width: 0;
    background: transparent; 
  }

  &:hover::-webkit-scrollbar {
    width: 0.7rem; 
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1); 
    border-radius: 10px;
  }
`;

const EvaluationSummaryPageText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  gap: 2rem;
`;

const EvaluationSummaryButton = styled.div`
  width: 8%;
  height: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 10px;
  &:hover {
    color: rgba(0, 0, 0, 0.8);
    font-weight: 700;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.2);
`;

const EvaluationChooseTop = styled.div`
  width: 90%;
  height: 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2%;
`;

const EvaluationDetail = styled.div`
  width: 90%;
  height: 30%;

  background-color: rgba(255, 255, 255, 0.26);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const EvaluationScoreBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: auto;

  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
  }

  &:hover::-webkit-scrollbar {
    width: 8px;
  }
`;

const EvaluationScoreTextBox = styled.div`
  width: 84%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: left;
`;

const EvaluationScorePageText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      font-weight: bold;
      color: rgba(0, 0, 0, 0.9);
    `}
`;

const EvaluationScoreText = styled.p`
  width: 100%;
  font-size: 1.8rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.5; 
`;

const EvaluationScoreButton = styled.div`
  width: 8%;
  height: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 10px;
  &:hover {
    color: rgba(0, 0, 0, 0.8);
    font-weight: 700;
  }
  ground-color: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.2);
`;

const EvaluationScoreItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;
  margin-top: 4%;
`;

const EvaluationNumberofLetter = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(249, 0, 0, 0.98);
  width: auto;
  height: 45%;
  text-align: right;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EvaluationScoreSaveButton = styled.button`
  width: 8rem;
  height: 60%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border: 1px solid rgba(118, 118, 118, 0.91);
  outline: none;
  cursor: pointer;
  font-size: 1.4rem;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 600;
  &:hover {
    background-color: rgba(216, 216, 216, 0.16);
    color: rgb(0, 0, 0);
  }
  /* 버튼 클릭 시 애니메이션 적용 */
  &:active {
    animation: ${shrinkExpand} 0.3s ease;
  }
`;

const CheckboxContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckboxContainerBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.7);
`;

const CheckboxInput = styled.input`
  width: 1.8rem;
  height: 1.5rem;
  cursor: pointer;
  accent-color: rgba(133, 155, 255, 0.91);
`;

const EvaluationSummaryBottomBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const Slider = styled.div`
  width: 120%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const Slide = styled.div`
  flex: 1;
  height: 10px;
  background-color: ${({ active }) =>
    active ? "rgba(133, 155, 255, 0.91)" : "rgba(0, 0, 0, 0.1)"};
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  transform: ${({ active }) => (active ? "translateX(0)" : "translateX(0%)")};
`;

function EssayTestEvaluation({
  content = "",
  criteria,
  score,
  essayId,
  onFullyScored,
}) {
  const [scores, setScores] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [summaryIndex, setSummaryIndex] = useState(0);
  const [scoreIndex, setScoreIndex] = useState(0);

  useEffect(() => {
    if (criteria && criteria.criteria_items) {
      const initialScores = criteria.criteria_items.reduce((acc, item) => {
        acc[`question${item.id}`] =
          item.score !== null ? item.score : undefined;
        return acc;
      }, {});
      setScores(initialScores);
    }
  }, [criteria]);

  const pages = React.useMemo(() => {
    if (!content) return [];
    const regex = /(\[요약문\d+\][\s\S]*?)(?=\[요약문\d+\]|$)/g;
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.push(match[1].trim());
    }
    return matches;
  }, [content]);

  const renderCurrentPage = () => {
    const page = pages[summaryIndex] || "";
    const extractIdx = page.indexOf("[추출문");
    const summaryTextFull =
      extractIdx >= 0 ? page.substring(0, extractIdx).trim() : page;
    const extractTextFull =
      extractIdx >= 0 ? page.substring(extractIdx).trim() : "";

    let summaryTitle = "";
    let summaryContent = "";
    if (summaryTextFull.startsWith("[요약문")) {
      const closingBracketIdx = summaryTextFull.indexOf("]");
      summaryTitle = summaryTextFull.substring(1, closingBracketIdx);
      summaryContent = summaryTextFull.substring(closingBracketIdx + 1).trim();
    } else {
      summaryContent = summaryTextFull;
    }

    let extractTitle = "";
    let extractContent = "";
    if (extractTextFull.startsWith("[추출문")) {
      const closingBracketIdx = extractTextFull.indexOf("]");
      extractTitle = extractTextFull.substring(1, closingBracketIdx);
      extractContent = extractTextFull.substring(closingBracketIdx + 1).trim();
    } else {
      extractContent = extractTextFull;
    }

    return (
      <>
        <div className="summary-part" style={{ marginBottom: "1rem" }}>
          {summaryTitle && (
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
              }}
            >
              {summaryTitle}
            </div>
          )}
          {summaryContent.split("\n").map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        {extractTextFull && (
          <div className="extract-part" style={{ marginBottom: "1rem" }}>
            {extractTitle && (
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  marginBottom: "0.5rem",
                }}
              >
                {extractTitle}
              </div>
            )}
            {extractContent.split("\n").map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        )}
      </>
    );
  };

  const handleScoreChange = (question, score) => {
    setScores((prevScores) => ({
      ...prevScores,
      [question]: score,
    }));
  };

  const handleScoreSelect = (question, score) => {
    handleScoreChange(question, score);
    setDropdownOpen((prev) => ({
      ...prev,
      [question]: false,
    }));
  };

  const handleSaveScores = async () => {
    if (!criteria || !criteria.criteria_items) return;

    const hasNullScores = criteria.criteria_items.some(
      (item) => scores[`question${item.id}`] === undefined
    );

    if (hasNullScores) {
      alert("모든 항목에 점수를 입력해야 합니다.");
      return;
    }

    const scoreData = criteria.criteria_items.map((item) => ({
      criteria_item: item.id,
      score: scores[`question${item.id}`],
    }));

    try {
      const response = await axios.post(
        `http://3.37.240.199/api/essays/${essayId}/scores/`,
        scoreData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to save scores");
      }

      if (typeof onFullyScored === "function") {
        onFullyScored(essayId);
      }

      alert("점수가 저장되었습니다.");
    } catch (error) {
      console.error("Error saving scores:", error);
      alert("점수 저장하는 과정에서 오류가 발생했습니다.");
    }
  };

  const handleSummaryPrevious = () => {
    setSummaryIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleSummaryNext = () => {
    setSummaryIndex((prevIndex) =>
      prevIndex < pages.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleScorePrevious = () => {
    setScoreIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleScoreNext = () => {
    setScoreIndex((prevIndex) =>
      prevIndex < criteria.criteria_items.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  if (!criteria || !criteria.criteria_items) {
    return <div>Loading...</div>;
  }

  return (
    <EssayTestEvaluationContainer>
      {criteria && criteria.criteria_items ? (
        <>
          <EvaluationChoose>
            <EvaluationChooseButton>답안지 요약</EvaluationChooseButton>
            {score !== null && (
              <EvaluationNumberofLetter>
                분량 감점 : {score}
              </EvaluationNumberofLetter>
            )}
          </EvaluationChoose>
          <EvaluationSummary>
            <EvaluationSummaryTextBox>
              <EvaluationSummaryText>
                {renderCurrentPage()}
              </EvaluationSummaryText>
            </EvaluationSummaryTextBox>
            <EvaluationSummaryBottomBox>
              <EvaluationSummaryButton
                onClick={handleSummaryPrevious}
                disabled={summaryIndex === 0}
              >
                &lt;
              </EvaluationSummaryButton>
              <EvaluationSummaryPageText>
                {pages.map((_, index) => (
                  <EvaluationSummaryPageText
                    key={index}
                    style={{
                      fontWeight: summaryIndex === index ? "bold" : "normal",
                      color:
                        summaryIndex === index
                          ? "rgba(44, 27, 232, 0.77)"
                          : "rgba(12, 3, 3, 0.3)",
                      cursor: "pointer",
                    }}
                    onClick={() => setSummaryIndex(index)}
                  >
                    {index + 1}
                  </EvaluationSummaryPageText>
                ))}
              </EvaluationSummaryPageText>
              <EvaluationSummaryButton
                onClick={handleSummaryNext}
                disabled={summaryIndex === pages.length - 1}
              >
                &gt;
              </EvaluationSummaryButton>
            </EvaluationSummaryBottomBox>
          </EvaluationSummary>
          <EvaluationChooseTop>
            <EvaluationScoreChooseButton>
              답안지 점수 채점
            </EvaluationScoreChooseButton>
            <EvaluationScoreSaveButton onClick={handleSaveScores}>
              점수 저장
            </EvaluationScoreSaveButton>
          </EvaluationChooseTop>
          <EvaluationDetail>
            <EvaluationScoreBox>
              <EvaluationScoreButton
                onClick={handleScorePrevious}
                disabled={scoreIndex === 0}
              >
                &lt;
              </EvaluationScoreButton>
              <EvaluationScoreTextBox>
                <Slider>
                  {criteria.criteria_items.map((item, index) => (
                    <Slide
                      key={item.id}
                      active={scoreIndex === index}
                      onClick={() => setScoreIndex(index)}
                    />
                  ))}
                </Slider>
                <EvaluationScoreItem
                  key={criteria.criteria_items[scoreIndex].id}
                >
                  <EvaluationScoreText>
                    {criteria.criteria_items[scoreIndex].content.replace(
                      /^\d+\.\s*/,
                      ""
                    )}
                  </EvaluationScoreText>
                  <CheckboxContainer>
                    <CheckboxContainerBox>
                      {[0, 1, 2, 3, 4, 5].map((score) => (
                        <CheckboxLabel key={score}>
                          <CheckboxInput
                            type="radio"
                            name={`question${criteria.criteria_items[scoreIndex].id}`}
                            checked={
                              scores[
                                `question${criteria.criteria_items[scoreIndex].id}`
                              ] === score
                            }
                            onChange={() =>
                              handleScoreSelect(
                                `question${criteria.criteria_items[scoreIndex].id}`,
                                score
                              )
                            }
                          />
                          {score}
                        </CheckboxLabel>
                      ))}
                    </CheckboxContainerBox>
                  </CheckboxContainer>
                </EvaluationScoreItem>
              </EvaluationScoreTextBox>
              <EvaluationScoreButton
                onClick={handleScoreNext}
                disabled={scoreIndex === criteria.criteria_items.length - 1}
              >
                &gt;
              </EvaluationScoreButton>
            </EvaluationScoreBox>
          </EvaluationDetail>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </EssayTestEvaluationContainer>
  );
}

export default EssayTestEvaluation;
