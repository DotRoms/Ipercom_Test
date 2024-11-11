import clsx from "clsx";
import React from "react";

interface Props {
    variant?: "primary" | "secondary" | "tertiary" |  "danger" | "ico" | "disabled";
    size?: "xs" | "sm" | "md" | "lg";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    ariaLabel?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

const variantStyles: { [key: string]: string } = {
    primary:
        "bg-primary text-black hover:contrast-150 hover:bg-opacity-80 font-medium transition-all duration-200 uppercase tracking-wide",
    secondary:
        "bg-secondary text-slate-200 hover:contrast-150 hover:bg-opacity-80 font-medium transition-all duration-200 uppercase tracking-wide",
    tertiary: "bg-slate-100 text-secondary hover:contrast-150 font-medium uppercase tracking-wide",
    disabled:
        "bg-tertiaryLight text-tertiaryMedium border border-tertiaryMedium font-medium uppercase tracking-wide",
    danger: "bg-danger border border-danger text-white hover:contrast-150 text-error font-medium transition-all duration-200 uppercase tracking-wide",
    ico: "bg-white text-blue-500 uppercase tracking-wide",
};

const sizeStyles: { [key: string]: string } = {
    xs: "px-2 py-1 text-xs rounded-lg",
    sm: "px-3 py-2 text-xs rounded-lg",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-7 py-2 text-base rounded-lg",
};

export const Button = ({
    variant = "primary",
    size = "md",

    disabled,
    className,
    ariaLabel,
    onClick,
    type = "button",
    children,
}: Props) => {
    const variantStyle = variantStyles[variant] || "";
    const sizeStyle = sizeStyles[size] || "";

    return (
        <button
            className={clsx(variantStyle, sizeStyle, variantStyle, className)}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            type={type}
        >
            {children}
        </button>
    );
};
