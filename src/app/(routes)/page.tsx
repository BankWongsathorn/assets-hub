import Card from "@/components/card/Card";
import CardOverview from "@/components/card/CardOverview";
import { User, Package, Power, Wrench } from "lucide-react";
import ChartBar from "@/components/chart/ChartBar";
import ChartPie from "@/components/chart/ChartPie";
import { fetchData } from "@/utils/FetchData";
import { AssetStatus } from "@prisma/client";

export default async function Home() {
  const employee = (await fetchData({ path: "/user" })).data?.length || 0;
  const asset =
    (
      await fetchData({
        method: "POST",
        path: "/asset/status",
        body: { status: [AssetStatus.Available] },
      })
    ).data?.length || 0;
  const assigned =
    (
      await fetchData({
        method: "POST",
        path: "/asset/status",
        body: { status: [AssetStatus.Assigned] },
      })
    ).data?.length || 0;
  const Maintenance =
    (
      await fetchData({
        method: "POST",
        path: "/asset/status",
        body: { status: [AssetStatus.Maintenance] },
      })
    ).data?.length || 0;

  return (
    <section>
      <div className="grid grid-cols-4 gap-8 mb-8">
        <Card>
          <CardOverview title="User" Icon={User} value={employee} />
        </Card>
        <Card>
          <CardOverview title="Available" Icon={Package} value={asset} />
        </Card>
        <Card>
          <CardOverview title="Assigned" Icon={Power} value={assigned} />
        </Card>
        <Card>
          <CardOverview title="Maintenance" Icon={Wrench} value={Maintenance} />
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <ChartBar />
        <ChartPie />
      </div>
    </section>
  );
}
