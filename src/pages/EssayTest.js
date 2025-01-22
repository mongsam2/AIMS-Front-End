import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import EssayTable from "../components/EssayTable";
import { Container, Content } from "../components/Layout";

const StudentRecord = () => {
    return (
        <Container>
            <Sidebar />
            <Content>
                <Header title={"논술"} />
                <EssayTable />
            </Content>
        </Container>
    );
}

export default StudentRecord;