import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-smooth disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-upb-pink/50",
  {
    variants: {
      variant: {
        // Rosa UPB por defecto
        default:
          "bg-upb-pink text-white border border-upb-pink hover:bg-upb-purple",
        // Peligro
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 border border-destructive",
        // Contorno con color UPB
        outline:
          "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-upb-pink hover:text-upb-pink",
        // Secundario con morado
        secondary:
          "bg-upb-purple text-white border border-upb-purple hover:bg-upb-red",
        // Ghost limpio
        ghost:
          "text-gray-700 hover:bg-gray-100 hover:text-upb-pink",
        // Enlaces con rosa UPB
        link: 
          "text-upb-pink underline-offset-4 hover:underline hover:text-upb-purple",
        // Variante negra profesional
        black:
          "bg-upb-black text-white border border-upb-black hover:opacity-80",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-md px-8 has-[>svg]:px-6",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };