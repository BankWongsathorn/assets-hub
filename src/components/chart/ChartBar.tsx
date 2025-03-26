"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchData } from "@/utils/FetchData";
import { useEffect, useState } from "react";

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const chartConfig = {
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const prepareFetchData = async () => {
  const res = await fetchData({ path: "/asset/thisyear" });

  if (res.status === "error") {
    return [];
  }

  const monthCounts = new Array(12).fill(0);

  res.data.forEach((rec: { purchase_date: string }) => {
    const month = new Date(rec.purchase_date).getMonth();
    monthCounts[month]++;
  });

  const data = month.map((monthName, index) => ({
    month: monthName,
    amount: monthCounts[index],
  }));

  return data;
};

export default function ChartBar() {
  const [chartData, setChartData] = useState<
    { month: string; amount: number }[]
  >([]);

  useEffect(() => {
    prepareFetchData().then((data) => {
      setChartData(data);
    });
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Assets</CardTitle>
        <CardDescription>January - December</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
