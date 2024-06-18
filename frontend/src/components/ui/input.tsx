import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    controlButton?: any;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, controlButton, ...props }, ref) => {
    return (
    <div className="justify-between flex">
      <input
        type={type}
        className={cn(
          "rounded-s-full flex h-10 w-full border-y border-s border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      {controlButton ? <button className="rounded-e-full border-y border-e border-input px-5 border-gray-300  text-gray-500">a</button> : null}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
