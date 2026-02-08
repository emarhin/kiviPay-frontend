"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", ussd: 222, paylink: 150 },
  { date: "2024-04-02", ussd: 97, paylink: 180 },
  { date: "2024-04-03", ussd: 167, paylink: 120 },
  { date: "2024-04-04", ussd: 242, paylink: 260 },
  { date: "2024-04-05", ussd: 373, paylink: 290 },
  { date: "2024-04-06", ussd: 301, paylink: 340 },
  { date: "2024-04-07", ussd: 245, paylink: 180 },
  { date: "2024-04-08", ussd: 409, paylink: 320 },
  { date: "2024-04-09", ussd: 59, paylink: 110 },
  { date: "2024-04-10", ussd: 261, paylink: 190 },
  { date: "2024-04-11", ussd: 327, paylink: 350 },
  { date: "2024-04-12", ussd: 292, paylink: 210 },
  { date: "2024-04-13", ussd: 342, paylink: 380 },
  { date: "2024-04-14", ussd: 137, paylink: 220 },
  { date: "2024-04-15", ussd: 120, paylink: 170 },
  { date: "2024-04-16", ussd: 138, paylink: 190 },
  { date: "2024-04-17", ussd: 446, paylink: 360 },
  { date: "2024-04-18", ussd: 364, paylink: 410 },
  { date: "2024-04-19", ussd: 243, paylink: 180 },
  { date: "2024-04-20", ussd: 89, paylink: 150 },
  { date: "2024-04-21", ussd: 137, paylink: 200 },
  { date: "2024-04-22", ussd: 224, paylink: 170 },
  { date: "2024-04-23", ussd: 138, paylink: 230 },
  { date: "2024-04-24", ussd: 387, paylink: 290 },
  { date: "2024-04-25", ussd: 215, paylink: 250 },
  { date: "2024-04-26", ussd: 75, paylink: 130 },
  { date: "2024-04-27", ussd: 383, paylink: 420 },
  { date: "2024-04-28", ussd: 122, paylink: 180 },
  { date: "2024-04-29", ussd: 315, paylink: 240 },
  { date: "2024-04-30", ussd: 454, paylink: 380 },
  { date: "2024-05-01", ussd: 165, paylink: 220 },
  { date: "2024-05-02", ussd: 293, paylink: 310 },
  { date: "2024-05-03", ussd: 247, paylink: 190 },
  { date: "2024-05-04", ussd: 385, paylink: 420 },
  { date: "2024-05-05", ussd: 481, paylink: 390 },
  { date: "2024-05-06", ussd: 498, paylink: 520 },
  { date: "2024-05-07", ussd: 388, paylink: 300 },
  { date: "2024-05-08", ussd: 149, paylink: 210 },
  { date: "2024-05-09", ussd: 227, paylink: 180 },
  { date: "2024-05-10", ussd: 293, paylink: 330 },
  { date: "2024-05-11", ussd: 335, paylink: 270 },
  { date: "2024-05-12", ussd: 197, paylink: 240 },
  { date: "2024-05-13", ussd: 197, paylink: 160 },
  { date: "2024-05-14", ussd: 448, paylink: 490 },
  { date: "2024-05-15", ussd: 473, paylink: 380 },
  { date: "2024-05-16", ussd: 338, paylink: 400 },
  { date: "2024-05-17", ussd: 499, paylink: 420 },
  { date: "2024-05-18", ussd: 315, paylink: 350 },
  { date: "2024-05-19", ussd: 235, paylink: 180 },
  { date: "2024-05-20", ussd: 177, paylink: 230 },
  { date: "2024-05-21", ussd: 82, paylink: 140 },
  { date: "2024-05-22", ussd: 81, paylink: 120 },
  { date: "2024-05-23", ussd: 252, paylink: 290 },
  { date: "2024-05-24", ussd: 294, paylink: 220 },
  { date: "2024-05-25", ussd: 201, paylink: 250 },
  { date: "2024-05-26", ussd: 213, paylink: 170 },
  { date: "2024-05-27", ussd: 420, paylink: 460 },
  { date: "2024-05-28", ussd: 233, paylink: 190 },
  { date: "2024-05-29", ussd: 78, paylink: 130 },
  { date: "2024-05-30", ussd: 340, paylink: 280 },
  { date: "2024-05-31", ussd: 178, paylink: 230 },
  { date: "2024-06-01", ussd: 178, paylink: 200 },
  { date: "2024-06-02", ussd: 470, paylink: 410 },
  { date: "2024-06-03", ussd: 103, paylink: 160 },
  { date: "2024-06-04", ussd: 439, paylink: 380 },
  { date: "2024-06-05", ussd: 88, paylink: 140 },
  { date: "2024-06-06", ussd: 294, paylink: 250 },
  { date: "2024-06-07", ussd: 323, paylink: 370 },
  { date: "2024-06-08", ussd: 385, paylink: 320 },
  { date: "2024-06-09", ussd: 438, paylink: 480 },
  { date: "2024-06-10", ussd: 155, paylink: 200 },
  { date: "2024-06-11", ussd: 92, paylink: 150 },
  { date: "2024-06-12", ussd: 492, paylink: 420 },
  { date: "2024-06-13", ussd: 81, paylink: 130 },
  { date: "2024-06-14", ussd: 426, paylink: 380 },
  { date: "2024-06-15", ussd: 307, paylink: 350 },
  { date: "2024-06-16", ussd: 371, paylink: 310 },
  { date: "2024-06-17", ussd: 475, paylink: 520 },
  { date: "2024-06-18", ussd: 107, paylink: 170 },
  { date: "2024-06-19", ussd: 341, paylink: 290 },
  { date: "2024-06-20", ussd: 408, paylink: 450 },
  { date: "2024-06-21", ussd: 169, paylink: 210 },
  { date: "2024-06-22", ussd: 317, paylink: 270 },
  { date: "2024-06-23", ussd: 480, paylink: 530 },
  { date: "2024-06-24", ussd: 132, paylink: 180 },
  { date: "2024-06-25", ussd: 141, paylink: 190 },
  { date: "2024-06-26", ussd: 434, paylink: 380 },
  { date: "2024-06-27", ussd: 448, paylink: 490 },
  { date: "2024-06-28", ussd: 149, paylink: 200 },
  { date: "2024-06-29", ussd: 103, paylink: 160 },
  { date: "2024-06-30", ussd: 446, paylink: 400 },
];

const chartConfig = {
  paymets: {
    label: "paymets",
  },
  ussd: {
    label: "ussd",
    color: "#FBEF73",
  },
  paylink: {
    label: "paylink",
    color: "#1018286c",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="pt-0 border-0 shadow-none">
      <CardHeader className="flex items-center gap-2 space-y-0  py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total paymets for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillussd" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-ussd)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-ussd)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillpaylink" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-paylink)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-paylink)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="paylink"
              type="natural"
              fill="url(#fillpaylink)"
              stroke="var(--color-paylink)"
              stackId="a"
            />
            <Area
              dataKey="ussd"
              type="natural"
              fill="url(#fillussd)"
              stroke="var(--color-ussd)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
