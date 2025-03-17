import { useEffect, useState } from "react";
import DatePick from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../ui/button";

interface DatePickerType {
  value: string;
  change: (date: any) => void;
  props?: any;
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePicker({
  value,
  change,
  props,
  minDate,
  maxDate,
}: DatePickerType) {
  const [startDate, setStartDate] = useState(value ? new Date(value) : null);

  useEffect(() => {
    setStartDate(value ? new Date(value) : null);
  }, [value]);

  return (
    <Button variant={"outline"} asChild>
      <DatePick
        disabled={props?.disabled}
        placeholderText="Select a date"
        selected={startDate}
        minDate={minDate}
        maxDate={maxDate}
        onChange={(date) => {
          change(date?.toString());
        }}
        dateFormat="dd/MM/yyyy"
        todayButton="Today"
      />
    </Button>
  );
}
