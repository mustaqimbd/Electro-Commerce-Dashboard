import Navbar from "@/components/navbar/Navbar";
import { Sidebar } from "@/components/sidebar/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Navbar></Navbar>
      <div className="flex">
        <Sidebar></Sidebar>
        <div className="w-full h-[calc(100vh-63px)] overflow-y-auto bg-gray-50">
          {children}
        </div>
      </div>
    </section>
  );
};

export default layout;
