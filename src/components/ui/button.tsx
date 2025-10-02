import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Azul corporativo por defecto
        default:
          "bg-bolivariano-blue-700 text-white border border-bolivariano-blue-800 hover:bg-bolivariano-blue-800",
        // Peligro conserva esquema rojo
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        // Contorno azul profesional
        outline:
          "border border-bolivariano-blue-700 bg-white text-bolivariano-blue-700 hover:bg-bolivariano-blue-50",
        // Secundario: fondo blanco, texto oscuro
        secondary:
          "bg-white text-bolivariano-dark border border-gray-200 hover:bg-bolivariano-blue-50 hover:text-bolivariano-blue-800",
        // Ghost con acento azul
        ghost:
          "text-bolivariano-blue-700 hover:bg-bolivariano-blue-50",
        // Enlaces con color azul corporativo
        link: "text-bolivariano-blue-700 underline-offset-4 hover:underline",
        // Variante negra profesional
        black:
          "bg-neutral-900 text-white border border-neutral-950 hover:bg-neutral-800",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
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