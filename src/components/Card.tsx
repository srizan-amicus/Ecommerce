interface CardProps {
  variant?: "elevated" | "bordered" | "flat";
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  buttonVariant?: "primary" | "secondary" | "outline" | "danger";
}

function Card({
  variant = "elevated",
  title,
  children,
  footer,
  className = "",
}: CardProps) {
  const baseStyles = "w-full p-4 rounded-lg flex flex-col h-full";

  const variantStyles = {
    elevated: "bg-white shadow-lg",
    bordered: "bg-white border-2 border-gray-300",
    flat: "bg-gray-200",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      <h3 className="text-xl font-bold mb-3">{title}</h3>

      <div className="text-gray-600 mb-6 flex-1">{children}</div>

      {footer && <div className="mt-auto">{footer}</div>}
    </div>
  );
}

export default Card;
