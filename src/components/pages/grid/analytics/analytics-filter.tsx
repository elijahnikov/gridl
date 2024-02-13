import { Label } from "@/lib/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";

export default function AnalyticsViewFilter({
  rangeValue,
  setRangeValue,
  chartType,
  setChartType,
}: {
  rangeValue: string;
  setRangeValue: React.Dispatch<React.SetStateAction<string>>;
  chartType: string;
  setChartType: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex w-full flex-wrap space-x-4">
      <div className="flex-end">
        <Label className="text-xs">Date Range</Label>
        <Select
          value={rangeValue}
          onValueChange={setRangeValue}
          defaultValue="30 days"
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24 hours">24 hours</SelectItem>
            <SelectItem value="7 days">7 days</SelectItem>
            <SelectItem value="30 days">30 days</SelectItem>
            <SelectItem value="1 year">1 year</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-end">
        <Label className="text-xs">Chart Type</Label>
        <Select
          value={chartType}
          onValueChange={setChartType}
          defaultValue="bar"
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="line">Line</SelectItem>
            <SelectItem value="bar">Bar</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
