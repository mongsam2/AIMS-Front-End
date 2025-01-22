import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DocumentTable from "../components/DocumentTable";
import { Container, Content } from "../components/Layout";

const DocumnetReview = () => {
    return (
        <Container>
            <Sidebar />
            <Content>
                <Header title={"입학서류검토"} />
                <DocumentTable />
            </Content>
        </Container>
    );
}

export default DocumnetReview;