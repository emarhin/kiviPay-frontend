"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import { Area, AreaChart } from "recharts";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const chart = [
  { v: 10 },
  { v: 20 },
  { v: 25 },
  { v: 40 },
  { v: 55 },
  { v: 70 },
];

function StatCard({
  title,
  value,
  percent,
  up = true,
  strokeColor, // default stroke
  fillColor, // default fill
}: {
  title: string;
  value: string;
  percent: string;
  up?: boolean;
  strokeColor?: string;
  fillColor?: string;
}) {
  return (
    <Card className="relative overflow-hidden p-5 shadow-none rounded-none first:rounded-l-xl last:rounded-r-xl border-l-0 first:border-l">
      <div className="flex justify-between items-center">
        {/* LEFT */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>

          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-semibold">{value}</h2>

            <Badge
              className={
                up
                  ? `bg-[#101828]  text-white  hover:bg-[#101828]`
                  : "bg-red-100 text-red-700 hover:bg-red-100"
              }
            >
              {up ? (
                <ArrowUp className="mr-1 size-3" />
              ) : (
                <ArrowDown className="mr-1 size-3" />
              )}
              {percent}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground">compared to last week</p>
        </div>

        {/* MINI CHART */}
        <AreaChart width={120} height={70} data={chart}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.6} />
              <stop offset="100%" stopColor={fillColor} stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area
            dataKey="v"
            type="natural"
            stroke={strokeColor}
            fill={fillColor}
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </div>
    </Card>
  );
}
export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:gap-0 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      <StatCard
        title="Payments Received"
        value="1,200"
        percent="18%"
        strokeColor="#101828"
        fillColor="#1018286c"
      />

      <StatCard
        title="Total Revenue"
        value="$25,450"
        percent="12%"
        strokeColor="#101828"
        fillColor="#1018286c"
      />

      <StatCard
        title="Active Customers"
        value="450"
        percent="8%"
        strokeColor="#101828"
        fillColor="#1018286c"
      />

      <StatCard
        title="Failed Transactions"
        value="23"
        percent="5%"
        up={false}
        strokeColor="#ef4444"
        fillColor="#fee2e2"
      />
    </div>
  );
}

export default SectionCards;
