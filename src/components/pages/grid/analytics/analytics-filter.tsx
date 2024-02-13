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
}: {
  rangeValue: string;
  setRangeValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex w-full flex-wrap justify-between">
      <div></div>
      <div className="flex-end">
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
    </div>
  );
}
