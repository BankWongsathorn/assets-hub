"use client";
import { useState } from "react";
import MyField from "@/components/field/MyField";
import TableView from "@/components/table/TableView";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { fetchData } from "@/utils/FetchData";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuditLogStatus, AuditLogType } from "@prisma/client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatDate } from "@/utils/Date";

function convertToOptions(obj: Record<string, string>) {
  return Object.keys(obj).map((key) => ({
    value: obj[key],
    label: obj[key],
  }));
}

const AuditLogTypeOptions = convertToOptions(AuditLogType);
const AuditLogStatusOptions = convertToOptions(AuditLogStatus);

export default function Export() {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);

  const formSchema = z.object({
    audit_type: z.array(z.string()), // เพิ่มฟิลด์สำหรับเก็บ AuditLogTypeOptions
    audit_status: z.array(z.string()), // เพิ่มฟิลด์สำหรับเก็บ AuditLogStatusOptions
    start_date: z.string(),
    end_date: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      audit_type: [], // กำหนดค่าเริ่มต้นเป็น Array ว่าง
      audit_status: [], // กำหนดค่าเริ่มต้นเป็น Array ว่าง
      start_date: "",
      end_date: "",
    },
  });

  const onClear = () => {
    form.reset();
    setData([]);
    setRows([]);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
    };

    const res = await fetchData({
      method: "POST",
      path: "/audit/export",
      body: {
        type: formData.audit_type,
        status: formData.audit_status,
        start_date: formData.start_date,
        end_date: formData.end_date,
      },
    });

    if (res.status === "error") {
      return toast({
        title: "Error",
        description: res.message,
      });
    }

    setData(
      res.data.map((item: any) => {
        return {
          user: item.user.email,
          asset: item.asset.name,
          type: item.type,
          status: item.status,
          reported_by: item.reported_by.email || "-",
          handled_by: item.handled_by?.email || "-",
          created_at: formatDate(item.created_at),
          updated_at: formatDate(item.updated_at),
        };
      })
    );

    setRows(
      res.data.map((item: any) => [
        item.user.email,
        item.asset.name,
        item.type,
        item.status,
        item.reported_by?.email || "-",
        item.handled_by?.email || "-",
        formatDate(item.created_at),
        formatDate(item.updated_at),
      ])
    );

    return toast({
      title: "Success",
      description: "Exported successfully",
    });
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold">{header.title}</h1>
      <div className="my-8">
        <Form {...form}>
          <Link href={header.href}>
            <Button variant="secondary">Back</Button>
          </Link>
          <hr className="my-4" />
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p>Audit Type</p>
                {AuditLogTypeOptions.map((option) => (
                  <MyField
                    key={option.value}
                    form={form}
                    name="audit_type" // ใช้ชื่อฟิลด์เดียวกันสำหรับทุก checkbox
                    options={option}
                    type="checkbox"
                  />
                ))}
              </div>
              <div>
                <p>Audit Status</p>
                {AuditLogStatusOptions.map((option) => (
                  <MyField
                    key={option.value}
                    form={form}
                    name="audit_status" // ใช้ชื่อฟิลด์เดียวกันสำหรับทุก checkbox
                    options={option}
                    type="checkbox"
                  />
                ))}
              </div>
              <MyField
                form={form}
                name="start_date"
                placeholder="Start Date"
                type="date"
                options={{ maxDate: form.watch("end_date") }} // ส่งค่า maxDate ไปให้ DatePicker
              />
              <MyField
                form={form}
                name="end_date"
                placeholder="End Date"
                type="date"
                options={{ minDate: form.watch("start_date") }} // ส่งค่า minDate ไปให้ DatePicker
              />
            </div>
            <div className="my-8 flex items-center gap-4">
              <Button type="button" onClick={onClear} variant="secondary">
                Clear
              </Button>
              <Button type="submit">Search</Button>
            </div>
            {data.length > 0 && <div className="my-8 flex gap-4"></div>}
          </form>
        </Form>
      </div>
      {data.length > 0 && (
        <TableView data={data} headers={header.table} rows={rows} />
      )}
    </section>
  );
}

const header = {
  title: "Export History",
  href: "/history",
  table: [
    "user",
    "asset",
    "type",
    "status",
    "reported_by",
    "handled_by",
    "created_at",
    "updated_at",
  ],
};
