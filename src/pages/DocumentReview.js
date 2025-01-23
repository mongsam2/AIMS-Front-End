import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DocumentReview.css";

import refreshicon from "../assets/update_icon.png";
import helpicon from "../assets/help_icon.png";
import searchicon from "../assets/search_icon.png";
import axios from "axios";

import { Container, MainContent } from "../components/common/Layout";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import MiddleContent from "../components/document-review/MiddleContent";
import UnsuitableChoice from "../components/document-review/UnsuitableChoice";
import DocumentReviewTable from "../components/document-review/DocumentReviewTable";
import BottomBar from "../components/document-review/BottomBar";

function DocumentReview() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  const handleExamineButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;
    const updatedTableData = [...tableData];
    updatedTableData[index].isChecked = isChecked;
    setTableData(updatedTableData);
  };

  // API로부터 데이터를 로드하는 함수
  const loadData = async () => {
    try {
      const response = await axios.get("http://3.37.240.199/api/applicants/");
      const results = response.data.results.map((item) => ({
        id: item.student_id,
        name: item.name,
        department: item.department,
        phone: item.phone,
        record: "생활기록부",
        exam: "검토",
        foreignSchool: "검토",
        basicLiving: "검토",
        lowIncome: "검토",
        rural: "검토",
        isChecked: false,
      }));
      setTableData(results);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터를 로드
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header title="입학 서류 검토" />
        <MiddleContent />
        <UnsuitableChoice />
        <div className="table-container" style={{ overflowX: "auto" }}>
          <div className="review-table">
            <div className="table-header">
              <div className="table-cell-checkbox">
                <input type="checkbox" className="table-checkbox" />
              </div>
              <div className="table-cell-id">수험번호</div>
              <div className="table-cell-name">이름</div>
              <div className="table-cell-department">학과</div>
              <div className="table-cell-phone">전화번호</div>
              <div className="table-cell-record">학생생활기록부</div>
              <div className="table-cell-exam">검정고시</div>
              <div className="table-cell-foreignSchool">국외고등학교</div>
              <div className="table-cell-basicLiving">기초생활수급자</div>
              <div className="table-cell-lowIncome">차상위 계층</div>
              <div className="table-cell-rural">농어촌확인서</div>
            </div>
            <div className="table-body">
              {tableData.map((row, index) => (
                <div
                  className={`table-row ${row.isChecked ? "checked" : ""}`}
                  key={index}
                >
                  <div className="table-cell-checkbox">
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={row.isChecked}
                      onChange={(event) => handleCheckboxChange(event, index)}
                    />
                  </div>
                  <div className="table-cell-id">{row.id}</div>
                  <div className="table-cell-name">{row.name}</div>
                  <div className="table-cell-department">{row.department}</div>
                  <div className="table-cell-phone">{row.phone}</div>
                  <div className="table-cell-record">
                    <button className="table-button-submit">
                      {row.record}
                    </button>
                  </div>
                  <div className="table-cell-exam">
                    <button className="table-button-nosubmit">
                      {row.exam}
                    </button>
                  </div>
                  <div className="table-cell-foreignSchool">
                    <button
                      className="table-button-examine"
                      onClick={handleExamineButtonClick}
                    >
                      {row.foreignSchool}
                    </button>
                  </div>
                  <div className="table-cell-basicLiving">
                    <button
                      className="table-button-examine"
                      onClick={handleExamineButtonClick}
                    >
                      {row.basicLiving}
                    </button>
                  </div>
                  <div className="table-cell-lowIncome">
                    <button
                      className="table-button-examine"
                      onClick={handleExamineButtonClick}
                    >
                      {row.lowIncome}
                    </button>
                  </div>
                  <div className="table-cell-rural">
                    <button className="table-button-blank">{row.rural}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomBar />
      </MainContent>

      {/* 팝업창 */}
      {isPopupOpen && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-content-top">
              <div className="popup-content-top-submit">
                <div className="popup-content-top-submit-button">제출</div>
                <div className="popup-content-top-submit-button">재체출 1</div>
                <div className="popup-content-top-submit-button">재체출 2</div>
              </div>
              <div className="popup-content-top-right">
                <div className="popup-content-top-date">
                  <div className="popup-content-top-date-text">제출 날짜:</div>
                  <div className="popup-content-top-date-value">2025/01/01</div>
                </div>
                <button
                  className="popup-close-button"
                  onClick={handleClosePopup}
                >
                  X
                </button>
              </div>
            </div>
            <div className="popup-inner-content">
              <div className="popup-inner-content-set">
                <div className="popup-inner-content-pdf">PDF</div>
                <div className="popup-inner-content-info">
                  <div className="popup-inner-content-selection">전형</div>
                  <div className="popup-inner-content-id">
                    수험번호 : 31293423
                  </div>
                  <div className="popup-inner-content-name">이름 : 차은우</div>
                  <div className="popup-inner-content-department">
                    학과 : 인공지능데이터사이언스학과
                  </div>
                  <div className="popup-inner-content-document">
                    서류 : 학생생활기록부
                  </div>
                  <div className="popup-inner-content-reason">
                    <div className="popup-inner-content-reason-1">
                      <div className="popup-inner-content-reason-1-content">
                        1. 날짜 기준 미준수
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default DocumentReview;
