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


function DocumentTable() {
    const [data, setDate] = useState([]);
    const loadData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/applicants/');
        console.log(response.data.results);
        setDate(response.data.results);
    }
    useEffect(() => {
        loadData();
    }, []);

    return (
        <Table>
            <thead>
                <TableRow>
                    <TableHeader width={90}>수험번호</TableHeader>
                    <TableHeader width={90}>이름</TableHeader>
                    <TableHeader width={150}>학과</TableHeader>
                    <TableHeader width={120}>전화번호</TableHeader>
                    <TableHeader width={130}>학생생활기록부</TableHeader>
                    <TableHeader width={130}>검정고시합격증명서</TableHeader>
                    <TableHeader width={130}>생활기록부대체양식</TableHeader>
                    <TableHeader width={130}>기초생활수급자증명서</TableHeader>
                    <TableHeader width={130}>주민등록본</TableHeader>
                    <TableHeader width={130}>국민체력100인증서</TableHeader>
                    <TableHeader width={130}>체력평가</TableHeader>
                    <TableHeader width={130}>논술</TableHeader>
                </TableRow>
            </thead>
            <tbody>
                {data.map((item) => (
                    <TableRow key={item.student_id}>
                        <TableData width={90}>{item.student_id}</TableData>
                        <TableData width={90}>{item.name}</TableData>
                        <TableData width={150}>{item.department}</TableData>
                        <TableData width={120}>{item.phone}</TableData>
                        {Object.values(item.documents).map((status) => (
                            <TableData width={130}>{status}</TableData>
                        ))}
                    </TableRow>
                ))}
            </tbody>
        </Table>
    );
}

export default DocumentTable;
