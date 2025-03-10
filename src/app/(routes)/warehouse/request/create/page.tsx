"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MyField from "@/components/field/MyField";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { fetchData } from "@/utils/FetchData";
import { AssetStatus, AuditLogType } from "@prisma/client";
import { toast } from "@/hooks/use-toast";

const prepareFetchUser = async () => {
  const res = await fetchData({ method: "GET", path: "/user" });
  if (!res.data) return [];
  const activeUsers = res.data.filter((item: any) => item.status === "Active");
  return activeUsers.map((item: any) => {
    return { value: item.id, label: item.email };
  });
};

const prepareFetchAssets = async () => {
  const res = await fetchData({
    method: "POST",
    path: "/asset/status",
    body: { status: [AssetStatus.Available] },
  });
  if (!res.data) return [];
  const uniqueNames = new Set();
  const removeDup = res.data.filter((item: any) => {
    if (!uniqueNames.has(item.name)) {
      uniqueNames.add(item.name);
      return true;
    }
    return false;
  });

  return removeDup.map((item: any) => {
    return { value: item.id, label: item.name };
  });
};

export default function RequestCreate() {
  const [user, setUser] = useState([]);
  const [assets, setAssets] = useState([]);

  const formSchema = z.object({
    user: z.string().nonempty({ message: "User is required" }),
    asset: z.string().nonempty({ message: "Asset is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      asset: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
    };

    const res = await fetchData({
      method: "POST",
      path: "/audit",
      body: {
        asset_id: formData.asset,
        user_id: formData.user,
        type: AuditLogType.Assignment,
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
      description: "Data has been saved",
    });

    redirect(header.href);
  };

  useEffect(() => {
    prepareFetchUser().then((data) => {
      setUser(data);
    });
    prepareFetchAssets().then((data) => {
      setAssets(data);
    });
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-semibold mb-4">{header.title}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <MyField
              form={form}
              name="user"
              placeholder="User"
              type="select"
              options={user}
            />
            <MyField
              form={form}
              name="asset"
              placeholder="Asset"
              type="select"
              options={assets}
            />
          </div>
          <div className="my-8 flex gap-4">
            <Link href={header.href}>
              <Button variant="secondary">Back</Button>
            </Link>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

const header = {
  title: "Request Asset Create",
  href: "/warehouse/request",
  role: ["Information Technology"],
};
