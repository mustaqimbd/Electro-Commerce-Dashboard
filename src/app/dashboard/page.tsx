import { getProfile } from "@/lib/getAccessToken";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Oneself",
};

const Dashboard = async () => {
  const user = await getProfile();
  return (
    <div className="flex justify-center items-center h-full">
      <h2 className="text-center font-bold text-2xl">
        Welcome, {user.fullName}
      </h2>
    </div>
  );
};

export default Dashboard;
