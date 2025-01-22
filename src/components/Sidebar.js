import React from "react";
import {Link} from "react-router-dom";
import logo from "../assets/aims_logo.png";
import icon from "../assets/file.png";

import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #112059;
    width: 110px;
    height: 100%;
`;

const Logo = styled.img.attrs({"src": logo})`
    width: 80px;
    height: 80px;
    padding: 10px 0px;
`;

const Icon = styled.img`
    width: 40px;
    height: 40px;
    margin-top: 45px;
    src: ${props => props.src};
`;

function Sidebar() {
    return (
        <Container>
            <Link to='/main'>
                <Logo />
            </Link>
            <Link to='/document-review'>
                <Icon src={icon} />
            </Link>
            <Link to='/student-record'>
                <Icon src={icon} />
            </Link>
            <Link to='/essay-test'>
                <Icon src={icon} />
            </Link>
        </Container>
    );
};

export default Sidebar;