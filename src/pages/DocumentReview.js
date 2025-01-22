import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DocumentTable from "../components/DocumentTable";
import DocumentModal from "../components/DocumentModal";
import { Container, Content } from "../components/Layout";

import { useEffect, useState } from "react";

const DocumnetReview = () => {
    const [isOpen, setIsOpen] = useState(false);



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