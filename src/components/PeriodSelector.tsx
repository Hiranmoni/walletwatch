"use client";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { addMonths } from "date-fns";
import { useState } from "react";
import moment from "moment";
import { Calendar } from "./ui/calendar";

interface Props {
  selectedPeriod: (val: Date) => void;
}

const PeriodSelector = ({ selectedPeriod }: Props) => {
  const today = new Date();
  const nextMonths = addMonths(today, 0);
  const [month, setMonth] = useState<Date | undefined>(nextMonths);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <CalendarIcon />
          {moment(month).format("MMM yyyy")}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          month={month}
          onMonthChange={(val) => {
            selectedPeriod(val);
            setMonth(val);
          }}
          className="flex flex-1 justify-center"
        />
      </PopoverContent>
    </Popover>
  );
};

export default PeriodSelector;
