"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { useThemeStore } from "@/store/useThemeStore"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  const { isDarkMode } = useThemeStore()
  
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
        isDarkMode ? "bg-black/70" : "bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  const { theme, isDarkMode } = useThemeStore()
  
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-2xl",
          className
        )}
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorder,
          color: theme.textPrimary,
        }}
        {...props}
      >
        {/* Global styles for form elements inside dialog */}
        <style>{`
          [data-slot="dialog-content"] input[type="checkbox"] {
            background-color: ${theme.input.bg};
            border-color: ${theme.input.border};
            border-width: 1px;
            border-radius: 0.25rem;
            width: 1rem;
            height: 1rem;
            cursor: pointer;
            appearance: none;
            -webkit-appearance: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          
          [data-slot="dialog-content"] input[type="checkbox"]:checked {
            background-color: ${theme.highlight};
            border-color: ${theme.highlight};
          }
          
          [data-slot="dialog-content"] input[type="checkbox"]:checked::after {
            content: "✓";
            color: white;
            font-size: 0.75rem;
            font-weight: bold;
          }
          
          [data-slot="dialog-content"] input[type="checkbox"]:focus {
            outline: none;
            border-color: ${theme.input.focusBorder};
            box-shadow: 0 0 0 2px ${theme.input.focusBorder}40;
          }
          
          [data-slot="dialog-content"] input[type="radio"] {
            background-color: ${theme.input.bg};
            border-color: ${theme.input.border};
            border-width: 1px;
            border-radius: 9999px;
            width: 1rem;
            height: 1rem;
            cursor: pointer;
            appearance: none;
            -webkit-appearance: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          
          [data-slot="dialog-content"] input[type="radio"]:checked {
            background-color: ${theme.highlight};
            border-color: ${theme.highlight};
          }
          
          [data-slot="dialog-content"] input[type="radio"]:checked::after {
            content: "";
            width: 0.375rem;
            height: 0.375rem;
            background-color: white;
            border-radius: 9999px;
          }
          
          [data-slot="dialog-content"] input[type="radio"]:focus {
            outline: none;
            border-color: ${theme.input.focusBorder};
            box-shadow: 0 0 0 2px ${theme.input.focusBorder}40;
          }
          
          [data-slot="dialog-content"] select,
          [data-slot="dialog-content"] input[type="text"],
          [data-slot="dialog-content"] input[type="email"],
          [data-slot="dialog-content"] input[type="password"],
          [data-slot="dialog-content"] input[type="number"],
          [data-slot="dialog-content"] input[type="date"],
          [data-slot="dialog-content"] textarea {
            background-color: ${theme.input.bg};
            border-color: ${theme.input.border};
            color: ${theme.input.text};
          }
          
          [data-slot="dialog-content"] select:focus,
          [data-slot="dialog-content"] input:focus,
          [data-slot="dialog-content"] textarea:focus {
            border-color: ${theme.input.focusBorder};
            outline: none;
            box-shadow: 0 0 0 2px ${theme.input.focusBorder}40;
          }
          
          [data-slot="dialog-content"] select option {
            background-color: ${theme.cardBackground};
            color: ${theme.textPrimary};
          }
          
          [data-slot="dialog-content"] input::placeholder,
          [data-slot="dialog-content"] textarea::placeholder {
            color: ${theme.input.placeholder};
          }
          
          [data-slot="dialog-content"] label {
            color: ${theme.textPrimary};
          }
          
          [data-slot="dialog-content"] .form-checkbox {
            accent-color: ${theme.highlight};
          }
          
          [data-slot="dialog-content"] .form-radio {
            accent-color: ${theme.highlight};
          }
        `}</style>
        
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            style={{
              color: theme.textPrimary,
            }}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { theme } = useThemeStore()
  
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      style={{
        color: theme.textPrimary,
      }}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  const { theme } = useThemeStore()
  
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      style={{
        color: theme.textPrimary,
      }}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  const { theme } = useThemeStore()
  
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      style={{
        color: theme.textPrimary,
      }}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  const { theme } = useThemeStore()
  
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm", className)}
      style={{
        color: theme.textSecondary,
      }}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}