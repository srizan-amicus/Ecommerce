interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "danger";
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

function Button({
  variant = "primary",
  children,
  disabled = false,
  onClick,
  className = "",
}: ButtonProps) {
  const baseStyles = "w-48 h-12 font-bold text-base transition";

  const variantStyles = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    secondary:
      "bg-white text-gray-800 border-2 border-gray-500 hover:bg-gray-100",
    outline:
      "bg-white text-orange-600 border-2 border-orange-500 hover:bg-orange-500 hover:text-white",
    danger: "bg-red-700 text-white hover:bg-red-800",
  };
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
