import React from "react";
import styled from "styled-components";

const BottomBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const PageNumber = styled.span`
  width: auto;
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.4rem;
  margin-left: 2%;
`;

const Pagination = styled.span`
  padding: 0 1.1rem;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.5);
`;

const Highlight = styled.span`
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
`;

const BottomBarButtons = styled.div`
  margin-right: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  width: auto;
  height: 100%;
`;

const BottomBarButton = styled.button`
  background-color: white;
  color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s, font-weight 0.3s;
  border-radius: 0.5rem;
  border: none;
  width: 2.1rem;
  height: auto;
  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    font-weight: 700;
  }
`;

function DocumentBottomBar({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  currentItemsRange,
  totalItemsCount,
}) {
  return (
    <BottomBarContainer>
      <PageNumber>
        {currentItemsRange} of {totalItemsCount}
      </PageNumber>
      <BottomBarButtons>
        <BottomBarButton onClick={onPrevPage}>&lt;</BottomBarButton>
        <Pagination>
          <Highlight>{currentPage} </Highlight>/ {totalPages}
        </Pagination>
        <BottomBarButton onClick={onNextPage}>&gt;</BottomBarButton>
      </BottomBarButtons>
    </BottomBarContainer>
  );
}

export default DocumentBottomBar;
