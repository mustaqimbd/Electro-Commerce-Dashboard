import Navbar from "@/components/navbar/Navbar";
import { Sidebar } from "@/components/sidebar/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Navbar></Navbar>
      <div className="flex justify-start ">
        <div className="border-2   min-w-44 border-gray-200 border-y-0">
          <Sidebar></Sidebar>
        </div>
        <div className="w-full bg-[#fffbfb] p-2">{children}</div>
      </div>
    </section>
  );
};

export default layout;
