
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 transform-gpu",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 active:scale-95 transform-gpu",
        outline:
          "border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-blue-400 hover:scale-105 hover:shadow-md active:scale-95 transform-gpu",
        secondary:
          "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-900 hover:from-gray-300 hover:to-gray-400 hover:scale-105 hover:shadow-md active:scale-95 transform-gpu",
        ghost: "hover:bg-gray-100 hover:text-gray-900 hover:scale-105 active:scale-95 transform-gpu",
        link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700",
        glass: "backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 hover:shadow-xl hover:shadow-white/10 active:scale-95 transform-gpu",
        magnetic: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/25 active:scale-95 transform-gpu magnetic-button",
        glow: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 animate-pulse hover:shadow-2xl hover:shadow-blue-500/50 active:scale-95 transform-gpu",
        premium: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/25 active:scale-95 transform-gpu font-semibold",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-13 rounded-lg px-8 text-base",
        icon: "h-11 w-11",
        xl: "h-16 rounded-xl px-12 text-lg font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
