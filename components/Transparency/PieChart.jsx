"use client";

import { Pie, PieChart as RechartsPieChart } from "recharts";
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

const chartData = [
  { category: "ingredients", amount: 1.34, fill: "var(--color-ingredients)" },
  { category: "salaries", amount: 1.16, fill: "var(--color-salaries)" },
  {
    category: "taxes_location",
    amount: 1.55,
    fill: "var(--color-taxes_location)",
  },
  {
    category: "loan_repayments",
    amount: 0.24,
    fill: "var(--color-loan_repayments)",
  },
  { category: "packaging", amount: 0.12, fill: "var(--color-packaging)" },
  { category: "accountant", amount: 0.03, fill: "var(--color-accountant)" },
  { category: "equipment", amount: 0.02, fill: "var(--color-equipment)" },
  {
    category: "other_administrative",
    amount: 0.03,
    fill: "var(--color-other_administrative)",
  },
  {
    category: "other_business",
    amount: 0.01,
    fill: "var(--color-other_business)",
  },
];

const chartConfig = {
  amount: {
    label: "Amount",
  },
  ingredients: {
    label: "Ingredients",
    color: "var(--color-dnm-light-green)",
  },
  salaries: {
    label: "Salaries",
    color: "#3b4a3f",
  },
  taxes_location: {
    label: "Taxes & Location costs",
    color: "#4877e0",
  },
  loan_repayments: {
    label: "Loan repayments",
    color: "#b36a22",
  },
  packaging: {
    label: "Packaging",
    color: "#008988",
  },
  accountant: {
    label: "Accountant",
    color: "var(--chart-1)",
  },
  equipment: {
    label: "Equipment",
    color: "var(--chart-4)",
  },
  other_administrative: {
    label: "Other administrative",
    color: "var(--color-dnm-dark-green)",
  },
  other_business: {
    label: "Other business",
    color: "var(--chart-5)",
  },
};

const formatCurrency = (value) => `€${Number(value).toFixed(2)}`;

function renderPieLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) {
  if (percent < 0.07) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-[11px] font-semibold"
    >
      {`${Math.round(percent * 100)}%`}
    </text>
  );
}

export default function PriceBreakdownPieChart() {
  return (
    <Card className="justify-between overflow-hidden max-[400px]:w-80 max-sm:w-100 md:w-150 xl:w-200">
      <CardHeader className="items-center text-center">
        <CardTitle>Portion Price Breakdown</CardTitle>
        <CardDescription>
          Showing where the €4.50 portion price goes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[420px] min-h-75 w-full pb-0"
        >
          <RechartsPieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="category"
                  formatter={(value, name, item) => {
                    const label =
                      chartConfig[item.payload.category]?.label ?? name;

                    return (
                      <>
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                          style={{ backgroundColor: item.payload.fill }}
                        />
                        <span className="text-muted-foreground">{label}</span>
                        <span className="text-foreground ml-auto font-mono font-medium tabular-nums">
                          {formatCurrency(value)}
                        </span>
                      </>
                    );
                  }}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              label={renderPieLabel}
              labelLine={false}
            />
            <ChartLegend
              content={
                <ChartLegendContent
                  nameKey="category"
                  className="flex-wrap gap-x-4 gap-y-2 text-xs"
                />
              }
            />
          </RechartsPieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
