"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormContainer from "@/components/form/FormContainer";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "../ui/button";
import { formSchema, Data as DataValue, Status } from "@/utils/data/Employee";
import { formatDate } from "@/utils/format/Date";
import { Fetch } from "@/utils/Fetch";

const prepareOptions = (data: any) => {
  return data.map((item: any) => {
    return { value: item.id.toString(), label: item.name };
  });
};

export default function FormEmployee({
  back,
  coreData,
}: {
  back: string;
  coreData?: any;
}) {
  const [departments, setDepartments] = useState<any[]>([]);
  const [roles, setRoles] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: coreData?.username || "",
      email: coreData?.email || "",
      firstname: coreData?.firstname || "",
      lastname: coreData?.lastname || "",
      phone: coreData?.phone || "",
      department: coreData?.department.toString() || "",
      role: coreData?.role.toString() || "",
      hiredate: coreData?.hiredate || "",
      status: coreData?.status || "",
    },
  });

  const prepareFetchDepartments = async () => await Fetch("department");

  const handleDepartmentChange = (value: string) => {
    const department = departments.find((dept: any) => dept.id == value);
    department ? setRoles(department.role) : setRoles([]);
    form.setValue("role", "");
  };

  const options = [
    {
      name: "department",
      state: departments,
    },
    {
      name: "role",
      state: roles,
    },
    {
      name: "status",
      state: Status,
    },
  ];

  useEffect(() => {
    prepareFetchDepartments().then((dept) => {
      setDepartments(dept);
      if (coreData) {
        const department = dept.find((d: any) => d.id == coreData.department);
        department ? setRoles(department.role) : setRoles([]);
      }
    });
  }, []);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
      hiredate: formatDate(values.hiredate),
    };
    console.log(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {DataValue.map((data: any, index: number) => (
            <FormField
              key={index}
              control={form.control}
              name={data.name}
              render={({ field }) => {
                return (
                  <FormContainer
                    field={field}
                    name={data.name}
                    placeholder={data.placeholder}
                    type={data.type}
                    options={
                      data.type === "select"
                        ? prepareOptions(
                            options?.find((option) => option.name === data.name)
                              ?.state || []
                          )
                        : []
                    }
                    onSelected={
                      data.name === "department"
                        ? handleDepartmentChange
                        : undefined
                    }
                  />
                );
              }}
            />
          ))}
        </div>
        <div className="my-8 flex gap-4">
          {back && (
            <Link href={back}>
              <Button variant={"secondary"}>Back</Button>
            </Link>
          )}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
