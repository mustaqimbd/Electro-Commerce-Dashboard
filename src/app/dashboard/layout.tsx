import Navbar from "@/components/navbar/Navbar";
import { Sidebar } from "@/components/sidebar/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Navbar></Navbar>
      <div className="grid grid-cols-6">
        <div className="col-span-1 border-2 border-gray-200 border-y-0">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-5 bg-[#fffbfb] p-2">{children}</div>
      </div>
    </section>
  );
};

export default layout;
