import Table from "@/components/table/Table";
import { Columns } from "./columns";
import DeptTable from "@/components/table/DeptTable";
import { fetchData } from "@/utils/FetchData";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const prepareFetchData = async () => {
  const res = await fetchData({
    path: "/audit",
  });

  if (!res.data) return [];

  return res.data.map((item: any) => ({
    id: item.id,
    user: item.user?.email,
    serial: item.asset?.serial_number,
    name: item.asset?.name,
    type: item.type,
    status: item.status,
    reported_by: item.reported_by?.email,
    handled_by: item.handled_by?.email || "-",
  }));
};

export default async function History() {
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
  title: "History",
  dept: ["Accounting"],
  options: {
    search: ["user"],
  },
  href: "/history/export",
  button: "Export",
};
