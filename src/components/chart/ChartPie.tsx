"use client";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/FetchData";

const chart = [
  { dept: "Admin", fill: "var(--color-admin)", amount: 0 },
  { dept: "Human resource", fill: "var(--color-hr)", amount: 0 },
  { dept: "Account", fill: "var(--color-acc)", amount: 0 },
  { dept: "Information Technology", fill: "var(--color-it)", amount: 0 },
  { dept: "General", fill: "var(--color-general)", amount: 0 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  admin: {
    label: "Admin",
    color: "hsl(var(--chart-1))",
  },
  hr: {
    label: "Human resource",
    color: "hsl(var(--chart-2))",
  },
  acc: {
    label: "Account",
    color: "hsl(var(--chart-3))",
  },
  it: {
    label: "Information Technology",
    color: "hsl(var(--chart-4))",
  },
  general: {
    label: "General",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const prepareFetchData = async () => {
  const res = await fetchData({ path: "/user/active" });

  if (res.status === "error") {
    return [];
  }

  return res.data;
};

export default function ChartPie() {
  const [chartData, setChartData] = useState<
    { amount: number; dept: string; fill: string }[]
  >([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    prepareFetchData().then((data) => {
      const getChart = chart.map((item) => {
        const c = (item.amount = data.filter(
          (user: { department: { name: string } }) =>
            user.department.name === item.dept
        ).length);

        return { ...item, amount: c };
      });

      setChartData(getChart);
      setTotal(data.length);
    });
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>User Department</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[500px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="dept"
              innerRadius={100}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Active
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
