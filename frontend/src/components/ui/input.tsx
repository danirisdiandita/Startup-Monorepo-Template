import * as React from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
    const [currentType, setCurrentType] = React.useState(type)

    React.useEffect(() => {
      if (isPasswordVisible) {
        setCurrentType('text')
      } else {
        setCurrentType(type)
      }
    }, [isPasswordVisible])
    return (
      <div className="justify-between flex items-stretch">
        <input
          type={currentType}
          className={cn( type === "password" ? "rounded-s-full border-y border-s" : "rounded-full border", 
            "flex h-10 w-full border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" ? (
          <div
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="rounded-e-full border-y border-e border-input pr-3 border-gray-300  text-gray-500 flex items-center align-middle">
            <Image
              src={isPasswordVisible === false ? "/icons/eye-visible.svg": "/icons/eye-slash.svg"}
              alt="eye-visible"
              width={20}
              height={20}
            />
          </div>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
