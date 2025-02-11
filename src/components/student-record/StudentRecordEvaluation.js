import React, { useState, useEffect, useRef } from "react";
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

const EvaluationContainer = styled.div`
  width: 37%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  background-color: rgba(204, 232, 255, 0.25);
`;

const EvaluationChoose = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 7%;
  justify-content: left;
  align-items: center;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 3%;
  gap: 2rem;
`;

const EvaluationChoose1 = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 7%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 3%;
`;

const EvaluationChooseButton = styled.div`
  width: auto;
  height: 100%;
  color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.9rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;

  ${({ selected }) =>
    selected &&
    css`
      color: rgba(0, 0, 0, 0.8);
    `}
`;

const EvaluationSummary = styled.div`
  width: 90%;
  height: ${({ isInterview }) => (isInterview ? "44.35%" : "33%")};
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.18);
  flex-direction: column;
  margin-bottom: 0.5rem;
  flex-direction: row;
`;

const EvaluationSummaryBottomBox = styled.div`
  width: 100%;
  height: 4%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-bottom: 2rem;
`;

const StudentScoreEvaluation = styled.div`
  width: 90%;
  height: 30%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.18);
  flex-direction: row;
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
  color: rgba(0, 0, 0, 0.45);
`;

const EvaluationSummaryTextBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: none;
  color: rgba(0, 0, 0, 0.7);
  overflow: auto;
  background-color: ;
`;

const EvaluationSummaryAndQuestionText = styled.div`
  width: ${({ isInterview }) => (isInterview ? "90%" : "100%")};
  height: ${({ isInterview }) => (isInterview ? "85%" : "90%")};
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.8rem;
  font-weight: ${({ isInterview }) => (isInterview ? 515 : 500)};
  display: flex;
  justify-content: ${({ isInterview }) => (isInterview ? "left" : "left")};
  align-items: left;
  justify-content: left;
  flex-direction: column;
  gap: ${({ isInterview }) => (isInterview ? "0" : "5%")};
  overflow: auto;
  line-height: ${({ isInterview }) => (isInterview ? "1.4" : "1.55")};
  margin-top: ${({ isInterview }) => (isInterview ? "5%" : "0%")};
  margin-bottom: ${({ isInterview }) => (isInterview ? "5%" : "0%")};

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
`;

const StudentRecordScoreText = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  justify-content: Center;
  align-items: center;
  flex-direction: column;
  gap: 3%;
  line-height: 1.6;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    width: 0;
    background: transparent; /* 스크롤바 배경 제거 */
  }

  /* 마우스를 올릴 때만 스크롤바 나타나게 하기 */
  &:hover::-webkit-scrollbar {
    width: 0.7rem; /* 원하는 스크롤바 너비 설정 */
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5); /* 스크롤바 색상 설정 */
    border-radius: 10px; /* 스크롤바 모서리 둥글게 */
  }
`;

const StudentRecordScoreTextSet = styled.div`
  width: 84%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: left;
`;

const StudentRecordQuestionTextSet = styled.div`
  width: 90%;
  height: 90%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const SaveButton = styled.button`
  display: flex;
  width: 100%;
  height: 15%;
  justify-content: center;
  align-items: center;
  background-color: ${({ changed }) =>
    changed ? "rgb(139, 203, 255)" : "rgb(174, 219, 255)"};
  color: ${({ changed }) =>
    changed ? "rgba(0, 0, 0, 0.7)" : "rgb(246, 246, 246)"};
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 700;
  &:hover {
    background-color: rgb(139, 203, 255);
    color: rgba(0, 0, 0, 0.7);
  }
  /* 버튼 클릭 시 애니메이션 적용 */
  &:active {
    animation: ${shrinkExpand} 1.3s ease;
  }
`;

const EvaluationSummaryPageSet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  font-size: 1.5rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  gap: 2rem;
  background-color: rgba(255, 255, 255, 0.25);
`;

const EvaluationSummaryPageText = styled.div`
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

const StudentRecordQuestionMemo = styled.textarea`
  width: 100%;
  height: 72%;
  margin-top: 3%;
  margin-bottom: 3%;
  border: none;
  outline: none;
  background-color: none;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.65rem;
  font-weight: 500;
  display: flex;
  justify-content: left;
  line-height: 1.5;
  word-spacing: 0rem;
  overflow: auto;
`;

const StudentRecordScoreBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
  }

  &:hover::-webkit-scrollbar {
    width: 8px;
  }
`;

const StudentRecordScoreButton = styled.div`
  width: 8%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 10px;
  color: rgba(0, 0, 0, 0.45);
  &:hover {
    color: rgba(0, 0, 0, 0.8);
    font-weight: 700;
  }
`;

const StudentRecordQuestionTextItem = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const CheckboxContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StudentRecordScorePageItemTitle = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 95%;
  height: 23%;
  font-size: 2rem;
  font-weight: 700;
`;

const CheckboxContainerBox = styled.div`
  width: 95%;
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

const StudentRecordScorePageItemText = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const StudentRecordScorePageItemTextSet = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: column;
  width: 95%;
  height: 50%;
`;

const EvaluationChooseFrontSet = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 2rem;
`;

const SaveScoreButton = styled.button`
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

const EvaluationCategoryTitle = styled.h2`
  width: 90%;
  height: 3%;

  font-size: 2rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.85);
