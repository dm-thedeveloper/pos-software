import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface DateRangeFilterProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export function DateRangeFilter({
  selectedRange,
  onRangeChange,
}: DateRangeFilterProps) {
  const ranges = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "week", label: "Last 7 Days" },
    { value: "month", label: "Last 30 Days" },
    { value: "quarter", label: "Last 3 Months" },
    { value: "year", label: "Last Year" },
  ];

  const currentLabel =
    ranges.find((r) => r.value === selectedRange)?.label || "Last 30 Days";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          {currentLabel}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {ranges.map((range) => (
          <DropdownMenuItem
            key={range.value}
            onClick={() => onRangeChange(range.value)}
            className={
              selectedRange === range.value ? "bg-blue-50 text-blue-700" : ""
            }
          >
            {range.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
