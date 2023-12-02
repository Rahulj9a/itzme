import Navbar from "@/components/headersAndFooters/navbar";
import { serverAuth } from "@/lib/serverAuth";
import React from "react";
import SideBar from "./components/sideBar";
import MobileSidebar from "./components/sideBarMobile";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  let { currentUser } = await serverAuth();

  if (!currentUser) {
    redirect("/")
  }
  return (
    <div className="pt-14">
      {/*  <Navbar currentUser={currentUser as any}/> */}
      <div className="hidden h-full md:flex md:w-56 md:flex-col md:fixed md:inset-y- z-[80] bg-gray-900">
        <SideBar />
      </div>
      <div className="flex gap-2 fixed left-3 md:static md:pl-56 top-14 items-center py-2 z-30 bg-white w-full"> <MobileSidebar/> <h1 className="font-bold text-3xl ">Settings</h1></div>
          
      <main className="md:pl-56 pt-10 md:pt-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;