`;

const StyledParagraph = styled.p`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: rgba(0, 0, 0, 0.7);
`;

const evaluationCategories = [
  {
    title: "1. 학업 역량",
    items: [
      "✓ㅤ전체적인 교과 관련 성취수준 및 학업 발전 정도",
      "✓ㅤ학업을 수행하고 학습해 나가려는 의지와 노력",
      "✓ㅤ교과 관련 탐구활동의 참여 및 성취, 지식의 발전가능성",
    ],
  },
  {
    title: "2. 진로 역량",
    items: [
      "✓ㅤ지원 전공에 필요한 과목을 선택하여 이수한 정도",
      "✓ㅤ지원 전공 관련 과목을 수강하고 취득한 학업 성취 수준",
      "✓ㅤ진로 탐색 과정에서 이루어진 활동이나 경험 및 노력 정도",
    ],
  },
  {
    title: "3. 창의적 문제 해결 역량",
    items: [
      "✓ㅤ문제 해결을 위한 창의적·적극적 노력과 경험",
      "✓ㅤ주어진 교육환경을 극복하거나 충분히 활용한 주도적 경험",
      "✓ㅤ공동체와 자신의 발전을 도모하기 위한 구체적 행동 경험",
    ],
  },
  {
    title: "4. 공동체 역량",
    items: [
      "✓ㅤ나눔, 배려, 타인을 존중하는 태도와 경험",
      "✓ㅤ협업 등의 경험을 통한 공동체 기여 경험",
      "✓ㅤ타인에 대한 공감 및 소통능력",
    ],
  },
];

function parseContent(content) {
  if (!content) return [];
  const cleanedContent = content.replace(/\*/g, "").trim();

  const mainRegex =
    /(\[(학업 역량|진로 역량|창의·융합 역량|공동체 역량)\])([\s\S]*?)(?=\[(학업 역량|진로 역량|창의·융합 역량|공동체 역량)\]|$)/g;
  const pages = [];
  let mainMatch;

  while ((mainMatch = mainRegex.exec(cleanedContent)) !== null) {
    const mainTitle = mainMatch[2].trim();
    const mainText = mainMatch[3].trim();

    const subsectionRegex = /<([^>]+)>([\s\S]*?)(?=<[^>]+>|$)/g;
    let subsectionMatch;
    const sections = [];

    while ((subsectionMatch = subsectionRegex.exec(mainText)) !== null) {
      const subsectionTitle = subsectionMatch[1].trim();
      const subsectionContent = subsectionMatch[2].trim();

      const paragraphs = subsectionContent
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line) =>
          line.startsWith("-") ? line.substring(1).trim() : line
        );

      sections.push({
        title: subsectionTitle,
        paragraphs: paragraphs,
      });
    }

    if (sections.length === 0 && mainText) {
      const paragraphs = mainText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line) =>
          line.startsWith("-") ? line.substring(1).trim() : line
        );
      sections.push({
        title: "",
        paragraphs: paragraphs,
      });
    }

    pages.push({
      title: mainTitle,
      sections: sections,
    });
  }

  return pages;
}

function StudentRecordEvaluation({
  content,
  question,
  memo,
  evaluation,
  id,
  score1,
  score2,
  score3,
  score4,
}) {
  const [selectedEvaluation, setSelectedEvaluation] = useState("record");
  const [selectedEvaluation2, setSelectedEvaluation2] = useState("evaluation");
  const [currentMemo, setCurrentMemo] = useState(memo || "");
  const [savedMemo, setSavedMemo] = useState(memo || "");
  const [summaryIndex, setSummaryIndex] = useState(0);
  const [subSectionIndex, setSubSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState([score1, score2, score3, score4]);
  const [scoreIndex, setScoreIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const underlineRef = useRef(null);
  const underlineRef1 = useRef(null);
  const underlineRef2 = useRef(null);

  useEffect(() => {
    console.log("Student Record ID:", id);
    setCurrentMemo(memo || "");
    setSavedMemo(memo || "");
    const fetchScores = async () => {
      try {
        const response = await axios.get(
          `http://3.37.240.199/api/students/score`
        );
        setScores(response.data.scores);
      } catch (error) {
        console.error("점수 불러오기 실패:", error);
      }
    };

    fetchScores();
  }, [id, memo]);

  useEffect(() => {
    setScores([score1, score2, score3, score4]);
  }, [score1, score2, score3, score4]);

  useEffect(() => {
    const activeButton = document.querySelector(`#${selectedEvaluation}`);
    if (activeButton && underlineRef.current) {
      underlineRef.current.style.left = `${activeButton.offsetLeft}px`;
      underlineRef.current.style.width = `${activeButton.offsetWidth}px`;
    }
  }, [selectedEvaluation]);

  useEffect(() => {
    const activeButton1 = document.querySelector(`#${selectedEvaluation}`);
    if (activeButton1 && underlineRef1.current) {
      underlineRef1.current.style.left = `${activeButton1.offsetLeft}px`;
      underlineRef1.current.style.width = `${activeButton1.offsetWidth}px`;
    }
  }, [selectedEvaluation]);

  useEffect(() => {
    const activeButton2 = document.querySelector(`#${selectedEvaluation2}`);
    if (activeButton2 && underlineRef2.current) {
      underlineRef2.current.style.left = `${activeButton2.offsetLeft}px`;
      underlineRef2.current.style.width = `${activeButton2.offsetWidth}px`;
    }
  }, [selectedEvaluation2]);

  useEffect(() => {
    setSubSectionIndex(0);
  }, [summaryIndex]);

  const handleEvaluationClick = (type) => {
    setSelectedEvaluation(type);
  };

  const handleEvaluationClick2 = (type) => {
    setSelectedEvaluation2(type);
  };

  const handleSaveMemo = async () => {
    try {
      const response = await axios.patch(
        `http://3.37.240.199/api/student-records/${id}/memo/`,
        { memo: currentMemo }
      );
      console.log("Memo saved:", response.data);
      alert("메모가 성공적으로 저장되었습니다.");
      setSavedMemo(currentMemo);
    } catch (error) {
      console.error("메모 저장 실패:", error);
      alert("메모 저장에 실패했습니다.");
    }
  };

  const handleSummaryPrevious = () => {
    setSummaryIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleSummaryNext = () => {
    setSummaryIndex((prevIndex) =>
      prevIndex < parsedContent.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleSubSectionPrevious = () => {
    setSubSectionIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleSubSectionNext = () => {
    const mainSection = parsedContent[summaryIndex];
    setSubSectionIndex((prev) =>
      mainSection &&
      mainSection.sections &&
      prev < mainSection.sections.length - 1
        ? prev + 1
        : prev
    );
  };

  const handleScorePrevious = () => {
    setScoreIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleScoreNext = () => {
    setScoreIndex((prevIndex) => (prevIndex < 3 ? prevIndex + 1 : prevIndex));
  };

  const handleCategoryPrevious = () => {
    setCategoryIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleCategoryNext = () => {
    setCategoryIndex((prevIndex) =>
      prevIndex < evaluationCategories.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleScoreChange = (newScore) => {
    setScores((prevScores) => {
      const updatedScores = [...prevScores];
      updatedScores[categoryIndex] = newScore;
      return updatedScores;
    });
  };

  const handleSaveScores = async () => {
    try {
      const response = await axios.patch(
        `http://3.37.240.199/api/student-records/${id}/scores/`,
        {
          score1: scores[0],
          score2: scores[1],
          score3: scores[2],
          score4: scores[3],
        }
      );
      console.log("Scores saved:", response.data);
      alert("점수가 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("점수 저장 실패:", error);
      alert("점수 저장에 실패했습니다.");
    }
  };

  const parsedContent = content ? parseContent(content) : [];
  const questionPages = question ? question.split(/(?=\d\.\s)/g) : [];

  return (
    <EvaluationContainer>
      <EvaluationChoose>
        <EvaluationChooseButton
          id="record"
          selected={selectedEvaluation === "record"}
          onClick={() => handleEvaluationClick("record")}
        >
          평가 항목 요약
        </EvaluationChooseButton>
        <EvaluationChooseButton
          id="interview"
          selected={selectedEvaluation === "interview"}
          onClick={() => handleEvaluationClick("interview")}
        >
          면접 질문 추천
        </EvaluationChooseButton>
        <div
          ref={underlineRef}
          style={{
            position: "absolute",
            bottom: 0,
            height: "3px",
            backgroundColor: "rgb(66, 84, 166)",
            transition: "left 0.3s ease, width 0.3s ease",
          }}
        />
      </EvaluationChoose>

      {selectedEvaluation === "record" && parsedContent.length > 0 && (
        <EvaluationCategoryTitle
          style={{ alignSelf: "center", margin: "1rem 0" }}
        >
          {`${summaryIndex + 1}. ${parsedContent[summaryIndex].title}`}
        </EvaluationCategoryTitle>
      )}

      <EvaluationSummary isInterview={selectedEvaluation === "interview"}>
        {selectedEvaluation === "record" && (
          <EvaluationSummaryButton
            onClick={handleSubSectionPrevious}
            disabled={subSectionIndex === 0}
          >
            &lt;
          </EvaluationSummaryButton>
        )}
        <EvaluationSummaryTextBox>
          <EvaluationSummaryAndQuestionText
            isInterview={selectedEvaluation === "interview"}
          >
            {selectedEvaluation === "record" ? (
              parsedContent.length > 0 ? (
                (() => {
                  const mainSection = parsedContent[summaryIndex];
                  const currentSection = mainSection.sections[subSectionIndex];
                  return (
                    <div
                      style={{
                        padding: "1rem",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "2rem",
                          fontWeight: "bold",
                          marginBottom: "2rem",
                        }}
                      >
                        {currentSection.title}
                      </h3>
                      {currentSection.paragraphs.map((paragraph, index) => (
                        <StyledParagraph key={index}>
                          {paragraph}
                        </StyledParagraph>
                      ))}
                    </div>
                  );
                })()
              ) : (
                <p>지원자를 클릭해주세요</p>
              )
            ) : (
              questionPages.map((question, index) =>
                question
                  .split("\n")
                  .map((line, lineIndex) => (
                    <StudentRecordQuestionTextItem
                      key={`${index}-${lineIndex}`}
                    >
                      {line.trim()}
                    </StudentRecordQuestionTextItem>
                  ))
              )
            )}
          </EvaluationSummaryAndQuestionText>
        </EvaluationSummaryTextBox>
        {selectedEvaluation === "record" && (
          <EvaluationSummaryButton
            onClick={handleSubSectionNext}
            disabled={
              !parsedContent[summaryIndex] ||
              subSectionIndex ===
                parsedContent[summaryIndex].sections.length - 1
            }
          >
            &gt;
          </EvaluationSummaryButton>
        )}
      </EvaluationSummary>
      {selectedEvaluation === "record" && (
        <EvaluationSummaryBottomBox>
          <EvaluationSummaryButton
            onClick={handleSummaryPrevious}
            disabled={summaryIndex === 0}
          >
            &lt;
          </EvaluationSummaryButton>
          <EvaluationSummaryPageSet>
            {parsedContent.map((_, index) => (
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
          </EvaluationSummaryPageSet>
          <EvaluationSummaryButton
            onClick={handleSummaryNext}
            disabled={summaryIndex === parsedContent.length - 1}
          >
            &gt;
          </EvaluationSummaryButton>
        </EvaluationSummaryBottomBox>
      )}
      <EvaluationChoose1>
        <EvaluationChooseFrontSet>
          <EvaluationChooseButton
            id="evaluation"
            selected={selectedEvaluation2 === "evaluation"}
            onClick={() => handleEvaluationClick2("evaluation")}
          >
            점수 평가
          </EvaluationChooseButton>
          <EvaluationChooseButton
            id="memo"
            selected={selectedEvaluation2 === "memo"}
            onClick={() => handleEvaluationClick2("memo")}
          >
            면접 질문 작성
          </EvaluationChooseButton>
        </EvaluationChooseFrontSet>
        <div
          ref={underlineRef2}
          style={{
            position: "absolute",
            bottom: 0,
            height: "3px",
            backgroundColor: "rgb(66, 84, 166)",
            transition: "left 0.3s ease, width 0.3s ease",
          }}
        />
        {selectedEvaluation2 === "evaluation" && (
          <SaveScoreButton onClick={handleSaveScores}>
            점수 저장
          </SaveScoreButton>
        )}
      </EvaluationChoose1>
      <StudentScoreEvaluation>
        <StudentRecordScoreText>
          {selectedEvaluation2 === "evaluation" ? (
            <StudentRecordScoreBox>
              <StudentRecordScoreButton
                onClick={handleCategoryPrevious}
                disabled={categoryIndex === 0}
              >
                &lt;
              </StudentRecordScoreButton>
              <StudentRecordScoreTextSet>
                <Slider>
                  {evaluationCategories.map((_, index) => (
                    <Slide
                      key={index}
                      active={categoryIndex === index}
                      onClick={() => setCategoryIndex(index)}
                    />
                  ))}
                </Slider>
                <StudentRecordScorePageItemTitle>
                  {evaluationCategories[categoryIndex].title}
                </StudentRecordScorePageItemTitle>
                <StudentRecordScorePageItemTextSet>
                  {evaluationCategories[categoryIndex].items.map(
                    (item, index) => (
                      <StudentRecordScorePageItemText key={index}>
                        {item}
                      </StudentRecordScorePageItemText>
                    )
                  )}
                </StudentRecordScorePageItemTextSet>
                <CheckboxContainer>
                  <CheckboxContainerBox>
                    {[0, 1, 2, 3, 4, 5].map((score) => (
                      <CheckboxLabel key={score}>
                        <CheckboxInput
                          type="radio"
                          name={`category${categoryIndex}`}
                          checked={scores[categoryIndex] === score}
                          onChange={() => handleScoreChange(score)}
                        />
                        {score}
                      </CheckboxLabel>
                    ))}
                  </CheckboxContainerBox>
                </CheckboxContainer>
              </StudentRecordScoreTextSet>
              <StudentRecordScoreButton
                onClick={handleCategoryNext}
                disabled={categoryIndex === evaluationCategories.length - 1}
              >
                &gt;
              </StudentRecordScoreButton>
            </StudentRecordScoreBox>
          ) : (
            <>
              <StudentRecordQuestionTextSet>
                <StudentRecordQuestionMemo
                  value={currentMemo}
                  onChange={(e) => setCurrentMemo(e.target.value)}
                />
                <SaveButton
                  changed={currentMemo !== savedMemo}
                  onClick={handleSaveMemo}
                >
                  메모 저장
                </SaveButton>
              </StudentRecordQuestionTextSet>
            </>
          )}
        </StudentRecordScoreText>
      </StudentScoreEvaluation>
    </EvaluationContainer>
  );
}

export default StudentRecordEvaluation;
