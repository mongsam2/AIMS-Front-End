import React, { useRef } from "react";
import refreshicon from "../assets/update_icon.png";
import helpicon from "../assets/help_icon.png";

import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: #F7F9FC;
    box-sizing: border-box;
`;
const Title = styled.h1`
    font-size: 30px;
    font-weight: bold;
    padding: 0px 30px;
`;
const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    height: 90px;
    padding: 0px 30px;
`;
const Icon = styled.img`
    width: 18px;
    height: 18px;
    src: ${props => props.src};
`;
const Text = styled.span`
    font-size: 13px;
    font-weight: bold;
    color: #868FA0;
`; 

function Header({title}) {
    return (
        <Container>
            <Title>{title}</Title>
            <IconContainer>
                <Icon src={refreshicon} />
                <Icon src={helpicon} />
                <Text>나교육님</Text>
                <Text>로그아웃</Text>
            </IconContainer>
        </Container>
    );
}

export default Header;