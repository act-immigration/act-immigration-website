import DashboardLayout from "./DashBoardLayout";

const DashboardView = () => {
  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="flex items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome to your Dashboard
        </h1>
      </div>
    </DashboardLayout>
  );
};

export default DashboardView;
