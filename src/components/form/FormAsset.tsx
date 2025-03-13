"use client";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ContainerForm from "@/components/form/ContainerForm";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "../ui/button";
import { formSchema, Data as DataValue, Status } from "@/utils/data/Asset";
import { fetchData } from "@/utils/FetchData";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

const prepareOptions = (data: any) => {
  return data.map((item: any) => {
    return { value: item.id.toString(), label: item.name };
  });
};

export default function FormAsset({
  back,
  coreData,
  disabled,
}: {
  back: string;
  coreData?: any;
  disabled?: string[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lot: coreData?.lot || "",
      serial: coreData?.serial || "",
      name: coreData?.name || "",
      purchasedate: coreData?.purchasedate || "",
      warrantyexpiry: coreData?.warrantyexpiry || "",
      status: coreData?.status || "",
    },
  });

  const options = [
    {
      name: "status",
      state: Status,
    },
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
    };

    const res = await fetchData({
      method: "PUT",
      path: `/asset/${coreData.id}`,
      body: {
        name: formData.name,
        warranty_expiry: formData.warrantyexpiry,
        status: formData.status,
      },
    });

    if (res.status === "error") {
      return toast({
        title: "Failed",
        description: res.message,
      });
    }

    toast({
      title: "Success",
      description: "Data has been updated",
    });

    redirect(back);
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
                  <ContainerForm
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
                    disabled={disabled?.includes(data.name)}
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
