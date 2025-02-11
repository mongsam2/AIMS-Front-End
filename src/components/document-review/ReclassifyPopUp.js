import React, { useState, useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import xicon from "../../assets/X.png";
import arrow_down from "../../assets/arrow_down.png";
import axios from "axios";

const slideDown = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  width: 70%;
  height: 93%;
  background-color: white;
  border-radius: 5px 5px 0 0;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PopupContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 97%;
  height: 7%;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
`;

const PopupContentTopLeft = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 49%;
  height: 100%;
`;

const PopupContentTopLeftText = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 600;
  width: auto;
  height: 100%;
  border-bottom: 3px solid #3c50aa;
`;

const PopupContentTopRight = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 49%;
  height: 100%;
  gap: 2%;
`;

const PopupContentTopRightX = styled.img`
  width: 2.2rem;
  height: auto;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const PopupInnerContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 96%;
  background-color: none;
`;

const PopupInnerContentSet = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 97%;
  height: 95%;
`;

const VisualizeDocumentPDFBox = styled.div`
  width: 57.5%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.18);
`;

const VisualizeDocumentPDF = styled.iframe`
  width: 98%;
  height: 98%;
`;

const PopupInnerContentUserInfoSet = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: column;

  background-color: white;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
`;

const ApplySet = styled.div`
  width: 100%;
  height: 100%;
  background-color: none;
  border: none;
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: column;
`;

const ApplyList = styled.div`
  width: 90%;
  display: flex;
  justify-content: left;
  align-items: center;
  height: 9%;
  border: none;
  font-size: 2rem;
  font-weight: 600;
  background-color: none;
  border-bottom: 3px solid rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;
`;

const ApplyListTitle = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: auto;
  height: 100%;
  background-color: none;
  border-bottom: 3px solid rgb(66, 84, 166);
  font-size: 2.3rem;
`;

const ApplyListTable = styled.div`
  width: 90%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 500;
  overflow-x: auto;
`;

const ApplyListTableHeader = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 550;
  color: rgba(0, 0, 0, 0.8);
  border-top: 3px solid rgba(50, 98, 255, 0.2);
  border-bottom: 3px solid rgba(50, 98, 255, 0.2);
`;

const ApplyListTableHeaderSet = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 95%;
  height: 100%;
`;

const ApplyListTableHeaderText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;
  &.index {
    width: 8%;
  }
  &.id {
    width: 27%;
  }
  &.documentType {
    width: 39%;
  }
  &.state {
    width: 14%;
  }
  &.save {
    width: 12%;
  }
`;

const ApplyListTableRowSet = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  overflow-y: auto;
  max-height: 100rem;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: rgba(237, 242, 250, 0.8);
`;

const ApplyListTableRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  margin-top: 0.6rem;
  height: 5rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.selected ? "rgb(179, 209, 255)" : "white"};
  border-radius: 0.2rem;

  transition: background-color 0.3s ease, font-size 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.selected ? "rgba(185, 223, 255, 1)" : "#c5c8fd40"};
    font-weight: bold;
    font-size: 2rem;
  }
`;

const ApplyListTableRowText = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ApplyListTableRowTextItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  font-size: 1.4rem;
  font-weight: 500;
  &.index {
    width: 8%;
  }
  &.id {
    width: 27%;
  }
  &.documentType {
    width: 39%;
  }
  &.state {
    width: 14%;
  }
  &.save {
    width: 12%;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  font-size: 1.6rem;
  font-weight: 550;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: none;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding: 10px;
  border: none;
  border-radius: 10px 10px 0 0;
  background-color: ${({ isOpen }) => (isOpen ? "white" : "transparent")};
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #c5c8fd40;
  }
  position: relative;
`;

const DropdownHeaderText = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const DropdownArrowImg = styled.img`
  width: 1.3rem;
  height: auto;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(-180deg)" : "rotate(0deg)")};
