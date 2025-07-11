
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell, Tooltip } from "recharts"
import { Wallet } from "lucide-react"

const portfolioData = [
  { name: "IT", value: 400, fill: "var(--color-it)" },
  { name: "Pharma", value: 300, fill: "var(--color-pharma)" },
  { name: "Banking", value: 300, fill: "var(--color-banking)" },
  { name: "Automobile", value: 200, fill: "var(--color-auto)" },
]

const chartConfig = {
  it: {
    label: "IT",
    color: "hsl(var(--chart-1))",
  },
  pharma: {
    label: "Pharma",
    color: "hsl(var(--chart-2))",
  },
  banking: {
    label: "Banking",
    color: "hsl(var(--chart-3))",
  },
  auto: {
    label: "Automobile",
    color: "hsl(var(--chart-4))",
  },
}

export default function PortfolioOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Wallet />
          <span>Portfolio Overview</span>
        </CardTitle>
        <CardDescription>
          Your current asset allocation across sectors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px]"
        >
          <PieChart>
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={portfolioData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {portfolioData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
         <div className="flex-1 text-sm text-muted-foreground mt-4">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {Object.entries(chartConfig).map(([key, config]) => (
                    <li key={key} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{backgroundColor: config.color}} />
                        <span>{config.label}</span>
                    </li>
                ))}
            </ul>
        </div>
      </CardContent>
    </Card>
  )
}
