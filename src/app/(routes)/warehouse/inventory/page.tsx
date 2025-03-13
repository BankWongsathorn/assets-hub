import Table from "@/components/table/Table";
import { Columns } from "./colums";
import { fetchData } from "@/utils/FetchData";
import { formatDate } from "@/utils/Date";
import { UserSession } from "@/utils/auth/UserSession";

const prepareFetchData = async () => {
  const user = await UserSession();

  if (!user) return [];

  const res = await fetchData({
    path: `/user/asset/${user.id}`,
  });

  if (!res.data) return [];

  return res.data.map((item: any) => {
    return {
      id: item.id,
      lot: item.lot_number,
      serial: item.serial_number,
      name: item.name,
      warrantyexpiry: item.warranty_expiry
        ? formatDate(item.warranty_expiry)
        : "-",
      status: item.status,
      user_id: item.user_id,
      updated_at: formatDate(item.updated_at),
    };
  });
};

export default async function Inventory() {
  const data = await prepareFetchData();

  return (
    <div className="flex flex-col gap-8 mb-8">
      <h1 className="text-3xl font-semibold">{header.title}</h1>
      <Table columns={Columns} data={data} option={header.options}></Table>
    </div>
  );
}

const header = {
  title: "Inventory",
  options: {
    search: ["serial"],
  },
};
