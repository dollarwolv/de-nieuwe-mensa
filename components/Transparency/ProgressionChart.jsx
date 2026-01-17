"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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

function convertDate(dateString) {
  const year = dateString.slice(0, 4);
  const month = Number(dateString.slice(5, 7));
  let day = "";

  if (dateString.length > 7) {
    day = Number(dateString.slice(8, 10));
  }

  const monthsDict = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  return day + " " + monthsDict[month] + " " + year;
}

export default function ProgressionChart() {
  const [dateRange, setDateRange] = useState(365);
  const [selectedDishId, setSelectedDishId] = useState("all");
  const [selectedRubrik, setSelectedRubrik] = useState("satisfaction");
  const [groupBy, setGroupBy] = useState("month");

  const [chartData, setChartData] = useState([]);
  const [menu, setMenu] = useState([]);

  const params = new URLSearchParams({
    dateRange,
    groupBy,
  });
  if (selectedDishId !== "all") {
    params.append("dishId", selectedDishId);
  }
  if (selectedRubrik !== "all") {
    params.append("rubrik", selectedRubrik);
  }

  const dateRanges = [
    { description: "Last year", num: 365 },
    { description: "Last 6 months", num: 180 },
    { description: "Last 3 months", num: 90 },
    { description: "Past 30 days", num: 30 },
    { description: "Past 7 days", num: 7 },
  ];

  const RUBRIKS = [
    { name: "satisfaction", label: "Overall Satisfaction" },
    { name: "tastiness", label: "Tastiness" },
    { name: "fillingness", label: "Fillingness" },
    { name: "healthiness", label: "Healthiness" },
    { name: "valueForMoney", label: "Value For Money" },
  ];

  const rubricDict = {
    satisfaction: "Overall satisfaction",
    tastiness: "Tastiness",
    fillingness: "Fillingness",
    healthiness: "Healthiness",
    valueForMoney: "Value For Money",
  };

  const chartConfig = {
    avg: {
      label: `Average ${rubricDict[selectedRubrik]}`,
      color: "var(--color-dnm-light-green)",
    },
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
      const res = await fetch(`/api/vote-stats/by-month?${params.toString()}`);
      const data = await res.json();
      setChartData(data.daily);
      console.log(chartData);
      console.log(Object.entries(chartConfig));
    };

    fetchFunc();
  }, [dateRange, selectedDishId, selectedRubrik, groupBy]);

  useEffect(() => {
    const fetchFunc = async () => {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setMenu([...(data.thisWeeksMenu ?? []), ...(data.nextWeeksMenu ?? [])]);
    };

    fetchFunc();
  }, []);
  return (
    <Card className="justify-between overflow-hidden max-[400px]:w-80 max-sm:w-100 md:w-150 xl:w-200">
      <CardHeader className="flex flex-col justify-between md:flex-row">
        <div className="flex flex-col">
          <CardTitle>Dish Rating Data - Progression Over Time</CardTitle>
          <CardDescription>
            Showing average ratings for our dishes per month
          </CardDescription>
        </div>
        <div className="flex flex-row md:flex-col md:gap-1">
          <div className="flex flex-col md:flex-row md:justify-between md:gap-2">
            <Select
              value={dateRange}
              onValueChange={setDateRange}
              defaultValue={30}
            >
              <SelectTrigger className="w-38 rounded-lg max-[400px]:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {dateRanges.map((item) => {
                  return (
                    <SelectItem
                      value={item.num}
                      className="rounded-lg"
                      key={item.num}
                    >
                      {item.description}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Select value={selectedDishId} onValueChange={setSelectedDishId}>
              <SelectTrigger className="w-45 rounded-lg max-[400px]:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value={"all"} className="rounded-lg">
                  All dishes
                </SelectItem>
                {menu.map((entry) => {
                  return (
                    <SelectItem
                      value={entry.dish.id}
                      className="rounded-lg"
                      key={entry.id}
                    >
                      {entry.dish.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-end md:flex-row md:justify-between md:gap-2">
            <Select value={selectedRubrik} onValueChange={setSelectedRubrik}>
              <SelectTrigger className="w-42 rounded-lg md:w-50">
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
            <Select value={groupBy} onValueChange={setGroupBy}>
              <SelectTrigger className="w-32 rounded-lg md:w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value={"day"} className="rounded-lg">
                  Per Day
                </SelectItem>
                <SelectItem value={"month"} className="rounded-lg">
                  Per Month
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {chartData?.length ? (
          <ChartContainer config={chartConfig} className="min-h-50 w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid />
              {groupBy === "day" && (
                <XAxis
                  dataKey={"vote_day"}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
              )}
              {groupBy === "month" && (
                <XAxis
                  dataKey={"month"}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => convertDate(value)}
                />
              )}

              <ChartTooltip
                content={<ChartTooltipContent />}
                className="w-40"
              />
              <ChartLegend content={<ChartLegendContent />} />

              {!chartData[0].avg && (
                <Bar
                  dataKey="fillingness"
                  fill="var(--color-fillingness)"
                  radius={4}
                />
              )}
              {!chartData[0].avg && (
                <Bar
                  dataKey="healthiness"
                  fill="var(--color-healthiness)"
                  radius={4}
                />
              )}

              {!chartData[0].avg && (
                <Bar
                  dataKey="tastiness"
                  fill="var(--color-tastiness)"
                  radius={4}
                />
              )}
              {!chartData[0].avg && (
                <Bar
                  dataKey="value_for_money"
                  fill="var(--color-value_for_money)"
                  radius={4}
                />
              )}
              {!chartData[0].avg && (
                <Bar
                  dataKey="satisfaction"
                  fill="var(--color-satisfaction)"
                  radius={4}
                />
              )}
              {chartData[0].avg && (
                <Bar dataKey="avg" fill="var(--color-avg)" radius={4} />
              )}
            </BarChart>
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
