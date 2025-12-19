"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useThemeStore } from "@/store/useThemeStore"

/* Root */
function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

/* Trigger */
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  const { theme } = useThemeStore()

  return (
    <SelectPrimitive.Trigger
      data-size={size}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm outline-none transition-all",
        size === "default" && "h-9",
        size === "sm" && "h-8",
        className
      )}
      style={{
        backgroundColor: theme.input.bg,
        border: `1px solid ${theme.input.border}`,
        color: theme.textPrimary,
        boxShadow: `0 1px 2px ${theme.shadow}`,
      }}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-70" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

/* Content */
function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const { theme } = useThemeStore()

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        align={align}
        sideOffset={4}
        className={cn(
          "relative z-50 max-h-60 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
          color: theme.textPrimary,
        }}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport 
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

/* Item */
function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  const { theme } = useThemeStore()

  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors",
        className
      )}
      style={{
        color: theme.textPrimary,
      }}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

      <span className="absolute right-2">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon
            className="size-4"
            style={{ color: theme.highlight }}
          />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}

/* Label */
function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  const { theme } = useThemeStore()

  return (
    <SelectPrimitive.Label
      className={cn("px-2 py-1.5 text-xs", className)}
      style={{ color: theme.textSecondary }}
      {...props}
    />
  )
}

/* Separator */
function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  const { theme } = useThemeStore()

  return (
    <SelectPrimitive.Separator
      className={cn("my-1 h-px", className)}
      style={{ backgroundColor: theme.borderSecondary }}
      {...props}
    />
  )
}

/* Scroll buttons */
function SelectScrollUpButton(props: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton className="flex justify-center py-1" {...props}>
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton(props: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton className="flex justify-center py-1" {...props}>
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

/* Value + Group */
const SelectValue = SelectPrimitive.Value
const SelectGroup = SelectPrimitive.Group

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectValue,
  SelectGroup,
}