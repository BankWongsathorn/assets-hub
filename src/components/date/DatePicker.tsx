import DatePick from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../ui/button";

interface DatePickerType {
  value: string;
  change: (date: any) => void;
  props?: any;
}

export default function DatePicker({ value, change, props }: DatePickerType) {
  const startDate = value ? new Date(value) : null;
  return (
    <Button variant={"outline"} asChild>
      <DatePick
        disabled={props?.disabled}
        placeholderText="Select a date"
        selected={startDate}
        onChange={(date) => {
          change(date?.toString());
        }}
        dateFormat="dd/MM/yyyy"
      />
    </Button>
  );
}
