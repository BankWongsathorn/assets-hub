import Form from "@/components/form/FormAsset";
import DeptTable from "@/components/table/DeptTable";
import { fetchData } from "@/utils/FetchData";
import { redirect } from "next/navigation";

const prepareFetchData = async (id: string) => {
  const res = await fetchData({ path: `/asset/${id}` });
  if (res.status === "error") redirect("/asset");
  return {
    ...res.data,
    lot: res.data.lot_number,
    serial: res.data.serial_number,
    purchasedate: res.data.purchase_date,
    warrantyexpiry: res.data.warranty_expiry,
  };
};

export default async function AssetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const coreData = await prepareFetchData((await params).id);

  return (
    <DeptTable dept={header.dept}>
      <h1 className="text-2xl font-semibold mb-4">{header.title}</h1>
      <Form back={header.href} coreData={coreData} disabled={header.disabled} />
    </DeptTable>
  );
}

const header = {
  title: "Asset Detail",
  href: "/warehouse/asset",
  dept: ["Information Technology"],
  disabled: ["lot", "serial", "name", "purchasedate", "status"],
};
