import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import RecordTable from "../components/RecordTable";
import { Container, Content } from "../components/Layout";

const StudentRecord = () => {
    return (
        <Container>
            <Sidebar />
            <Content>
                <Header title={"생활기록부"} />
                <RecordTable />
            </Content>
        </Container>
    );
}

export default StudentRecord;