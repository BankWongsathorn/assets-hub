import Table from "@/components/table/Table";
import { ManagementColumns as columns } from "./colums";
import { fetchData } from "@/utils/FetchData";
import DeptTable from "@/components/table/DeptTable";
import { AuditLogStatus } from "@prisma/client";
import { formatDate } from "@/utils/Date";

const prepareFetchData = async () => {
  const res = await fetchData({
    method: "POST",
    path: "/audit/status",
    body: { status: [AuditLogStatus.Pending, AuditLogStatus.InProgress] },
  });

  if (!res.data) return [];

  return res.data.map((item: any) => {
    return {
      id: item.id,
      user: item.user?.email,
      serial: item.asset?.serial_number,
      name: item.asset?.name,
      type: item.type,
      status: item.status,
      reported_by: item.reported_by?.email,
      asset_id: item.asset_id,
      user_id: item.user_id,
      created_at: formatDate(item.created_at),
      updated_at: formatDate(item.updated_at),
    };
  });
};

export default async function Management() {
  const data = await prepareFetchData();

  return (
    <div className="flex flex-col gap-8 mb-8">
      <DeptTable dept={header.dept}>
        <h1 className="text-3xl font-semibold">{header.title}</h1>
        <Table columns={columns} data={data} option={header.options}></Table>
      </DeptTable>
    </div>
  );
}

const header = {
  title: "Management",
  dept: ["Information Technology"],
  options: {
    search: ["user"],
  },
};
