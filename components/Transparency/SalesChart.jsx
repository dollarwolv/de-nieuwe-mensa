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

function convertDate(dateString, showYear = true) {
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

  if (showYear) {
    return day + " " + monthsDict[month] + " " + year;
  } else {
    return day + " " + monthsDict[month];
  }
}

function convertWeekday(weekdayInt) {
  const weekdayDict = {
    0: "Mon",
    1: "Tue",
    2: "Wed",
    3: "Thu",
    4: "Fri",
    5: "Sat",
    6: "Sun",
  };

  return weekdayDict[weekdayInt];
}

export default function SalesChart() {
  const [dateRange, setDateRange] = useState(365);
  const [groupBy, setGroupBy] = useState("month");
  const [chartData, setChartData] = useState([]);

  const params = new URLSearchParams({
    dateRange,
    groupBy,
  });

  const dateRanges = [
    { description: "Last year", num: 365 },
    { description: "Last 6 months", num: 180 },
    { description: "Last 3 months", num: 90 },
    { description: "Past 30 days", num: 30 },
    { description: "Past 7 days", num: 7 },
  ];

  const chartConfig = {
    sales: {
      label: "Sales",
      color: "var(--color-dnm-light-green)",
    },
  };

  useEffect(() => {
    const fetchFunc = async () => {
      const res = await fetch(`/api/sales?${params.toString()}`);
      const data = await res.json();
      setChartData(data.data);
      console.log(chartData);
    };

    fetchFunc();
  }, [dateRange, groupBy]);

  return (
    <Card className="justify-between overflow-hidden max-[400px]:w-80 max-sm:w-100 md:w-150 xl:w-200">
      <CardHeader className="flex flex-col justify-between md:flex-row">
        <div className="flex flex-col">
          <CardTitle>DNM Sales Data - Progression Over Time</CardTitle>
          <CardDescription>
            Showing Sales of DNM by month, day, or weekday.
          </CardDescription>
        </div>
        <div className="flex flex-row md:flex-col md:gap-1">
          <div className="flex flex-col md:flex-row md:justify-between md:gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
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
          </div>

          <div className="flex flex-col items-end md:flex-row md:justify-between md:gap-2">
            <Select value={groupBy} onValueChange={setGroupBy}>
              <SelectTrigger className="w-32 rounded-lg md:w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value={"day"} className="rounded-lg">
                  Per Day
                </SelectItem>
                <SelectItem value={"week"} className="rounded-lg">
                  Per Weekday
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
              <YAxis type="number" domain={[0, "dataMax"]} />
              {groupBy === "day" && (
                <XAxis
                  dataKey={"day"}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  angle={-20}
                  tickFormatter={(value) => convertDate(value, false)}
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
              {groupBy === "week" && (
                <XAxis
                  dataKey={"weekday"}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => convertWeekday(value)}
                />
              )}

              <ChartTooltip
                content={<ChartTooltipContent />}
                labelFormatter={(_, payload) => {
                  const id = payload?.[0]?.payload?.weekday;
                  const day = payload?.[0]?.payload?.day;
                  const month = payload?.[0]?.payload?.month;
                  return id !== undefined
                    ? (convertWeekday(id) ?? `Weekday ${id}`)
                    : day !== undefined
                      ? convertDate(day)
                      : month !== undefined
                        ? convertDate(month)
                        : "";
                }}
                className="w-40"
              />
              <ChartLegend content={<ChartLegendContent />} />

              <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
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
