import { ReactNode } from "react";
import DashboardNavBar from "./DashboardNavBar";
import SideBar from "./SideBar";
import Breadcrumb from "./BreadCrumb";

interface DashboardLayoutProps {
  children: ReactNode;
  pageTitle: string;
}
const DashboardLayout = ({ children, pageTitle }: DashboardLayoutProps) => {

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
       <DashboardNavBar />

        <main className="flex-1 mt-20 px-2 sm:px-6 lg:px-8 py-4">
          <div className="max-w-full">
            <Breadcrumb pageName={pageTitle} />
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
