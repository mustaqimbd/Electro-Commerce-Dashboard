// import BestSellingProducts from "./components/BestSellingProducts";
import PageTitle from "@/components/pageTitle/PageTitle";
import OrdersCount from "./components/ordersCounts/OrdersCount";
import SalesByPlatform from "./components/SalesByPlatform/SalesByPlatform";
import Stats from "./components/stats/Stats";

const Reports = () => {
  return (
    <>
      <div className="p-5 flex flex-col gap-5">
        <PageTitle title="Reports" />
        <Stats />
        <div className="grid grid-cols-3 gap-5">
          <OrdersCount />
          <SalesByPlatform />
        </div>
      </div>
    </>
  );
};

export default Reports;
