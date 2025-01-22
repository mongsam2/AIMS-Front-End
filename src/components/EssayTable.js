import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import axios from 'axios';

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #E9EDF5;
`;

const TableRow = styled.tr`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 10px;
`;

const TableHeader = styled.th`
    display: flex;
    width: ${props => props.width};
    font-size: 12px;
    font-weight: medium;
    background-color: #F7F9FC;
    color: #687182;
`;

const TableData = styled.td`
    display: flex;
    width: ${props => props.width};
    font-size: 14px;
    font-weight: regular;
`;


function EssayTable() {
    const [data, setDate] = useState([]);
    const loadData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/documents/essays/');
        console.log(response.data);
        setDate(response.data);
    }
    useEffect(() => {
        loadData();
    }, []);

    return (
        <Table>
            <thead>
                <TableRow>
                    <TableHeader width={90}>고유번호</TableHeader>
                </TableRow>
            </thead>
            <tbody>
                {data.map((item) => (
                    <TableRow key={item}>
                        <TableData width={90}>{item}</TableData>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    );
}

export default EssayTable;