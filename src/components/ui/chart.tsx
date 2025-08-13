"use client"

import * as React from "react"
import * as Recharts from "recharts"
import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const


export type ChartConfig = {
    [k in string]: {
      label?: React.ReactNode
      icon?: React.ComponentType
    } & (
      | { color?: string; theme?: never }
      | { color?: never; theme: Record<keyof typeof THEMES, string> }
    )
  }




// ====================
// ChartTooltipContent
// ====================
export type ChartTooltipContentProps<ValueType = any, NameType = string> = {
  active?: boolean
  payload?: Array<{
    value?: ValueType
    name?: NameType
    dataKey?: string
    color?: string
    payload?: Record<string, any>
  }>
  className?: string
  indicator?: "line" | "dot" | "dashed"
  hideLabel?: boolean
  hideIndicator?: boolean
  label?: string
  labelFormatter?: (value: any, payload?: any) => React.ReactNode
  labelClassName?: string
  formatter?: (
    value: any,
    name: string,
    item: any,
    index: number,
    payload: any
  ) => React.ReactNode
  color?: string
  nameKey?: string
  labelKey?: string
}

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>((props, ref) => {
  const {
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey,
  } = props 


  
  type ChartContextProps = {
    config: ChartConfig
  }

  const ChartContext = React.createContext<ChartContextProps | null>(null)

  function useChart() {
    const context = React.useContext(ChartContext)
  
    if (!context) {
      throw new Error("useChart must be used within a <ChartContainer />")
    }
  
    return context
  }


  const { config } = useChart()

  // always call hook
  const tooltipLabel = React.useMemo(() => {
    if (!active || !payload?.length || hideLabel) return null

    const [item] = payload
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`
    const itemConfig = config[key]

    const value =
      !labelKey && typeof label === "string"
        ? itemConfig?.label || label
        : itemConfig?.label

    if (!value) return null

    return labelFormatter ? (
      <div className={cn("font-medium", labelClassName)}>
        {labelFormatter(value, payload)}
      </div>
    ) : (
      <div className={cn("font-medium", labelClassName)}>{value}</div>
    )
  }, [active, payload, hideLabel, label, labelFormatter, labelClassName, config, labelKey])

  if (!active || !payload?.length) return null

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`
          const itemConfig = config[key]
          const indicatorColor = color || item.payload?.fill || item.color

          return (
            <div
              key={item.dataKey || index}
              className={cn(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                indicator === "dot" && "items-center"
              )}
            >
              {formatter && item.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                          {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          }
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value !== undefined && (
                      <span className="font-mono font-medium tabular-nums text-foreground">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
})

ChartTooltipContent.displayName = "ChartTooltip"

// ====================
// ChartLegendContent
// ====================
export type ChartLegendContentProps = {
  className?: string
  hideIcon?: boolean
  payload?: Array<{
    value?: any
    dataKey?: string
    name?: string
    color?: string
  }>
  verticalAlign?: "top" | "bottom" | "middle"
  nameKey?: string
}

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart()
  if (!payload?.length) return null

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`
        const itemConfig = config[key]

        return (
          <div
            key={item.value || key}
            className={cn(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
            )}
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
})

ChartLegendContent.displayName = "ChartLegend"

// ====================
// ChartContainer
// ====================
export type ChartContainerProps = {
  children: React.ReactNode
  className?: string
  height?: number | string
  width?: number | string
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  children,
  className,
  height = 300,
  width = "100%",
}) => {
  return (
    <div
      className={cn("relative w-full", className)}
      style={{ height, width }}
    >
      {children}
    </div>
  )
}
