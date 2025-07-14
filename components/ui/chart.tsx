"use client"

import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Dot,
} from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Define a type for the chart components
type ChartComponent = typeof LineChart | typeof BarChart | typeof AreaChart

// Define a type for the chart elements
type ChartElement = typeof Line | typeof Bar | typeof Area

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>[]
  chartConfig: ChartConfig
  chartType: "line" | "bar" | "area"
  category: string
  index: string
  colors: string[]
  showTooltip?: boolean
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  customDot?: React.ComponentType<any>
  activeDot?: React.ComponentType<any>
}

const chartComponents: Record<string, ChartComponent> = {
  line: LineChart,
  bar: BarChart,
  area: AreaChart,
}

const chartElements: Record<string, ChartElement> = {
  line: Line,
  bar: Bar,
  area: Area,
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      data,
      chartConfig,
      chartType,
      category,
      index,
      colors,
      showTooltip = true,
      showGrid = true,
      showXAxis = true,
      showYAxis = true,
      customDot,
      activeDot,
      className,
      ...props
    },
    ref,
  ) => {
    const ChartComponent = chartComponents[chartType]
    const ChartElement = chartElements[chartType]

    if (!ChartComponent || !ChartElement) {
      console.error(`Unsupported chart type: ${chartType}`)
      return null
    }

    return (
      <div ref={ref} className={cn("h-[400px] w-full", className)} {...props}>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer>
            <ChartComponent data={data}>
              {showGrid && <CartesianGrid vertical={false} stroke="hsl(var(--chart-3))" strokeDasharray="3 3" />}
              {showXAxis && (
                <XAxis
                  dataKey={index}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value: string) => value.slice(0, 3)}
                />
              )}
              {showYAxis && <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={["auto", "auto"]} />}
              {showTooltip && <ChartTooltip cursor={false} content={<ChartTooltipContent />} />}
              <ChartElement
                dataKey={category}
                stroke={colors[0]}
                fill={chartType === "area" ? colors[0] : undefined}
                type="monotone"
                dot={customDot || <Dot />}
                activeDot={activeDot || <Dot />}
              />
            </ChartComponent>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )
  },
)

Chart.displayName = "Chart"

export { Chart }
