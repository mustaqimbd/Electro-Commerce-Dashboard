import { TypographyH4 } from "@/components/ui/Typography";
import { Card } from "@/components/ui/card";
import { TStats } from "@/redux/features/reports/reportsInterface";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

const StatsCard = ({ stat }: { stat: TStats }) => {
  return (
    <Card className="p-4 shadow-none rounded-xl w-80">
      <div className="space-y-1">
        <TypographyH4 className="!text-gray-500 !text-lg font-semibold">
          {stat.title}
        </TypographyH4>
        <TypographyH4
          className={`text-gray-900 !font-bold !text-3xl ${montserrat.className}`}
        >
          {stat.count}
        </TypographyH4>
        <TypographyH4
          className={`font-semibold !text-gray-500 ${montserrat.className}`}
        >
          {stat.description}
        </TypographyH4>
      </div>
    </Card>
  );
};
export default StatsCard;
