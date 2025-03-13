import Table from "@/components/table/Table";
import { Columns } from "./colums";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchData } from "@/utils/FetchData";
import DeptTable from "@/components/table/DeptTable";
import { formatDate } from "@/utils/Date";

const prepareFetchData = async () => {
  const res = await fetchData({ path: "/asset" });

  if (!res.data) return [];

  return res.data.map((item: any) => {
    return {
      id: item.id,
      lot: item.lot_number,
      serial: item.serial_number,
      name: item.name,
      purchasedate: formatDate(item.purchase_date),
      warrantyexpiry: item.warranty_expiry && formatDate(item.warranty_expiry),
      status: item.status,
      user: item.user?.email || "",
      updated_at: formatDate(item.updated_at),
    };
  });
};

export default async function Asset() {
  const data = await prepareFetchData();

  return (
    <div className="flex flex-col gap-8 mb-8">
      <DeptTable dept={header.dept}>
        <h1 className="text-3xl font-semibold">{header.title}</h1>
        <Table columns={Columns} data={data} option={header.options}>
          <div className="flex justify-end">
            <Link href={header.href}>
              <Button>{header.button}</Button>
            </Link>
          </div>
        </Table>
      </DeptTable>
    </div>
  );
}

const header = {
  title: "Asset",
  href: "/warehouse/asset/create",
  button: "New Asset",
  dept: ["Information Technology"],
  options: {
    search: ["user"],
  },
};
