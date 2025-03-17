"use client";
import ComboBox from "../combobox/ComboBox";
import DatePicker from "../date/DatePicker";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function MyField({
  form,
  name,
  placeholder,
  type,
  options,
}: {
  form: any;
  name: string;
  placeholder?: string;
  type?: string;
  options?: any;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{placeholder}</FormLabel>
          <FormControl>
            {type === "text" ? (
              <Input {...field} placeholder={placeholder} />
            ) : type === "select" ? (
              <ComboBox
                label={placeholder}
                value={field.value}
                onChange={(text: string) => field.onChange(text)}
                options={options}
              />
            ) : type === "date" ? (
              <div>
                <DatePicker
                  value={field.value}
                  change={(date: Date) => field.onChange(date)}
                  minDate={options?.minDate || null}
                  maxDate={options?.maxDate || null}
                />
              </div>
            ) : type === "checkbox" ? (
              <div className="flex items-center gap-4 py-2">
                <Checkbox
                  checked={field.value?.includes(options.value)} // ตรวจสอบว่าค่าปัจจุบันอยู่ใน Array หรือไม่
                  onCheckedChange={(checked) => {
                    const value = field.value || [];
                    if (checked) {
                      field.onChange([...value, options.value]); // เพิ่มค่าเข้าไปใน Array
                    } else {
                      field.onChange(
                        value.filter((v: string) => v !== options.value)
                      ); // ลบค่าออกจาก Array
                    }
                  }}
                />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {options.label}
                </label>
              </div>
            ) : null}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
