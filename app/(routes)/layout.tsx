import Sidebar from "@/components/headersAndFooters/mainSideBar";
import SubNav from "@/components/headersAndFooters/mainSubNav";
import Navbar from "@/components/headersAndFooters/navbar";
import { serverAuth } from "@/lib/serverAuth";
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
    let { currentUser } = await serverAuth();

    return (
        <>
            <Navbar currentUser={currentUser as any} SubNav={SubNav} />
            <div className="fixed md:hidden left-16 top-2 z-30"> <Sidebar/></div>
            <div >{children}</div>
        </>
    );
};

export default Layout;
