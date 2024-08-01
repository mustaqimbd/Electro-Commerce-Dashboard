import { Button } from "@/components/ui/button";
import BestSellingProducts from "./components/BestSellingProducts";
import StatisticsCard from "./components/StatisticsCard";

const Reports = () => {
  return (
    <div>
      <div className="space-y-5 w-full px-2">
        <div className="grid grid-cols-4 gap-3">
          <StatisticsCard />
          <StatisticsCard />
          <StatisticsCard />
          <StatisticsCard />
        </div>
        <div className="flex justify-start gap-3">
          <div className="w-2/3 "></div>
          <div className="w-1/3">
            <BestSellingProducts />
            <div>
              <Button>Click me</Button>
            </div>
          </div>
        </div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde,
          placeat ratione! Alias accusamus deleniti facere, provident sequi
          possimus obcaecati corrupti impedit quas iusto, voluptatum quam
          suscipit dolorem? Adipisci, officiis impedit.
        </p>
      </div>
    </div>
  );
};

export default Reports;
