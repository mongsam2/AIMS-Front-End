import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 250px;
    height: 400px;
    border: 1px solid #3C50AA;
    border-radius: 10px;
    text-decoration: none;
    color: inherit;
`;

const Icon = styled.img`
    width: 170px;
    height: 170px;
    padding: 50px 0px;
`;

const Title = styled.h2`
    color: #464F60;
    font-size: 20px;
    font-weight: bold;
`;

const MenuButton = ({ title, icon }) => {
    return (
        <Container>
            <Icon src={icon} />
            <Title>{title}</Title>
        </Container>
    );
};

export default MenuButton;