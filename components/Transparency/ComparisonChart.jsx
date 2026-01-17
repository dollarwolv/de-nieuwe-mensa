"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";

export default function ComparisonChart() {
  const [selectedRubrik, setSelectedRubrik] = useState("satisfaction");
  const [chartData, setChartData] = useState([]);
  const [menu, setMenu] = useState([]);

  const params = new URLSearchParams({
    rubrik: selectedRubrik,
  });

  function getDishNameById(id) {
    const found = menu.find((element) => element.dish.id === id);
    return found?.dish.name;
  }

  const RUBRIKS = [
    { name: "satisfaction", label: "Overall Satisfaction" },
    { name: "tastiness", label: "Tastiness" },
    { name: "fillingness", label: "Fillingness" },
    { name: "healthiness", label: "Healthiness" },
    { name: "valueForMoney", label: "Value For Money" },
  ];

  const chartConfig = {
    fillingness: {
      label: "Fillingness",
      color: "#3b8b55",
    },
    satisfaction: {
      label: "Overall Satisfaction",
      color: "#3b4a3f",
    },
    value_for_money: {
      label: "Value for money",
      color: "#4877e0",
    },
    tastiness: {
      label: "Tastiness",
      color: "#b36a22",
    },
    healthiness: {
      label: "Healthiness",
      color: "#008988",
    },
  };

  useEffect(() => {
    const fetchFunc = async () => {
      const res = await fetch(`/api/vote-stats/by-dish?${params.toString()}`);
      const data = await res.json();
      setChartData(data.averages);
      console.log(chartData);
    };

    fetchFunc();
  }, [selectedRubrik]);

  useEffect(() => {
    const fetchFunc = async () => {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setMenu([...(data.thisWeeksMenu ?? []), ...(data.nextWeeksMenu ?? [])]);
    };
    fetchFunc();
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <Card className="justify-between overflow-hidden max-[400px]:w-80 max-sm:w-100 md:w-150 xl:w-200">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col">
          <CardTitle>Dish Rating Data - Comparison</CardTitle>
          <CardDescription>
            Showing average rating of our different dishes
          </CardDescription>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Select value={selectedRubrik} onValueChange={setSelectedRubrik}>
            <SelectTrigger className="w-50 rounded-lg max-[400px]:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value={"all"} className="rounded-lg">
                All rubrics
              </SelectItem>
              {RUBRIKS.map((rubrik) => {
                return (
                  <SelectItem
                    value={rubrik.name}
                    className="rounded-lg"
                    key={rubrik.name}
                  >
                    {rubrik.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {chartData?.length ? (
          <ChartContainer
            config={chartConfig}
            className="min-h-50 w-full max-sm:h-100"
          >
            {isMobile ? (
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{ left: 8, right: 8 }}
              >
                <CartesianGrid horizontal={false} />

                <YAxis
                  dataKey="dish_id"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={120}
                  tickFormatter={(value) => getDishNameById(value)}
                />

                <XAxis type="number" tickLine={false} axisLine={false} />

                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(_, payload) => {
                        const id = payload?.[0]?.payload?.dish_id;
                        return id ? (getDishNameById(id) ?? `Dish ${id}`) : "";
                      }}
                    />
                  }
                  className="w-40"
                />
                <ChartLegend content={<ChartLegendContent />} />

                {chartData[0].fillingness && (
                  <Bar
                    dataKey="fillingness"
                    fill="var(--color-fillingness)"
                    radius={4}
                  />
                )}
                {chartData[0].healthiness && (
                  <Bar
                    dataKey="healthiness"
                    fill="var(--color-healthiness)"
                    radius={4}
                  />
                )}
                {chartData[0].tastiness && (
                  <Bar
                    dataKey="tastiness"
                    fill="var(--color-tastiness)"
                    radius={4}
                  />
                )}
                {chartData[0].value_for_money && (
                  <Bar
                    dataKey="value_for_money"
                    fill="var(--color-value_for_money)"
                    radius={4}
                  />
                )}
                {chartData[0].satisfaction && (
                  <Bar
                    dataKey="satisfaction"
                    fill="var(--color-satisfaction)"
                    radius={4}
                  />
                )}
              </BarChart>
            ) : (
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid />
                <XAxis
                  dataKey="dish_id"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => getDishNameById(value)}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  className="w-40"
                />
                <ChartLegend content={<ChartLegendContent />} />

                {chartData[0].fillingness && (
                  <Bar
                    dataKey="fillingness"
                    fill="var(--color-fillingness)"
                    radius={4}
                  />
                )}
                {chartData[0].healthiness && (
                  <Bar
                    dataKey="healthiness"
                    fill="var(--color-healthiness)"
                    radius={4}
                  />
                )}
                {chartData[0].tastiness && (
                  <Bar
                    dataKey="tastiness"
                    fill="var(--color-tastiness)"
                    radius={4}
                  />
                )}
                {chartData[0].value_for_money && (
                  <Bar
                    dataKey="value_for_money"
                    fill="var(--color-value_for_money)"
                    radius={4}
                  />
                )}
                {chartData[0].satisfaction && (
                  <Bar
                    dataKey="satisfaction"
                    fill="var(--color-satisfaction)"
                    radius={4}
                  />
                )}
              </BarChart>
            )}
          </ChartContainer>
        ) : (
          <div className="pointer-events-none flex min-h-50 items-center justify-center">
            <div className="bg-background/80 text-muted-foreground rounded-lg border px-3 py-2 text-sm shadow-sm">
              No data for this selection
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