`;

const DropdownList = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  position: absolute;
  flex-direction: column;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  border: none;
  background-color: white;
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
  font-size: 1.2rem;
  font-weight: 550;
  overflow-x: hidden;
  animation: ${slideDown} 0.25s ease-out;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
`;

const DropdownItem = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: left;
  background-color: none;
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #c5c8fd40;
  }
`;

const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: none;
  border: 0px solid rgba(0, 0, 0, 0.1);
  font-size: 1.8rem;
  font-weight: 500;
  width: 40%;
  height: 100%;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: rgb(255, 255, 255);
  }
`;

function Dropdown({
  options,
  selected,
  onSelect,
  placeholder,
  renderValue,
  renderItem,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownHeader
        isOpen={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <DropdownHeaderText>
          {selected
            ? renderValue
              ? renderValue(selected)
              : selected
            : placeholder}
        </DropdownHeaderText>
        <DropdownArrowImg src={arrow_down} alt="arrow_down" isOpen={isOpen} />
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map((option, index) => (
            <DropdownItem
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {renderItem ? renderItem(option) : option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

function ReclassifyPopUp({ onClose }) {
  const [fileUrl, setFileUrl] = useState("");
  const [documents, setDocuments] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  const [documentTypeOptions, setDocumentTypeOptions] = useState([]);  
  const [rowSelections, setRowSelections] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const stateOptions = ["검토", "제출"];

  useEffect(() => {
    axios
      .get("http://3.37.240.199/api/students/unsuit")
      .then((response) => {
        const docs = response.data
          .filter(
            (item) => item.student === "20250000" && item.state === "검토"
          )
          .map((item) => ({
            document_type: item.document_type,
            id: item.id,
            file: item.file,
            state: item.state,
            student: item.student,
          }));
        setDocuments(docs);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://3.37.240.199/api/students/")
      .then((response) => {
        const students = response.data;
        const ids = students
          .map((student) => student.id)
          .sort((a, b) => Number(a) - Number(b));
        setStudentOptions(ids);
      })
      .catch((error) => {
        console.error("Error fetching student dropdown data: ", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://3.37.240.199/api/document-types/")
      .then((response) => {
        setDocumentTypeOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching document types:", error);
      });
  }, []);

  useEffect(() => {
    if (documents.length > 0 && selectedRowIndex === null) {
      setFileUrl(documents[0].file);
      setSelectedRowIndex(0);
    }
  }, [documents, selectedRowIndex]);

  const handleSave = (index, doc) => {
    const selectedId = rowSelections[index]?.studentId;
    const selectedDocType = rowSelections[index]?.documentType;
    const selectedState = rowSelections[index]?.state ?? doc.state;

    console.log("selectedDocType:", selectedDocType);

    if (!selectedId) {
      alert("수험번호를 선택해주세요.");
      return;
    }
    if (!selectedDocType) {
      alert("서류 종류를 선택해주세요.");
      return;
    }
    if (!selectedState) {
      alert("상태를 선택해주세요.");
      return;
    }
    const url = `http://3.37.240.199/api/documents/${doc.id}/`;
    axios
      .patch(url, {
        student: selectedId,
        state: selectedState,
        document_type: selectedDocType.id, 
      })
      .then((response) => {
        setDocuments((prevDocuments) =>
          prevDocuments.map((item, i) =>
            i === index ? { ...item, state: selectedState } : item
          )
        );
        alert("저장되었습니다.");
      })
      .catch((error) => {
        console.error("Error updating document:", error);
        alert("문서 저장에 실패하였습니다.");
      });
  };

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <PopupContentTop>
          <PopupContentTopLeft>
            <PopupContentTopLeftText>분류 실패 서류</PopupContentTopLeftText>
          </PopupContentTopLeft>
          <PopupContentTopRight>
            <PopupContentTopRightX src={xicon} alt="X" onClick={onClose} />
          </PopupContentTopRight>
        </PopupContentTop>
        <PopupInnerContent>
          <PopupInnerContentSet>
            <VisualizeDocumentPDFBox>
              <VisualizeDocumentPDF
                title="PDF Viewer"
                src={fileUrl ? `${fileUrl}#toolbar=0&zoom=130` : "about:blank"}
                width="100%"
                height="100%"
              >
                이 브라우저는 PDF 파일을 지원하지 않습니다.
                <a href={fileUrl}>여기에서 PDF를 다운로드하세요.</a>
              </VisualizeDocumentPDF>
            </VisualizeDocumentPDFBox>
            <PopupInnerContentUserInfoSet>
              <ApplySet>
                <ApplyList>
                  <ApplyListTitle>서류 목록</ApplyListTitle>
                </ApplyList>
                <ApplyListTable>
                  <ApplyListTableHeader>
                    <ApplyListTableHeaderSet>
                      <ApplyListTableHeaderText className="index">
                        #
                      </ApplyListTableHeaderText>
                      <ApplyListTableHeaderText className="id">
                        수험번호
                      </ApplyListTableHeaderText>
                      <ApplyListTableHeaderText className="documentType">
                        서류 종류
                      </ApplyListTableHeaderText>
                      <ApplyListTableHeaderText className="state">
                        상태
                      </ApplyListTableHeaderText>
                      <ApplyListTableHeaderText className="save">
                        저장
                      </ApplyListTableHeaderText>
                    </ApplyListTableHeaderSet>
                  </ApplyListTableHeader>
                  <ApplyListTableRowSet>
                    {documents.map((doc, index) => (
                      <ApplyListTableRow
                        key={index}
                        onClick={() => {
                          setFileUrl(doc.file);
                          setSelectedRowIndex(index);
                        }}
                        selected={selectedRowIndex === index}
                      >
                        <ApplyListTableRowText>
                          <ApplyListTableRowTextItem className="index">
                            {index + 1}
                          </ApplyListTableRowTextItem>
                          <ApplyListTableRowTextItem className="id">
                            <Dropdown
                              options={studentOptions}
                              selected={rowSelections[index]?.studentId || ""}
                              onSelect={(value) =>
                                setRowSelections((prev) => ({
                                  ...prev,
                                  [index]: {
                                    ...(prev[index] || {}),
                                    studentId: value,
                                  },
                                }))
                              }
                              placeholder="수험번호 선택"
                            />
                          </ApplyListTableRowTextItem>
                          <ApplyListTableRowTextItem className="documentType">
                            <Dropdown
                              options={documentTypeOptions}
                              selected={
                                rowSelections[index]?.documentType || ""
                              }
                              onSelect={(value) =>
                                setRowSelections((prev) => ({
                                  ...prev,
                                  [index]: {
                                    ...(prev[index] || {}),
                                    documentType: value,
                                  },
                                }))
                              }
                              placeholder="서류 종류 선택"
                              renderValue={(option) => option.name}
                              renderItem={(option) => option.name}
                            />
                          </ApplyListTableRowTextItem>
                          <ApplyListTableRowTextItem className="state">
                            <Dropdown
                              options={stateOptions}
                              selected={
                                rowSelections[index]?.state ?? doc.state
                              }
                              onSelect={(value) =>
                                setRowSelections((prev) => ({
                                  ...prev,
                                  [index]: {
                                    ...(prev[index] || {}),
                                    state: value,
                                  },
                                }))
                              }
                              placeholder="상태 선택"
                            />
                          </ApplyListTableRowTextItem>
                          <ApplyListTableRowTextItem className="save">
                            {doc.state === "제출" ? (
                              "저장"
                            ) : (
                              <SaveButton
                                onClick={() => handleSave(index, doc)}
                              >
                                ✓
                              </SaveButton>
                            )}
                          </ApplyListTableRowTextItem>
                        </ApplyListTableRowText>
                      </ApplyListTableRow>
                    ))}
                  </ApplyListTableRowSet>
                </ApplyListTable>
              </ApplySet>
            </PopupInnerContentUserInfoSet>
          </PopupInnerContentSet>
        </PopupInnerContent>
      </PopupContent>
    </PopupOverlay>
  );
}

export default ReclassifyPopUp;
